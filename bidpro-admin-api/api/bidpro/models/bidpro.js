const mongoose = require("mongoose");

const BidProSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bidType: {
    fleet: String,
    seat: String,
    domicile: String,
  },
  bidPeriods: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      month: Number,
      year: Number,
    },
  ],
  status: Number,
  importedOn: Date,
});

/*
BidProSchema.set("toJSON", {
  transform: (doc, ret) => {
    // Remove _id field from subdocuments within bidPeriods array
    ret.bidPeriods.forEach((period) => {
      delete period._id;
    });
    return ret;
  },
});
*/
module.exports = mongoose.model("BidTypes", BidProSchema, "BidTypes");
