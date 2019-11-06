const express = require('express');
const db = require('../data/db-config');
const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
           res.status(200).json(cars);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to retrieve cars' + err });
        });
});

router.get('/:id',validateAccountId, (req, res) => {
    const { id } = req.params;
      db('cars').where({ id }).first()
    .then(cars => {
      res.status(200).json(cars);
    }) 
    .catch (err => {
      res.status(500).json({ message: `Failed to retrieve cars ${id}` + err  });
    });
  });

router.post('/', (req, res) => {
    const carData = req.body;
    db('cars').insert(carData)
    .then(ids => {
      db('cars').where({ id: ids[0] })
      .then(newCarEntry => {
        res.status(201).json(newCarEntry);
      });
    })
    .catch (err => {
      console.log('POST error', err);
      res.status(500).json({ message: "Failed to store data" });
    });
  });

  function validateAccountId(req, res, next) {
    db("cars")
      .where({ id: req.params.id })
      .then(car => {
        if (car[0]) {
          req.car = car;
          next();
        } else {
          res.status(400).json({ message: "invalid car id" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: `Something terrible happend while checking car id: ${error.message}`
        });
      });
  }
  


module.exports = router