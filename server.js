const express = require('express');
const helmet = require('helmet');

const carRouter = require('./cars/carsRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cars', carRouter);

server.get("/", (req, res) => {
    res.send("<h3>Data Base Helpers with knex</h3>");
  });
  

module.exports = server