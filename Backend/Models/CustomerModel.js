const mongoose = require('mongoose');

const { Schema } = mongoose;

const customersSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required:true},
    gender:{type: String, required: true},
    address:{type: String, required: true},
    emailID: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNum: { type: String, required: true },
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
