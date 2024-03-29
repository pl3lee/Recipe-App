import dotenv from "dotenv";
import express from "express";
// cors allow us to setup rules for communication between the client and the server
import cors from "cors";
// database management system
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config();
// generate version of our API
const app = express();

// whenever we get data from frontend, it will convert it to json
// these are called middlewares
app.use(express.json());
app.use(cors());

// now whatever endpoints we create in userRouter will automatically start with /auth
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// put this after middlewares are applied and before listen
// process.env is a available globally
mongoose.connect(process.env.MONGODB_URI);

// for heroku
app.listen(process.env.PORT || 3000, () =>
  console.log("Server is running on port 3000")
);
