const express = require("express");
const router = express.Router();
// const Flight = require("../../Models/FlightsModel.js");
const Customer = require("../../Models/CustomerModel.js");
const Reservation = require("../../Models/ReservationsModel");
const mongoose = require("mongoose");
const mongodb = require("mongodb");

router.get("/:customerID", async (req, res, next) => {
  //check if the customer is present

  var objID = require("mongoose").Types.ObjectId;
  const customerID = req.params.customerID;

  var isIDValid = objID.isValid(customerID);

  if (isIDValid) {
    var isCustomerValid = await checkCustomerValidity(customerID);
    if (isCustomerValid) {
      console.log("this is a return", isCustomerValid);

      Reservation.find({ customerID: new mongodb.ObjectId(customerID) })
        .exec()
        .then((reservation) => {
          if (reservation) {
            res.status(200).json({
              response: reservation,
            });
          } else {
            res.status(200).json({
              message: "The customer's reservation history is empty",
            });
          }
        });
    } else {
      return res.status(400).json({
        message: "The Entered Customer in not valid",
      });
    }
  } else {
    return res.status(400).json({
      message: "Not a valid ID",
    });
  }
});

let checkCustomerValidity = async function (custID) {
  Customer.findById(new mongodb.ObjectId(custID))
    .exec()
    .then((customer) => {
      if (customer) {
        console.log("coming to true part");
        return true;
      } else {
        return false;
      }
    });
}

module.exports = router;
