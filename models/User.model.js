const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  staffID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role : {
    type: String,
    default: "user",
  },
  documents: {
    type: Array,
  },
  isActive : {
    type: String,
    default: "Yes",
  },
  img : {
    type: String,
  },
},{timestamps:true});

module.exports = mongoose.model("User", UserSchema);
