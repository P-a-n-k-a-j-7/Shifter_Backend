const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

function createTransporter(config) {
  const transporter = nodemailer.createTransport(config);
  return transporter;
}

let configurations = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
};

const sendEmail = async (messageoptions) => {
  const transporter = createTransporter(configurations);
  await transporter.verify();
  await transporter.sendMail(messageoptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log(info.response);
  });
};

module.exports = sendEmail;
