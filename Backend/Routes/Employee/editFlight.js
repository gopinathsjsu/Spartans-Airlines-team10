const express = require("express");
const router = express.Router();
const Flight = require("../../Models/FlightsModel.js");

router.put("/:flightNumber/:price?/:mileagePoints?", (req, res, next) => {
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
});

module.exports = router;
