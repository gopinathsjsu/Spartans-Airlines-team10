const express = require("express");
const router = express.Router();
const Flight = require("../../Models/FlightsModel.js");
const Reservations = require("../../Models/ReservationsModel.js");
const mongodb = require("mongodb");

router.delete("/:flightID", async (req, res, next) => {
  const flightID = req.params.flightID;
  var flag = await doesFlightHaveActiveReservations(flightID);
  if (flag) {
    res.status(400).json({
      message: "Flight has active reservations",
    });
  } else {
    Flight.deleteOne(
      { _id: new mongodb.ObjectId(flightID) },

      function (err, resdata) {
        if (err) {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        } else {
          // console.log("this is the query result",resdata);
          res.status(200).json({
            message: "flight deleted",
          });
        }
      }
    );
  }
});

async function doesFlightHaveActiveReservations(flightID) {
  Reservations.find({ flightID: flightID })
    .exec()
    .then((reservation) => {
      if (reservation) {
        return true;
      } else {
        return false;
      }
    });
}

module.exports = router;
