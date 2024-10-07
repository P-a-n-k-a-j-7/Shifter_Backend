const ejs = require("ejs");
const dotenv = require("dotenv");
const path = require("path");
const sendEmail = require("../helpers/Send.Email");

dotenv.config();

const sendAnnouncementEmail = async () => {
    const users = await User.find();
    if(users.length > 0){
        for(let user of users){
            ejs.renderFile(
                'templates/announcement.ejs',
                {description},
                async (err, data) => {
                    let messageoptions = {
                        from: process.env.EMAIL,
                        to: user.email,
                        subject: `${title}`,
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
    }
}

module.exports = { sendAnnouncementEmail };