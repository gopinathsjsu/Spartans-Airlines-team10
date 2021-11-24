const express = require("express");
const router = express.Router();
const Flight = require("../../Models/FlightsModel.js");
const mongoose = require("mongoose");
router.post("/", (req, res, next) => {
  depDate = req.body.depDate;

  arrDate = req.body.arrDate;

  depMonth = req.body.depMonth;
  arrMonth = req.body.arrMonth;

  depYear = req.body.depYear;
  arrYear = req.body.arrYear;

  depHrs = req.body.depHrs;
  depMins = req.body.depMins;
  secs = "00";

  var depdate = new Date(
    Date.UTC(depYear, depMonth, depDate, depHrs, depMins, secs)
  );

  arrHrs = req.body.arrHrs;
  arrMins = req.body.arrMins;
  var arrdate = new Date(
    Date.UTC(arrYear, arrMonth, arrDate, arrHrs, arrMins, secs)
  );
  if (arrdate < depdate || arrdate == depdate) {
    return res.status(409).json({
      message: "Arrival time cannot be equal to or before the Departure time",
    });
  }

  Flight.find({
    flightNumber: req.body.flightNumber,
    arrivalDate: { $gte: depdate.toISOString() },
    depDate: { $lte: depdate.toISOString() },
  })
    .exec()
    .then((flight) => {
      if (flight.length >= 1) {
        console.log(flight);

        return res.status(409).json({
          message:
            "Flight exists in the records already or there is a time conflict",
        });
      } else {
        flightNumber = req.body.flightNumber;
        carrier = req.body.carrier;
        origin = req.body.origin;
        originCode = req.body.originCode;
        destination = req.body.destination;
        destinationCode = req.body.destinationCode;
        depISOString = depdate.toISOString();

        var arrdate = new Date(
          Date.UTC(arrYear, arrMonth, arrDate, arrHrs, arrMins, secs)
        );

        arrISOString = arrdate.toISOString();
        price = req.body.price;
        capacity = req.body.capacity;

        travelDistance = req.body.travelDistance;

        const diffInMilliseconds = Math.abs(arrdate - depdate);

        const hours = Math.floor(diffInMilliseconds / 3600) % 24;
        // diffInMilliSeconds -= hours * 3600;

        function timeDiffCalc(dateFuture, dateNow) {
          let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

          // calculate days
          const days = Math.floor(diffInMilliSeconds / 86400);
          diffInMilliSeconds -= days * 86400;

          // calculate hours
          const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
          diffInMilliSeconds -= hours * 3600;

          // calculate minutes
          const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
          diffInMilliSeconds -= minutes * 60;

          let difference = "";
          if (days > 0) {
            difference += days === 1 ? `${days} day, ` : `${days} days, `;
          }

          difference +=
            hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

          difference +=
            minutes === 0 || hours === 1
              ? `${minutes} minutes`
              : `${minutes} minutes`;

          return difference;
        }

        timeDiff = timeDiffCalc(arrdate, depdate);
        duration = timeDiff;
        mileagePoints = req.body.mileagePoints;

        rows = Math.ceil(capacity / 6);
        console.log("number of rows", rows);

        const alpha = Array.from(Array(rows)).map((e, i) => i + 65);
        const alphabet = alpha.map((x) => String.fromCharCode(x));
        var seatFlag = 0;
        var seats = [];
        for (i = 0; i < rows; i++) {
          for (j = 1; j <= 6; j++) {
            if (seatFlag == capacity) {
              break;
            } else {
              obj = {
                seatID: alphabet[i],
                seatNumber: j,
                status: "A",
              };
              seats.push(obj);
              seatFlag++;
            }
          }
        }

        const flight = new Flight({
          _id: new mongoose.Types.ObjectId(),
          flightNumber: flightNumber,
          origin: origin,
          originCode: originCode,
          destination: destination,
          destinationCode: destinationCode,
          departureDate: depISOString,
          arrivalDate: arrISOString,
          capacity: capacity,
          seatsLeft: capacity,
          travelDistance: travelDistance,
          duration: duration,
          mileagePoints: mileagePoints,
          seats: seats,
          price: price,
        });
        flight
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "Flight Added",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    });
});

module.exports = router;
