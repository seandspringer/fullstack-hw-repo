const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

// redirect to /form
app.get('/', (req, res) => {
  res.status(302);
  res.set({ Location: '/form' });
  res.send();
});

app.use(express.static('hw2/public'));

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/form', (req, res) => {
  console.log('post received');
  console.log(req.body);

  res.status(302);
  res.set({
    Location: '/submit',
    'Set-Cookie': `username=${req.body.username}; Path=/;`, //Path=/ will make browser send these cookies to all children of / like /submit
  });
  res.appendHeader('Set-Cookie', `email=${req.body.email}; Path=/;`);
  res.send();
});

// http://localhost:5001/submit should return all the data the user entered
app.get('/submit', (req, res) => {
  console.log('redirect /submit entered');

  res.sendFile(path.join(__dirname, 'public', 'submit.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
