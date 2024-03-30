const express = require('express');
const mongoose = require('mongoose');

const cars = require('./routes/cars');

const app = express();

const DB_URL = 'mongodb://localhost:27017/car';

mongoose.connect(DB_URL)
.then(() => console.log('Connected to Mongodb...'))
.catch((err) => console.log('Could not connect to MongoDB...', err));


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/cars', cars);

const port = 8000;
app.listen(port, () => console.log(`Listining at port no: ${port} ...`));
