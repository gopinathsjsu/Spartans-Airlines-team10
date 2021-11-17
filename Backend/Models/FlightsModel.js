const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  flightNumber: {
    type: String,
    required: true,
    maxlength: 10,
  },
  origin: {
    type: String,
    required: true,
    maxlength: 30,
  },
  originCode: {
    type: String,
    required: true,
    maxlength: 5,
  },
  destination: {
    type: String,
    required: true,
    maxlength: 30,
  },
  destinationCode: {
    type: String,
    required: true,
    maxlength: 5,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    max: [1000, 'The capacity cant exceed 1000'],
  },
  seatsLeft: {
    type: Number,
    required: true,
  },
  travelDistance: {
    type: Number,
    required: true,
    min:[100, 'distance should be a minimum of 100km'],
    max:[20000,'distance cannot exceed 20,000km']
  },
  duration: {
    type: String,
    required: true,
  },
  mileagePoints: {
    type: Number,
    required: true,
    min: [100,'minimum points cannot be less than 100'],
    max: [1000,'maximum points cannot be more than 1000'],
  },
  seats: [
    {
      seatID: {
        type: String,
        required: true,
        maxlength: 5,
      },
      seatNumber: {
        type: Number,
        required: true,
        maxlength: 3,
      },
      status: {
        type: String,
        required: true,
        maxlength: 2,
      },
    },
  ],
});

const flightModel = mongoose.model("flights", flightSchema);

module.exports = flightModel;
