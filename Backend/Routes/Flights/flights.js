/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const Flight = require("../../Models/FlightsModel.js");

const router = express.Router();
const { body, validationResult } = require('express-validator');

//Search flight
router.get("/", 
body('originCode').isAlpha(),
body('destinationCode').isAlpha(),
body('numOfSeats').isNumeric(),
(req, res) => {
    console.log("Inside search flights");
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ errors: errors.array() });
  }
    const {originCode,destinationCode, departureDate,numOfSeats} = req.body;
    let start = new Date(departureDate);
    let end = new Date(departureDate);
    end.setUTCHours(23,59,59);

    Flight.find({ originCode: originCode, destinationCode:destinationCode,departureDate:{"$gte": start,
        "$lt": end},seatsLeft:{"$gte": numOfSeats}}, (error, data) => {
        if (error) {
            res.setHeader("Content-Type", "application/json");
            res.status(400);
            const error = {
                status: 400,
                message: "Bad Request",
            };
            res.end(JSON.stringify(error));
        } else if (data.length==0) {
            res.setHeader("Content-Type", "application/json");
            res.status(404);
            const error = {
                status: 404,
                message: "Flights not found for the requested search fields",
            };
            res.end(JSON.stringify(error));
        } else {
            console.log("Flight details", data);
            res.end(JSON.stringify(data));
        }
    }).sort({departureDate:1});
});

module.exports = router;
