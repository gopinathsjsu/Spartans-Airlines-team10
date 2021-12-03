const express = require("express");
const router = express.Router();
const Flight = require("../../Models/FlightsModel.js");
const { check, validationResult } = require("express-validator");
const mongodb = require("mongodb");

router.put(
  "/:flightID",
  check("flightID").isAlphanumeric(),
  check("price").optional({ checkFalsy: true, nullable: true }).isNumeric(),
  check("mileagePoints")
    .optional({ checkFalsy: true, nullable: true })
    .isNumeric(),
  async (req, res) => {
    let errorsFromValidation = validationResult(req);
    if (!errorsFromValidation.isEmpty()) {
      return res.status(400).json({
        errors: errorsFromValidation.array(),
      });
    }
    var currTime = new Date();
    console.log("the current time is ", currTime);
    var parameters = {};
    if (req.body.price !== undefined) {
      parameters["price"] = req.body.price;
    }
    if (req.body.mileagePoints !== undefined) {
      parameters["mileagePoints"] = req.body.mileagePoints;
    }
    console.log(parameters);
    const flightExists = await Flight.findById(
      new mongodb.ObjectId(req.params.flightID)
    ).exec();
    // console.log("asdasd", flightExists)
    if (flightExists != null && flightExists != undefined) {
      Flight.updateOne(
        {
          _id: new mongodb.ObjectId(req.params.flightID)
        },
        { $set: parameters },
        function (err, resdata) {
          if (err) {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          } else {
            console.log("asdasdadsadad", resdata)
            res.status(200).json({
              message: "details updated",
            });
          }
        }
      );
    } else {
      return res.status(200).json({
        message: "There is no such a flight",
      });
    }
  }
);

module.exports = router;
