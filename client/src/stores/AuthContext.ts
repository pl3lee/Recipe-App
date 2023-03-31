import { AuthContextInterface } from "@/interfaces/AuthContextInterface";
import { createContext } from "react";


export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  login: async (username: string, password: string) => -10,
  logout: () => {},
  savedRecipesID: [],
  savedRecipes: [],
  getSavedRecipesID: async () => [],
  getSavedRecipes: async () => [],
  saveRecipe: async (recipeID: string) => {},
  fetchSavedRecipes: async () => {},
  recipes: [],
  getRecipes: async () => {},}
);
