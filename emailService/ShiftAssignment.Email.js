const ejs = require("ejs");
const dotenv = require("dotenv");
const path = require("path");
const sendEmail = require("../helpers/Send.Email");

dotenv.config();

const sendShiftAssignmentEmail = async (
  location,
  date,
  time,
  type,
  duration,
  client,
  email,
  notes
) => {
  ejs.renderFile(
    "templates/shiftAssignment.ejs",
    { location, date, time, type, duration, client, notes },
    async (err, data) => {
      let messageoptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your Shift Assignment",
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

module.exports = { sendShiftAssignmentEmail };
