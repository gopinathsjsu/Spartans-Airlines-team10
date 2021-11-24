const express = require("express");
const router = express.Router();
const Flight = require("../../Models/FlightsModel.js");
const Reservation = require("../../Models/ReservationsModel.js");
const mongoose = require("mongoose");
const mongodb = require("mongodb");

router.put("/", async (req, res, next) => {
  const session = await mongoose.startSession();

  

  
  const custID = req.body.customerID;
  const reservationID = req.body.reservationID;
  var objID = require("mongoose").Types.ObjectId;
  var customers = [];
  console.log("body", req.body.customers);
  const custObjs = req.body.customers;
  for (let obj in custObjs) {
    console.log("this is the object", custObjs[obj].passengerID);
    let isPassengerIDValid = await objID.isValid(custObjs[obj].passengerID);
    if (isPassengerIDValid) {
      customers.push(custObjs[obj]);
    } else {
      res.status(404).json({
        message: "The entered IDs are not valid",
      });
    }
  }
  console.log("These are the customers", customers);

  const iscustIDValid = await objID.isValid(custID);
  const isResIDValid = await objID.isValid(reservationID);
  if (iscustIDValid && isResIDValid) {
    let custMongoID = new mongodb.ObjectId(custID);
    let reservation = await getReservation(reservationID);
    console.log(custMongoID);
    console.log(reservation.res.customerID);
    console.log(reservation.res.customerID == custMongoID);

    if (
      reservation.flag == true &&
      reservation.res.customerID.equals(custMongoID)
    ) {
      console.log("resevatio flag", reservation.flag);
      console.log("the reservation is ", reservation.res);
      if (reservation.res.status == "upcoming") {
        const flightID = reservation.res.flightID;
        console.log("Flightis", flightID);
        for (let obj in customers) {
          let customerPartofTicket = await isCustomerPartofTicket(
            customers[obj].passengerID
          );

          let seatStatus = await getSeatStatus(
            customers[obj].seatID,
            customers[obj].seatNumber,
            flightID
          );
          console.log("the seat status is :", seatStatus);
          if (seatStatus && customerPartofTicket) {
            console.log("coming");
            continue;
          } else {
            res.status(404).json({
              message:
                "One of the seats you have given is occupied or the customer is not a part of the ticket",
            });
          }
        }
        let updatedSeats = await updateReservationSeats(
          customers,
          reservation.res._id
        );
        if (updatedSeats == true) {
          let oldSeatStatus = await changeOldSeatStatus(
            flightID,
            reservation.res
          );
          let newSeatStatus = await changeNewSeatStatus(flightID, customers);
          res
            .status(200)
            .json({ message: "The seat swap was successfully done" });
        }
      } else {
        res.status(400).json({
          message: "You cannot edit expired flight booking",
        });
      }
    } else {
      res.status(404).json({
        message:
          "There is no such a reservation or you don't have the necessary privileges",
      });
    }
  } else {
    res.status(400).json({
      message: "The entered IDs are not valid",
    });
  }
});

const getReservation = async (resID) => {
  let reservation = await Reservation.findById(new mongodb.ObjectId(resID));
  console.log("Reservation", reservation);
  if (reservation != null) {
    return { flag: true, res: reservation };
  } else {
    return { flag: false, res: null };
  }
};

const getSeatStatus = async (seatID, seatNumber, flightID) => {
  console.log("the seatId is: ", seatID);
  console.log("the seatnumber isL ", seatNumber);
  console.log("flight id for the flight is : ", flightID);
  let status = await Flight.findOne({
    _id: flightID,
    "seats.seatID": seatID,
    "seats.seatNumber": seatNumber,
    "seats.status": "A",
  });
  if (status != null) {
    console.log("the result of status is :", status);

    return true;
  } else {
    console.log("the result of status is :", status);

    return false;
  }
};

const isCustomerPartofTicket = async (customerID, reservationID) => {
  console.log("fromn customer validator");
  let status = Reservation.find(
    {
      _id: new mongodb.ObjectId(reservationID),
      "passengers._id": new mongodb.ObjectId(customerID),
    },
    function (error, res) {
      if (error) {
        console.log(error);
        throw error;
      } else if (res) {
        console.log(res);
        return true;
      } else {
        return false;
      }
    }
  );
  // console.log("tgus us stge status", status);
  // if (status != null) {
  //   return true;
  // } else {
  //   return false;
  // }
};

function updateReservationSeats(customers, reservationID) {
  try {



    for (let obj in customers) {
      console.log("The current customer object is ", customers[obj]);
      Reservation.updateOne(
        {
          _id: new mongodb.ObjectId(reservationID),
          "passengers._id": new mongodb.ObjectId(customers[obj].passengerID),
        },
        {
          $set: {
            "passengers.$.seatID": customers[obj].seatID,
            "passengers.$.seatNumber": customers[obj].seatNumber,
          },
        }
        // (error, docs) => {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log("updated docs in reservation: ", docs);
        //   }
        // }
      );
      // console.log("updated reservation", reservation);
    }
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// const updateReservationSeats = async (customers, reservationID) => {

// };

function changeOldSeatStatus(flightID, reservation) {
  try {
    const arrayOfPassengers = reservation.passengers;
    for (let obj in arrayOfPassengers) {
      console.log(
        "current update object for old seats is: ",
        arrayOfPassengers[obj]
      );
      Flight.updateOne(
        {
          _id: flightID,
          "seats.seatID": arrayOfPassengers[obj].seatID,
          "seats.seatNumber": arrayOfPassengers[obj].seatNumber,
        },
        { $set: { "seats.$.status": "A" } },
        (error, docs) => {
          if (error) {
            console.log(error);
          } else {
            console.log("updated docs for old seats: ", docs);
          }
        }
      );
    }
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// const changeOldSeatStatus = async (flightID, reservation) => {

// };

function changeNewSeatStatus(flightID, customers) {
  try {
    for (let obj in customers) {
      console.log("current update object for new seats is: ", customers);
      Flight.updateOne(
        {
          _id: flightID,
          "seats.seatID": customers[obj].seatID,
          "seats.seatNumber": customers[obj].seatNumber,
        },
        { $set: { "seats.$.status": "NA" } },
        (error, docs) => {
          if (error) {
            console.log(error);
          } else {
            console.log("updated docs for new seat: ", docs);
          }
        }
      );
    }
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// const changeNewSeatStatus = async (flightID, customers) => {

// };
module.exports = router;
