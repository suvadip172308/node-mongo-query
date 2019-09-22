const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('config');
const applicationDebugger = require('debug')('app:application');
const dbDebugger = require('debug')('app:db');

//const {logger, authentication} = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

// Environment setting
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app environment: ${app.get('env')}`);

// Setting configuration
console.log(`Config Environment: ${config.get('name')}`);
console.log(`Mail server name: ${config.get('mail.host')}`);


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (app.get('env') === 'development') {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs/access.log'), { flags: 'a' }
  );
  
  app.use(morgan('tiny', { stream: accessLogStream }));
  applicationDebugger('Morgan enabled....');
}

//db access related logic here, then add db debugger
dbDebugger('Db access log....');

// add courses route
app.use('/api/courses', courses);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listining at port no: ${port} ...`));
