const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all  fields are required!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already exists");
  }

  //hash passwword
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`user created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new error("user data not valid");
  }
  res.json({ message: "register the user" });
});

//@desc login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory!");
  }

  //compare with hashed password
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const promise = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      promise,
      { expiresIn: "15m" }
    );
    res.status(200).json(accessToken);
  } else {
    res.status(401);
  }
});

//@desc Current user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

//@desc all users
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("all users error: ", error);
  }
});

const testUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "this is a test for users" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getUsers,
  testUser,
};
