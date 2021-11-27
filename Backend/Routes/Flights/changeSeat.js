const express = require("express");
const router = express.Router();
const Flights = require("../../Models/FlightsModel.js");
const Reservation = require("../../Models/ReservationsModel.js");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const { body, validationResult } = require("express-validator");

router.put(
  "/",
  body("customerID").isAlphanumeric(),
  body("reservationID").isAlphanumeric(),
  body("passengers.*.passengerID").isAlphanumeric(),
  body("passengers.*.seatID").isAlpha(),
  body("passengers.*.seatNumber").isNumeric(),
  async (req, res) => {
    let errorsFromValidation = validationResult(req);
    if (!errorsFromValidation.isEmpty()) {
      res.status(400).json({
        errors: errorsFromValidation.array(),
      });
    }
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const custID = req.body.customerID;
      const reservationID = req.body.reservationID;
      var objID = require("mongoose").Types.ObjectId;
      var customers = [];
      const iscustIDValid = await objID.isValid(custID);
      const isResIDValid = await objID.isValid(reservationID);

      if (isResIDValid && iscustIDValid) {
        const custObjs = req.body.passengers;
        for (let obj in custObjs) {
          console.log("this is the object", custObjs[obj].passengerID);
          let isPassengerIDValid = await objID.isValid(
            custObjs[obj].passengerID
          );
          console.log(
            "The isPassengerIDValid token can be checked in: ",
            isPassengerIDValid
          );
          if (isPassengerIDValid) {
            customers.push(custObjs[obj]);
          } else {
            throw { message: "unable to update the reservation" };
            // res.setHeader("Content-Type", "application/json");
            // res.status(404);
            // res.end(JSON.stringify({ a: 1 }));
            // res.status(404).end().json({
            //   message: "The entered IDs are not valid",
            // });
          }
        }

        let custMongoID = new mongodb.ObjectId(custID);
        let reservationObj = await getReservation(
          reservationID,
          custMongoID,
          session
        );
        // console.log("the reservation object is: ", reservationObj);
        if (reservationObj.flag) {
          console.log("inside the reservation true state");
          let passengerStatus = await arePassengersPartofTicket(
            customers,
            reservationObj.res._id,
            session
          );
          if (passengerStatus) {
            let seatStatus = await isSeatFree(customers, session);
            if (seatStatus) {
              for (obj in customers) {
                let reservationUpdate = await Reservation.updateOne(
                  {
                    _id: new mongodb.ObjectId(reservationID),
                    "passengers._id": new mongodb.ObjectId(
                      customers[obj].passengerID
                    ),
                  },
                  {
                    $set: {
                      "passengers.$.seatID": customers[obj].seatID,
                      "passengers.$.seatNumber": customers[obj].seatNumber,
                    },
                  },
                  { session }
                );
                console.log(
                  "The new reservation update is: ",
                  reservationUpdate
                );
                if (
                  reservationUpdate.modifiedCount == 1 &&
                  reservationUpdate.matchedCount == 1
                ) {
                  let newSeatsUpdate = await Flights.updateOne(
                    {
                      _id: reservationObj.res.flightID,
                      "seats.seatID": customers[obj].seatID,
                      "seats.seatNumber": customers[obj].seatNumber,
                    },
                    { $set: { "seats.$.status": "NA" } },
                    { session }
                  );

                  console.log("the new seats update is: ", newSeatsUpdate);

                  if (
                    newSeatsUpdate.modifiedCount == 1 &&
                    newSeatsUpdate.matchedCount == 1
                  ) {
                    continue;
                  } else {
                    throw { message: "unable to update the reservation" };
                  }
                } else {
                  throw { message: "unable to update the reservation" };
                }
              }
              for (obj in reservationObj.res.passengers) {
                let passengerObj = reservationObj.res.passengers[obj];
                console.log("the current passengerObject is: ", passengerObj);

                let updateOldSeats = await Flights.updateOne(
                  {
                    _id: reservationObj.res.flightID,
                    "seats.seatID": passengerObj.seatID,
                    "seats.seatNumber": passengerObj.seatNumber,
                  },
                  { $set: { "seats.$.status": "A" } },
                  { session }
                );
                console.log(
                  "the old seat status update is given as: ",
                  updateOldSeats
                );

                if (updateOldSeats.matchedCount == 1) {
                  continue;
                } else {
                  throw { message: "unable to update the reservation" };
                }
              }

              await session.commitTransaction();
              res.status(200).json({ message: "The seats were updated" });
            } else {
              res.status(404).json({
                message:
                  "the seats that you have given as input are not available",
              });
            }
          } else {
            res.status(404).json({
              message: "The passengers were not a part of the ticket",
            });
          }
        } else {
          res.status(404).json({
            message: "No such reservation was found",
          });
        }
      } else {
        res.status(400).json({
          message: "The entered IDs are not valid",
        });
      }
    } catch (error) {
      await session.abortTransaction();
      res.status(400).json({
        message: "Transaction issue",
      });
      // throw error;
    } finally {
      await session.endSession();
    }
  }
);

async function arePassengersPartofTicket(customers, reservationID, session) {
  for (let obj in customers) {
    let passengerID = new mongodb.ObjectId(customers[obj].passengerID);
    let customerStatus = await Reservation.findOne(
      {
        "passengers._id": passengerID,
        _id: reservationID,
      },
      null,
      { session }
    );

    if (customerStatus != null) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

async function isSeatFree(customers, session) {
  for (obj in customers) {
    let seatStatus = await Flights.findOne(
      {
        "seats.seatID": customers[obj].seatID,
        "seats.seatNumber": customers[obj].seatNumber,
        "seats.status": "A",
      },
      null,
      { session }
    );
    // console.log("the individual seatStatus is: ", seatStatus);
    if (seatStatus != null) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

const getReservation = async (resID, customerID, session) => {
  let reservation = await Reservation.findOne(
    {
      _id: new mongodb.ObjectId(resID),
      customerID: customerID,
      status: "upcoming",
    },
    null,
    { session }
  );
  // console.log("Reservation", reservation);
  if (reservation != null) {
    return { flag: true, res: reservation };
  } else {
    return { flag: false, res: null };
  }
};

module.exports = router;
