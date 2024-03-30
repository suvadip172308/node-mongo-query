const express = require('express');
const { CarModel } = require('../model/car');


const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Hello');
  const { name, manufacturer, capacity, price} = req.body;

  try {
    const newCar = await new CarModel({
      name,
      manufacturer,
      capacity,
      price,
    }).save();

    res.status(201).send({ body: 'New car added successfully'});
  } catch(err) {
    console.log(err);
    res.status(400).send('Error occured');
  }
});

router.get('/', async (req, res) => {
  const { search, manufacturer, capacity, price } = req.query;

  let query = [];
  
  if(search) {
    query = [
      ...query,
      { $or : [
        { name: { $regex: search, $options: "i" }},
        { manufacturer: { $regex: search, $options: "i" }},
      ]},
    ];
  }

  if(manufacturer) {
    query = [
      ...query,
      { manufacturer },
    ];
  }

  if(capacity) {
    query = [
      ...query,
      { capacity },
    ];
  }

  try {
    let cars = null;

    if((search || manufacturer || capacity) && price) {
      cars = await CarModel.find({
        $and: [
          ...query
        ]
      }).sort({ price: price === 'asc' ? 1 : -1 });
    } else if ((search || manufacturer || capacity) && !price) {
      cars = await CarModel.find({
        $and: [
          ...query
        ]
      });
    } else if(price) {
      cars = await CarModel.find().sort({ price: price === 'asc' ? 1 : -1 });
    } else {
      cars = await CarModel.find();
    }
    

    res.status(200).json(cars);
  } catch(err) {
    res.status(400).json({error: err.message });
  }
});

router.patch('/:id', async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCar = await CarModel.findByIdAndUpdate( id, { name }, {new : true});
    res.status(200).json(updatedCar);
  } catch(err) {
    res.status(400).json({error: err.message });
  }
});

router.delete('/:id', async(req,res) => {
  const { id } = req.params;
  try {
    await CarModel.deleteOne({ _id: id});

    res.status(200).send('Deleted successfully');
  } catch(err) {
    res.status(400).send('Error occured');
  }
});

module.exports = router;
