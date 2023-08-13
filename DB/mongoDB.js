const mongoose = require('mongoose');
const config = require('../config/config');

const dbOpts = {};
mongoose.set("strictQuery", false);
const connectDb = () =>  mongoose.connect(config.api.DATABASE_URL, dbOpts).catch(error => console.log(error));

mongoose.connection.on('connected', () => {
    console.log('database connected');
});
mongoose.connection.on('disconnected', () => {
    console.log('database disconnected');
});
mongoose.connection.on('error', err => {
    console.log('error', err);
});

module.exports = connectDb;