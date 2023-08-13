const express = require('express');
const app = express();
const config =require('./config/config')
const route =require('./route/index')
const DB =require('./DB/mongoDB')
const cors =require('cors')
const bodyParser =require('body-parser');
const logger = require('morgan');

const corsOptions = {
    origin:config.api.corsWhiteList,
    optionsSuccessStatus: 200,
    allowedHeaders: 'Content-Type,Authorization',
  };

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/',route);

DB().then(() => {
   }).catch((err) => {
    console.log("err", err);
   });
  
app.listen(config.api.port, () => {
  console.log(`Server is running on http://localhost:${config.api.port}`);
});