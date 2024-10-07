const ejs = require("ejs");
const dotenv = require("dotenv");
const path = require("path");
const sendEmail = require("../helpers/Send.Email");

dotenv.config();

const sendUpdatePasswordEmail = async (email, password) => {
    ejs.renderFile(
        'templates/updatePassword.ejs',
        {password},
        async (err, data) => {
            let messageoptions = {
                from: process.env.EMAIL,
                to: email,
                subject: `Your Password has been updated`,
                html: data,
              };
                try {
                    await sendEmail(messageoptions);
                } catch (error) {
                    console.log(error);
                }
        }
    )
}

module.exports = { sendUpdatePasswordEmail };