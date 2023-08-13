const mongoose = require('mongoose');
const { Schema } = mongoose;

const  trakerSchema = Schema({
    email: {type: String, required: true},
    tableID: { type: Number },
    ID:{type:Number}
});

const trackerModel = mongoose.model('usertracker', trakerSchema);

module.exports = trackerModel;