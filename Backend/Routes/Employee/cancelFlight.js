const express = require("express");
const router = express.Router();
const Flight = require("../../Models/FlightsModel.js");
const Reservations = require("../../Models/ReservationsModel.js");
const mongodb = require("mongodb");
const { Mongoose } = require("mongoose");

router.delete("/:flightID", async (req, res, next) => {
  var objID = require("mongoose").Types.ObjectId;
  const flightID = req.params.flightID;

  var inputCondition = objID.isValid(flightID); // Types.ObjectId.isValid(flightID);
  if (inputCondition) {
    var flag = await doesFlightHaveActiveReservations(flightID);

    if (existingReservation) {
      return res.status(400).json({
        message: "Flight has active reservations",
      });
    } else {
      Flight.findById({ _id: new mongodb.ObjectId(flightID) }).then(
        (flight) => {
          console.log("This is the flight", flight);
          if (flight) {
            Flight.deleteOne(
              { _id: new mongodb.ObjectId(flightID) },

              function (err, resdata) {
                if (err) {
                  console.log(err);
                  return res.status(500).json({
                    error: err,
                  });
                } else {
                  // console.log("this is the query result",resdata);
                  return res.status(200).json({
                    message: "flight deleted",
                  });
                }
              }
            );
          }
        }
      );
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({message: "The input's data type is unknown"}));
  }
});

async function doesFlightHaveActiveReservations(flightID) {
  Reservations.find({ flightID: new mongodb.ObjectId(flightID) })
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
