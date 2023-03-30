import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { AuthContext } from '@/stores/AuthContext'
import { deleteCookie, setCookie } from 'cookies-next';
import { useState } from 'react';
import { AuthContextInterface } from '@/interfaces/AuthContextInterface';
import { useRouter } from 'next/router';





export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);
  const router = useRouter()


  const login = async (username: string, password: string) => {
    const data = { username, password }
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    // we defined our own status codes in the backend
    if (resData.status === -2) {
      alert("Username does not exist")
    } else if (resData.status === -1) {
      alert("Incorrect password")
    } else if (!res.ok) {
      alert("Something went wrong")
    } else {
      alert("Successfully logged in")
      // we need to get the token and userID from the response, and set it in the cookies
      const { token, userID } = resData;
      setCookie("access_token", token)
      window.localStorage.setItem("userID", userID);
      setUser(userID)
  }
}
// to logout, simply set access token to empty string and remove userID from local storage
const logout = () => {
  setUser(null);
  deleteCookie("access_token");
  window.localStorage.removeItem("userID");
  router.push("/auth")

}
const getSavedRecipesID = async () => {
  const res = await fetch('http://localhost:3001/recipes/savedRecipes/id', {
    method: 'GET',
    headers: { "Content-Type": "application/json"},
  });
  const resData = await res.json();
  return resData;
}
const getSavedRecipes = async () => {
  const res = await fetch('http://localhost:3001/recipes/savedRecipes', {
    method: 'GET',
    headers: { "Content-Type": "application/json"},
  });
  const resData = await res.json();
  return resData;
}
const auth: AuthContextInterface = {
  user,
  login,
  logout,
  getSavedRecipesID,
  getSavedRecipes
}


  return  <AuthContext.Provider value={auth}><Layout><Component {...pageProps} /></Layout></AuthContext.Provider>
}
