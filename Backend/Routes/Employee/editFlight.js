router.post("/editFlight//:price?/:mileagePoints", (req, res, next) => {
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