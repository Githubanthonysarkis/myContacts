const mongoose = require("mongoose");
const userScheema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the user name "],
    },
    email: {
      type: String,
      required: [true],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userScheema);
