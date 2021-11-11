const express = require("express");
const router = express.Router();
const Flight = require("../../Models/FlightsModel.js");
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
        console.log("departure date" + depISOString);

        var arrdate = new Date(
          Date.UTC(arrYear, arrMonth, arrDate, arrHrs, arrMins, secs)
        );
        console.log("arrival date" + arrdate);

        arrISOString = arrdate.toISOString();
        console.log("arrival date" + arrISOString);
        price = req.body.price;
        capacity = req.body.capacity;

        travelDistance = req.body.travelDistance;

        const diffInMilliseconds = Math.abs(arrdate - depdate);

        const hours = Math.floor(diffInMilliseconds / 3600) % 24;
        // diffInMilliSeconds -= hours * 3600;
        console.log("calculated hours", hours);

        function timeDiffCalc(dateFuture, dateNow) {
          let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

          // calculate days
          const days = Math.floor(diffInMilliSeconds / 86400);
          diffInMilliSeconds -= days * 86400;
          console.log("calculated days", days);

          // calculate hours
          const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
          diffInMilliSeconds -= hours * 3600;
          console.log("calculated hours", hours);

          // calculate minutes
          const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
          diffInMilliSeconds -= minutes * 60;
          console.log("minutes", minutes);

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

        const alpha = Array.from(Array(rows)).map((e, i) => i + 65);
        const alphabet = alpha.map((x) => String.fromCharCode(x));

        var seats = [];
        for (i = 1; i <= rows; i++) {
          for (j = 1; j <= 6; j++) {
            obj = {
              seatID: alphabet[j],
              seatNumber: j,
              status: "A",
            };
            seats.push(obj);
          }
        }

        // console.log(seats);

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
