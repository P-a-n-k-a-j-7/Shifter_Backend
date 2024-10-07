const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const colors = require("colors");

connectDB();
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/auth", require("./routes/auth.route"));
app.use("/api/v1/user", require("./routes/user.route"));
app.use("/api/v1/announcement", require("./routes/announcement.route"));
app.use("/api/v1/incidence", require("./routes/incidence.route"));
app.use("/api/v1/client", require("./routes/client.route"));

//test routes
app.get("/test", (req, res) => {
  res.status(200).json("tested ok");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.bgBlue.white);
});
