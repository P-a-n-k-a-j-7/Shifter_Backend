const express = require("express");
const router = express.Router();

//Add client
router.post("/", async (req, res) => {
  try {
    const newClient = ClientModel(req.body);
    const client = await newClient.save();
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;