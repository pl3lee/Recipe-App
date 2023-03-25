// users route encompass everything relating to logging in and registering
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// each callback function in express has req and res
// req is used to get data from whoever made the request
// res is used to send data back to whoever made the request
router.post("/register", async (req, res) => {
  // when we register, we want to get username and password from the request
  const { username, password } = req.body;
  // we want to check if the username already exists
  const user = await UserModel.findOne({ username: username });
  // if user already exists in database
  if (user) {
    return res.json({ message: "User already exists!" });
  }

  // if user does not exist, we want to hash the password
  // the number doesnt really matter here
  const hashedPassword = await bcrypt.hash(password, 10);

  // create a new user
  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
  });
  // add to mongoDB
  await newUser.save();

  res.json({ message: "User registration successful" });
});

router.post("/login", async (req, res) => {
  // get username and password when we login
  const { username, password } = req.body;
  // we want to check if the username exists
  const user = await UserModel.findOne({ username: username });

  // if user does not exist
  if (!user) {
    return res.json({ message: "User does not exist!", status: -2 });
  }

  // compare given password, with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // if password is invalid
  if (!isPasswordValid) {
    return res.json({ message: "Incorrect username or password", status: -1 });
  }

  // create a new token
  // recommended to create an environment variable to store the secret, it can be any string
  const token = jwt.sign({ id: user._id }, "secret");

  // returns the token and the user id
  res.json({ token: token, userID: user._id, status: 1 });
});
// remember to export the router
export { router as userRouter };
