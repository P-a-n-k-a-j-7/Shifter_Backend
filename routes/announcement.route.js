const express = require("express");
const { sendAnnouncementEmail } = require("../emailService/Announcement.Email");
const router = express.Router();

//announcement
router.post("/", async (req, res) => {
  try {
    const newAnnouncement = sendAnnouncementEmail(req.body);
    await newAnnouncement.save();
    await sendAnnouncementEmail(req.body.title, req.body.description);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await sendAnnouncementEmail
      .find()
      .sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete announcement
router.delete("/:id", async (req, res) => {
  try {
    await sendAnnouncementEmail.findByIdAndDelete(req.params.id);
    res.status(200).json("Announcement has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
