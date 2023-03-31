export interface Recipe {
  _id: string;
  name: string;
  instructions: string;
  cookingTime: number;
  imageURL: string;
  ingredients: string[];
  userOwner: string;
}