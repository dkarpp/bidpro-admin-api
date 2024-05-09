const mongoose = require("mongoose");

const BidProSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  airline: String,
  pilotInfo: {
    firstName: String,
    lastName: String,
    email: String,
    areaCode: String,
    prefix: String,
    suffix: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    postalCode: String,
  },
  bidInfo: {
    seat: String,
    fleet: String,
    domicile: String,
  },
});

module.exports = mongoose.model("Pilots", BidProSchema, "Pilots");
