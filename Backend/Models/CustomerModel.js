const mongoose = require('mongoose');

const { Schema } = mongoose;

const customersSchema = new Schema({
    firstName: { type: String,maxlength: 30, required: true },
    lastName: { type: String,maxlength: 30, required: true },
    dob: { type: Date, required:true},
    gender:{type: String, required: true},
    address:{type: String, required: true},
    emailID: { type: String, unique: true, required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,},
    password: { type: String, required: true,minlength: 8},
    phoneNum: { type: String, required: true, match:/^$|^\d{10}$/ },
    createdOn: { type: Date, default: new Date() },
    rewardPoints:{ type: Number, required: true, default:0 },
    reservations: [
      [{ type : Schema.Types.ObjectId, ref: 'Reservations' }],
    ],
},
{
  versionKey: false,
});

const Customers = mongoose.model('Customers', customersSchema);
module.exports = Customers;
