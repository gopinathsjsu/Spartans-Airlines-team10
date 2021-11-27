const express = require("express");
const router = express.Router();
const Flight = require("../../Models/FlightsModel.js");
const { check, validationResult } = require("express-validator");

router.put(
  "/:flightNumber/:price?/:mileagePoints?",
  check("flightNumber").isAlphanumeric(),
  check('price').optional({checkFalsy: true, nullable: true}).isNumeric(),
  check('mileagePoints').optional({checkFalsy: true, nullable: true}).isNumeric(),
  (req, res) => {
    let errorsFromValidation = validationResult(req);
    if (!errorsFromValidation.isEmpty()) {
      return res.status(400).json({
        errors: errorsFromValidation.array(),
      });
    }
    var currTime = new Date();
    console.log("the current time is ", currTime);
    console.log(req.params.flightNumber);
    var parameters = {};
    if (req.params.price !== undefined) {
      parameters["price"] = req.params.price;
    }
    if (req.params.mileagePoints !== undefined) {
      parameters["mileagePoints"] = req.params.mileagePoints;
    }
    console.log(parameters);
    Flight.updateMany(
      { flightNumber: req.params.flightNumber },
      { $set: parameters },
      function (err, resdata) {
        if (err) {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        } else {
          res.status(200).json({
            message: "details updated",
          });
        }
      }
    );
  }
);

module.exports = router;
