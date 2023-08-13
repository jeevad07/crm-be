const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new mongoose.Schema({
    name: { type: String },
    email:{type:String},
    Place:{type:String},
    companyID:{type:Number},
    phoneNumber:{type:String},
    status:{type:String},
    assignID:{type:Number},
    assignUsername:{type:String},
    customerID: { type: Number },
}, {timestamps: true});

module.exports = mongoose.model('customer', customerSchema);
