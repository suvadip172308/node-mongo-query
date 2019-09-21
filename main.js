const express = require('express');
const app = express();
bodyParser = require('body-parser').json();

let courses = [
  {id: '1', subject: 'Mathametics' },
  {id: '2', subject: 'Physics' },
  {id: '3', subject: 'Chemistry' }
];

//GET all courses
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

//GET a specific coure
app.get('/api/course/:id', (req, res) => {
  const id = req.params.id;
  const course = courses.find(course => course.id === id);
  console.log(course);
  if(!course) {
    res.status(400).send(`${id} is not a valid id`);
  } else {
    res.send(course.subject);
  }
});

// POST Add a new course
app.post('/api/courses/', bodyParser, (req, res) => {
  const course = {
    id: `${courses.length + 1}`,
    subject: req.body.subject
  };

  courses.push(course);
  const lastItem = courses[courses.length -1];
  res.send(lastItem);
});

//PUT Update an existing course
app.put('/api/course/:id', bodyParser, (req, res) => {
  const id = req.params.id;
  const course = courses.find(course => course.id === id);

  if(!course) {
    res.status(400).send('Not a valid id');
    return;
  }

  const modifiedCourse = courses.find(course => {
    return course.id === id ? course.subject = req.body.subject : false;
  });

  res.send(modifiedCourse);
});

//DELETE a specific course
app.delete('/api/course/:id', (req,res) => {
  const id = req.params.id;
  courses = courses.filter(course => course.id !== id);
  res.send(courses);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listining at port no: ${port} ...`));