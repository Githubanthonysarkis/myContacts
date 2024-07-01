const mongoose = require("mongoose");
const contactScheema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please enter the contact mame"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email address"],
    },
    phone: {
      type: String,
      required: [true, "please enter a phone contact number"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Contact", contactScheema);
