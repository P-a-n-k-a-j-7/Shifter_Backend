const express = require("express");
const IncidenceModel = require("../models/Incidence.model");
const router = express.Router();

//Add incident
router.post("/", async (req, res) => {
  try {
    const newIncident = IncidenceModel(req.body);
    const incident = await newIncident.save();
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await IncidenceModel.find().sort({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get a incident
router.get("/find/:id", async (req, res) => {
  try {
    const incident = await IncidenceModel.findById(req.params.id);
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete a incident
router.delete("/:id", async (req, res) => {
  try {
    const incident = await IncidenceModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Incident deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
