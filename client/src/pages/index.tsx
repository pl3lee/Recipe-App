import { Inter } from "@next/font/google";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "@/stores/AuthContext";
import RecipeCard from "@/components/RecipeCard";
import { Container, Stack } from "@mui/system";
import { AuthContextInterface } from "@/interfaces/AuthContextInterface";
import { Recipe } from "@/interfaces/RecipeInterface";

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {
  const { user, fetchSavedRecipes, getRecipes, recipes } =
    useContext<AuthContextInterface>(AuthContext);

  useEffect(() => {
    if (user) {
      fetchSavedRecipes();
    }
  }, [user]);

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Recipes
      </Typography>
      <Stack spacing={5}>
        {recipes.map((recipe: Recipe) => (
          <Container key={recipe._id}>
            <RecipeCard recipe={recipe} />
          </Container>
        ))}
      </Stack>
    </Stack>
  );
};

export default Home;
