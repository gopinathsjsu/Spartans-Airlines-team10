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
    const employeeID = req.params.employeeID;
    var objID = require("mongoose").Types.ObjectId;
    const isIDValid = await objID.isValid(employeeID);
    console.log(isIDValid)
    if (isIDValid) {
      const empExists = await doesEmployeeExist(employeeID);
      console.log("flightexists", empExists);
      if (empExists) {
        console.log("this is a return", empExists);
        let currDate = new Date();
        Flights.find({
            departureDate: { $gte: currDate.toISOString() },
        })
          .exec()
          .then((reservation, error) => {
            if (reservation) {
              res.status(200).json({
                message: "We have a list of upcoming flights",
                response: reservation,
              });
            } else {
                console.log(error)
              res.status(200).json({
                message: "There are no upcoming flights to show",
              });
            }
          });
      } else {
        return res.status(400).json({
          message: "The Entered Employee ID is not valid",
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
  let data = await Employee.findById(new mongodb.ObjectId(empID));
console.log(data)
  if (data != null) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
