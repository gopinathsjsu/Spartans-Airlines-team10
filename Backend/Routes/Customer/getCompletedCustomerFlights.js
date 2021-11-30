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

        const oldFlightReservations = await Reservation.updateMany(
          {
            flightID: {
              $in: await Flights.find(
                { departureDate: { $lt: currTime.toISOString() } },
                { _id: 1 }
              ).exec(),
            },
            status: "upcoming",
          },
          { status: "completed" }
        );
        console.log("oldFlightReservations...", oldFlightReservations);

        var completedFlightReservations = await Reservation.find(
          {
            status: "completed",
            customerID: new mongodb.ObjectId(customerID),
          },
          { flightID: 1, _id: 0 }
        );

        console.log(
          "completedFlightReservations values are ",
          completedFlightReservations
        );

        var completedFlightIDs = [];

        for (obj in completedFlightReservations) {
          completedFlightIDs.push(completedFlightReservations[obj].flightID);
        }
 
        const completedFlightDetails = await Flights.find({
          _id: { $in: completedFlightIDs },
          departureDate: { $lt: currTime.toISOString() },
        })
          .sort({ departureDate: "descending" })
          .exec();

        console.log("the upcomingFlights are....", completedFlightDetails);

        if (completedFlightDetails.length != 0) {
          return res.status(200).json({
            message: "The flight details of completed journeys are",
            response: completedFlightDetails,
          });
        } else {
          return res.status(200).json({
            message: "The customer does not have any completed journey",
            response: [],
          });
        }
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
