export interface AuthContextInterface {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getSavedRecipesID: () => Promise<any>;
  getSavedRecipes: () => Promise<any>;
}