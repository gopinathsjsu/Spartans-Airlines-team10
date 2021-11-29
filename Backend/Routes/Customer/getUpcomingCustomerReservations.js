const express = require("express");
const router = express.Router();
const Customer = require("../../Models/CustomerModel.js");
const Reservation = require("../../Models/ReservationsModel");
const Flights = require("../../Models/FlightsModel");
const mongodb = require("mongodb");
const { param, validationResult } = require("express-validator");

router.get(
  "/:customerID",
  param("customerID").isAlphanumeric(),
  async (req, res) => {
    let errorsFromValidation = validationResult(req);
    if (!errorsFromValidation.isEmpty()) {
      return res.status(400).json({
        errors: errorsFromValidation.array(),
      });
    }
    //check if the customer is present

    var objID = require("mongoose").Types.ObjectId;
    const customerID = req.params.customerID;

    const isIDValid = await objID.isValid(customerID);

    if (isIDValid) {
      const isCustomerValid = await checkCustomerValidity(customerID);
      if (isCustomerValid) {
        console.log("this is a return", isCustomerValid);
        var currTime = new Date();
        Reservation.find({
          customerID: new mongodb.ObjectId(customerID),
          // reservationDate: { $gt: currTime.toISOString() },
          status: "upcoming"
        })
          .exec()
          .then((reservations, error) => {
            if (reservations) {
              var flightIds = []
              for(obj in reservations){
                flightIds.push(reservations[obj].flightID);
              }
              Flights.find({flightID: flightIds, departureDate: {$gt: currTime.toISOString()}})
              .exec()
              .then((flight, err)=>{
                if(flight){
                  res.status(200).json({
                    message: "The customer has upcoming reservations and their flight details are listed below",
                    response: flight,
                  });
                }
                else{
                  res.status(200).json({
                    message: "The customer's  has not upcoming reservation",
                  });
                }
              })
              
            } else {
              res.status(200).json({
                message: "The customer's  has not upcoming reservation",
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
  }
);

const checkCustomerValidity = async (custID) => {
  try {
    const findCustomer = await Customer.findById(new mongodb.ObjectId(custID));

    if (findCustomer) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("There is an error in finding the customer", error);
    throw error;
  }
};

module.exports = router;
