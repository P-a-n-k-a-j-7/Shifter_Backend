const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const { sendWelcomeEmail } = require("../emailService/Welcome.Email");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  const newUser = User({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
    phone: req.body.phone,
    address: req.body.address,
    staffID: req.body.staffID,
    gender: req.body.gender,
    documents: [],
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const user = await newUser.save();
    await sendWelcomeEmail(
      req.body.fullname,
      req.body.staffID,
      req.body.password,
      req.body.email
    );
    res.status(201).json("user saved successfully");
  } catch (error) {
    res.status(500).json("Something went wrong!");
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ staffID: req.body.staffID });
    if (!user) {
      return res.status(401).json("Not Registered");
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong Credentials");
    }
    const { password, ...info } = user._doc;
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json("Something went wrong!");
  }
});

module.exports = router;
