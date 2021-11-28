const express = require("express");
const router = express.Router();
const Flights = require("../../Models/FlightsModel");
const Employee = require("../../Models/EmployeeModel");
const mongodb = require("mongodb");
const { param, validationResult } = require("express-validator");

router.get(
  "/:employeeID",
  param("employeeID").isAlphanumeric(),
  async (req, res) => {
    let errorsFromValidation = validationResult(req);
    if (!errorsFromValidation.isEmpty()) {
      return res.status(400).json({
        errors: errorsFromValidation.array(),
      });
    }
    const employeeID = req.params.flightID;
    var objID = require("mongoose").Types.ObjectId;
    const isIDValid = await objID.isValid(employeeID);

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

async function doesEmployeeExist(empID) {
  let data = await Employee.findById(new mongodb.ObjectId(flightID));
  if (data != null) {
    return true;
  } else {
    return false;
  }
}
