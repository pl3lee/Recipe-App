import { RecipeModel } from "../models/Recipes.js";
import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// gets all recipes
router.get("/", async (req, res) => {
  try {
    // the object inside .find are find conditions. Since we want to find all recipes, we pass in an empty object
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Adds a recipe
router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// saves a recipe to a userID
router.put("/", async (req, res) => {
  try {
    // finds the recipe and user by their IDs
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    // adds to the user's savedRecipes array
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

// gets all saved recipes IDs for a user
router.get("/savedRecipes/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    // added ? since this might be null (if the user doesn't exist)
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json;
  }
});

// gets all saved recipes for a user
router.get("/savedRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    // gets all recipes where their ID is in the user's savedRecipes array
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (err) {}
});
export { router as recipesRouter };