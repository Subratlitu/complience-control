const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const { connectToMongo } = require('./config/mongoConnection');

const routes = require('./routes'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToMongo();

// Centralized route mounting
app.use('/api', routes);




app.listen(3000, () => {
  console.log('Express app running on port 3000 ...');
});
