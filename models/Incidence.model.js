const mongoose = require("mongoose");

const IncidenceSchema = mongoose.Schema(
  {
    location: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    typeOfIncidence: {
      type: String,
    },
    addressOfLocation: {
      type: String,
    },
    afterIncidence: {
      type: String,
    },
    actualIncident: {
      type: String,
    },
    dateOfreport: {
      type: String,
    },
    person1: {
      type: String,
    },
    phone1: {
      type: String,
    },
    person2: {
      type: String,
    },
    phone2: {
      type: String,
    },
    person3: {
      type: String,
    },
    phone3: {
      type: String,
    },
    personAffected: {
      type: String,
    },
    personCompletingform: {
      type: String,
    },
    personInjured: {
      type: String,
    },
    reportBy: {
      type: String,
    },
    roleOfPerson: {
      type: String,
    },
    whatHappened: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incidence", IncidenceSchema);
