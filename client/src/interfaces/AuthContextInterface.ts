import { Recipe } from "./RecipeInterface";
export interface AuthContextInterface {
  user: string | null;
  login: (username: string, password: string) => Promise<number>;
  logout: () => void;
  getSavedRecipesID: () => Promise<string[]>;
  getSavedRecipes: () => Promise<Recipe[]>;
  recipes: Recipe[];
  getRecipes: () => Promise<void>;
  fetchSavedRecipes: () => Promise<void>;
  saveRecipe: (recipeID: string) => Promise<void>;
  savedRecipes: Recipe[];
  savedRecipesID: string[];
}
