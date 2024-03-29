import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { AuthContext } from "@/stores/AuthContext";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { AuthContextInterface } from "@/interfaces/AuthContextInterface";
import { useRouter } from "next/router";
import { useGetUserID } from "@/hooks/useGetUserID";
import { Recipe } from "@/interfaces/RecipeInterface";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [savedRecipesID, setSavedRecipesID] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();
  const cookie = getCookie("access_token");
  const userID = useGetUserID();
  useEffect(() => {
    if (userID) {
      setUser(userID);
    }
  }, []);

  const login = async (username: string, password: string): Promise<number> => {
    const data = { username, password };
    const res = await fetch("https://recipe-app-backend.fly.dev/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    // we defined our own status codes in the backend
    if (resData.status === -2) {
      // alert("Username does not exist")
      return -2;
    } else if (resData.status === -1) {
      // alert("Incorrect password")
      return -1;
    } else if (!res.ok) {
      // alert("Something went wrong")
      return -10;
    } else {
      // alert("Successfully logged in")
      // we need to get the token and userID from the response, and set it in the cookies
      const { token, userID } = resData;
      setCookie("access_token", token);
      window.localStorage.setItem("userID", userID);

      setUser(userID);
      return 1;
    }
  };
  // to logout, simply set access token to empty string and remove userID from local storage
  const logout = () => {
    setUser(null);
    deleteCookie("access_token");
    window.localStorage.removeItem("userID");
    router.push("/auth");
  };
  const getRecipes = async () => {
    try {
      const res = await fetch("https://recipe-app-backend.fly.dev/recipes", {
        method: "GET",
      });
      const resData = await res.json();
      setRecipes(resData);
    } catch (err) {
      console.log(err);
    }
  };

  const getSavedRecipesID = async () => {
    const res = await fetch(
      `https://recipe-app-backend.fly.dev/recipes/savedRecipes/ids/${user}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const resData = await res.json();
    return resData;
  };
  const getSavedRecipes = async () => {
    const res = await fetch(
      `https://recipe-app-backend.fly.dev/recipes/savedRecipes/${user}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const resData = await res.json();
    return resData;
  };
  const fetchSavedRecipes = async () => {
    const savedRecipesData = await getSavedRecipes();
    setSavedRecipes(savedRecipesData.savedRecipes);
    const savedRecipesIDData = await getSavedRecipesID();
    setSavedRecipesID(savedRecipesIDData.savedRecipes);
  };

  const saveRecipe = async (recipeID: string) => {
    try {
      if (savedRecipesID.includes(recipeID)) {
        const res = await fetch(
          `https://recipe-app-backend.fly.dev/recipes/savedRecipes/${user}/${recipeID}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `${cookie}`,
            },
          }
        );
      } else {
        const res = await fetch("https://recipe-app-backend.fly.dev/recipes", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `${cookie}`,
          },
          body: JSON.stringify({ recipeID, userID }),
        });
      }
      // just to make the page rerender
      fetchSavedRecipes();
    } catch (err) {
      console.log(err);
    }
  };

  const auth: AuthContextInterface = {
    user,
    login,
    logout,
    recipes,
    getRecipes,
    getSavedRecipesID,
    getSavedRecipes,
    fetchSavedRecipes,
    saveRecipe,
    savedRecipes,
    savedRecipesID,
  };

  return (
    <AuthContext.Provider value={auth}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  );
}
