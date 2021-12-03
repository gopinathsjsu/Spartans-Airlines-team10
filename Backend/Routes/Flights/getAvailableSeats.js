const express = require("express");
const router = express.Router();
const Flights = require("../../Models/FlightsModel");
const mongodb = require("mongodb");
const { param, validationResult } = require("express-validator");

router.get(
  "/:flightID",
  param("flightID").isAlphanumeric(),
  async (req, res) => {
    let errorsFromValidation = validationResult(req);
    if (!errorsFromValidation.isEmpty()) {
      return res.status(400).json({
        errors: errorsFromValidation.array(),
      });
    }
    const flightID = req.params.flightID;
    var objID = require("mongoose").Types.ObjectId;
    const isIDValid = await objID.isValid(flightID);

    if (isIDValid) {
      const flightExists = await doesFlightExist(flightID);
      console.log("flightexists", flightExists);
      if (flightExists) {
        const availableSeats = await findAvailableSeats(flightID);
        console.log(availableSeats);
        if (availableSeats["flag"] == true) {
          return res.status(200).json({
            message: availableSeats.res,
          });
        } else {
          return res.status(200).json({
            message: "There are no vacant seats",
          });
        }
      } else {
        res.status(404).json({
          message: "There is no such a flight",
        });
      }
    } else {
      return res.status(404).json({
        message: "The entered ID is not valid",
      });
    }
  }
);

const doesFlightExist = async (flightID) => {
  let data = await Flights.findById(new mongodb.ObjectId(flightID));
  if (data != null) {
    return true;
  } else {
    return false;
  }

};

const findAvailableSeats = async (flightID) => {
  const flights = await Flights.find({
    "seats.status": "A",
    _id: new mongodb.ObjectId(flightID),
  });
  if (flights.length != 0) {
    return { flag: true, res: flights };
  } else {
    return { flag: false, res: flights };
  }
};

module.exports = router;
