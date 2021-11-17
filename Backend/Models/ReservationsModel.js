const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReservationsSchema = new Schema({
    flightID:{type:Schema.Types.ObjectId, ref:'flightModel',required:true,},
    customerID:{type:mongoose.Types.ObjectId,required:true, ref:'Customers'},
    status:{type:String, default:"upcoming"},
    numOfPassengers:{type: Number, required: true},
    passengers:[
        {
            firstName:{type: String,maxlength: 30, required: true},
            lastName: { type: String,maxlength: 30, required: true},
            seatID: {type: String, required: true},
            seatNumber: {type: Number, required: true},
        }
    ],
    reservationDate:{ type: Date, default: new Date() },
    paymentMode:{type: String,required: true},
    paymentDetails:{
        cardNo:{ type: Number,maxlength:16},
        expiryDate:{type: Date},
        cvv:{ type: Number,maxlength:4},
        nameOnCard:{type: String},
        billingAddress:{type: String},
    },

    amountPaid:{type: Number, required: true,default:0},
    mileagePointsPaid:{type: Number, required: true,default:0},
    },
    {
        versionKey: false,
    });

const Reservations = mongoose.model('Reservations', ReservationsSchema);
module.exports = Reservations;
