const express = require("express");
const router = express.Router();
const Flight = require("../../Models/FlightsModel.js");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const cookieParser = require("cookie-parser");

router.post(
  "/",
  body("depDate").isNumeric(),
  body("arrDate").isNumeric(),
  body("depMonth").isNumeric(),
  body("arrMonth").isNumeric(),
  body("depYear").isNumeric(),
  body("arrYear").isNumeric(),
  body("depHrs").isNumeric(),
  body("depMins").isNumeric(),
  body("arrHrs").isNumeric(),
  body("arrMins").isNumeric(),
  body("flightNumber").isAlphanumeric(),
  body("carrier").isAlpha("en-US", { ignore: " " }),
  body("destination").isAlpha("en-US", { ignore: " " }),
  body("origin").isAlpha("en-US", { ignore: " " }),
  body("originCode").isAlphanumeric(),
  body("destinationCode").isAlphanumeric(),
  body("price").isNumeric(),
  body("capacity").isNumeric(),
  body("travelDistance").isNumeric(),
  body("mileagePoints").isNumeric(),

  (req, res) => {
    let errorsFromValidation = validationResult(req);
    if (!errorsFromValidation.isEmpty()) {
      return res.status(400).json({
        errors: errorsFromValidation.array(),
      });
    }
    const depDay = req.body.depDate;
    const arrDay = req.body.arrDate;
    const depMonth = req.body.depMonth - 1;
    const arrMonth = req.body.arrMonth - 1;
    const depYear = req.body.depYear;
    const arrYear = req.body.arrYear;
    const depHrs = req.body.depHrs;
    const depMins = req.body.depMins;
    const secs = "00";

    console.log("departure month...", depMonth);
    console.log("arr monght....", arrMonth);

    var depdate = new Date(
      Date.UTC(depYear, depMonth, depDay, depHrs, depMins, secs)
    );

    console.log("the dep date+++.", depdate);

    var arrHrs = req.body.arrHrs;
    var arrMins = req.body.arrMins;
    var arrdate = new Date(
      Date.UTC(arrYear, arrMonth, arrDay, arrHrs, arrMins, secs)
    );
    if (arrdate < depdate || arrdate == depdate) {
      return res.status(409).json({
        message: "Arrival time cannot be equal to or before the Departure time",
      });
    } else {
      Flight.find({
        flightNumber: req.body.flightNumber,
        arrivalDate: { $gte: depdate.toISOString() },
        departureDate: { $lte: depdate.toISOString() },
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

            // var arrdate = new Date(
            //   Date.UTC(arrYear, arrMonth, arrDay, arrHrs, arrMins, secs)
            // );

            arrISOString = arrdate.toISOString();
            price = req.body.price;
            capacity = req.body.capacity;
            console.log("departure date....", depISOString);
            console.log("arrival data....", arrISOString);

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
                hours === 0 || hours === 1
                  ? `${hours} hour, `
                  : `${hours} hours, `;

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
                console.log("saved successfully", result);
                const id = JSON.stringify(result._id);
                res.cookie("cookie", id, {
                  maxAge: 5000000,
                  httpOnly: false,
                  path: "/",
                });
                // res.setHeader("Content-Type", "application/json");
                // res.status(200);
                // res.end(JSON.stringify(result));
                return res.status(200).json(result);
              })
              .catch((err, result) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({
                    error: err,
                  });
                }
              });
          }
        });
    }
  }
);

module.exports = router;
