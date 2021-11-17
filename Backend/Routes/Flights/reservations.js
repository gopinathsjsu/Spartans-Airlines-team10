/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const Reservations = require("../../Models/ReservationsModel");
const Customers = require("../../Models/CustomerModel");
const Flight = require("../../Models/FlightsModel.js");

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("Inside make reservations");
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const opts = {session};
        const flightID = mongoose.Types.ObjectId(req.body.flightID);
        const customerID = mongoose.Types.ObjectId(req.body.customerID);
        const {
            numOfPassengers,
            passengerList,
            paymentMode,
            cardNo,
            expiryDate,
            cvv,
            nameOnCard,
            billingAddress,
            mileagePointsPaid,
            amountPaid
        } = req.body

        //check if payment is made using mileage points
        let paymentDetails = {}
        let updatedMileagePoints = 0;
        let error = {};
        const customerResult = await Customers.findOne({_id: customerID}, null, opts)
        if (customerResult != null) {

            if (paymentMode == "mileagePoints") {
                if (customerResult.rewardPoints < mileagePointsPaid) {
                    error = {
                        message: "you do not have sufficient reward points to book tickets",
                        errCode: 400
                    }
                    res.setHeader("Content-Type", "application/json");
                    res.status(400);
                    res.send(JSON.stringify(error));
                } else {
                    updatedMileagePoints = customerResult.rewardPoints - mileagePointsPaid;
                }
            } else {
                if (cardNo != undefined && expiryDate != undefined && cvv != undefined && nameOnCard != undefined && billingAddress != undefined) {
                    paymentDetails = {
                        cardNo: cardNo,
                        expiryDate: expiryDate,
                        cvv: cvv,
                        nameOnCard: nameOnCard,
                        billingAddress: billingAddress,
                        //amountPaid: amountPaid,
                    }
                } else {
                    error = {
                        message: "Payment details not found"
                    }
                    throw error;
                }
                updatedMileagePoints = customerResult.rewardPoints;
            }
        } else {
            error = {
                code: 404,
                message: "Customer details not found"
            }
            throw error;
        }

        //Form reservation object
        const newReservation = new Reservations({
            flightID: flightID,
            customerID: customerID,
            numOfPassengers: numOfPassengers,
            passengers: passengerList,
            paymentMode: paymentMode,
        });

        if (paymentDetails.count > 0) {
            newReservation["paymentDetails"] = paymentDetails
            newReservation["amountPaid"] = amountPaid
        } else {
            newReservation["mileagePointsPaid"] = mileagePointsPaid
        }

        // 1) save reservation
        const newReservationResult = await newReservation.save(opts);

        //2) update mileage points for customer and add reservation id to customer's list of reservations
        const addMileagePoints = await getMileagePoints(flightID, opts);
        updatedMileagePoints = updatedMileagePoints + addMileagePoints;

        const update = {
            $push: {reservations: newReservationResult._id},
            $set: {rewardPoints: updatedMileagePoints},
        };

        const customerUpdate = await Customers.updateOne({_id: customerID,}, update, opts);

        //3) update seats as NA in flights table and reduce seats left count
        const flightDetails = await updateFlightForReservation(flightID, numOfPassengers, passengerList, opts);

        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.end(JSON.stringify(newReservationResult));
        //commit transaction
        await session.commitTransaction()
    } catch (e) {
        console.log('rolled back')
        await session.abortTransaction()
        const error = {
            status: 400,
            message: e.message,
        };
        res.end(JSON.stringify(error));
    } finally {
        await session.endSession()
    }
});

//Get mileage points for adding when a flight is reserved
const getMileagePoints = async (flightID, opts) => {
    try {
        const response = await Flight.findOne({_id: flightID}, {travelDistance: 1}, opts);
        if (response != null) {
            return Math.round(response.travelDistance / 10);
        } else {
            const error = {
                message: "Flight details not found"
            }
            throw error;
        }
    } catch (e) {
        throw e;
    }
}

//Get flight details
const getFlightDetails = async (flightID, opts) => {
    try {
        const flightDetails = await Flight.findOne({_id: flightID}, null, opts);
        if (flightDetails != null) {
            return flightDetails;
        } else {
            const error = {
                message: "Flight details not found"
            }
            throw error;
        }
    } catch (e) {
        throw e;
    }
}

//Update the seats occupied and decrease the seats left count
const updateFlightForReservation = async (flightID, numOfPassengers, passengerList, opts) => {
    try {
        const flightDetails = await getFlightDetails(flightID, opts);
        let success;
        if (flightDetails != null) {
            await Flight.updateOne({_id: flightID},
                {$set: {seatsLeft: flightDetails.seatsLeft - numOfPassengers}})

            for (const value of passengerList) {
                const index = passengerList.indexOf(value);
                success = await Flight.updateOne({
                        _id: flightID,
                        seats: {$elemMatch: {seatNumber: value.seatNumber, seatID: value.seatID}}
                    },
                    {$set: {"seats.$.status": "NA"}}
                );
            }
        }
    } catch (e) {
        throw e;
    }
}

module.exports = router;