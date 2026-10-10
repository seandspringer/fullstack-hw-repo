const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

app.use(express.static('hw2/css'));

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered
