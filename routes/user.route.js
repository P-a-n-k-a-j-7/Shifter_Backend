const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const {
  sendUpdatePasswordEmail,
} = require("../emailService/updatePassword.Email");
const User = require("../models/user.model");

dotenv.config();

//update password
router.put("/:id", async (req, res) => {
  let unencryptedpassword = req.body.password;

  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (req.boody.email && unencryptedpassword) {
      await sendUpdatePasswordEmail(req.body.email, unencryptedpassword);
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
});

//get a user
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
});

//reset password
router.post("/reset", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    await sendResetPasswordEmail(user.email, user._id);
    res.status(200).json("Email has been sent");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/updatepassword", async (req, res) => {
  try {
    const user = User.findOne({ staffID: req.body.staffID });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const encryptedpassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();

    await User.findByIdAndUpdate(
      user._id,
      { $set: { password: encryptedpassword } },
      { new: true }
    );
    await sendUpdatePasswordEmail(user.email, req.body.password);
    res.status(200).json("Check your email for the new password");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
