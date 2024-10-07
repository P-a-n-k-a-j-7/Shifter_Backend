const ejs = require("ejs");
const dotenv = require("dotenv");
const path = require("path");
const sendEmail = require("../helpers/Send.Email");

dotenv.config();

const sendResetPasswordEmail = async (email, password) => {
  ejs.renderFile(
    "templates/resetPassword.ejs",
    { password },
    async (err, data) => {
      let messageoptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Link to Reset Password`,
        html: data,
      };
      try {
        await sendEmail(messageoptions);
      } catch (error) {
        console.log(error);
      }
    }
  );
};

module.exports = { sendResetPasswordEmail };
