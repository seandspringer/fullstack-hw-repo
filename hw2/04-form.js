const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// this allows for url encoded parameters to be visible in the POST body
app.use(express.urlencoded({ extended: true }));

// redirect to /form
app.get('/', (_req, res) => {
  res.redirect(302, '/form');
});

app.use(express.static(path.join(__dirname, 'public')));

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
app.get('/form', (_req, res) => {
  // prettier-ignore
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// http://localhost:5001/submit should return all the data the user entered
app.post('/submit', (req, res) => {
  const { username, email, comments, subscribe } = req.body;
  const isSubscribed = subscribe ? 'YES!' : 'Maybe Next Time';

  const page = `
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>04-form</title>
        <link rel = "stylesheet" href="/css/style.css">
    </head>
    <body>
      <h1 class="title">Submission Results</h1>
      <div id="form">
        <div class="input-container">
            <span class="form-label">Username:</span> 
            <span id="username" class="label-result">${username}</span>
        </div>
        <div class="input-container">
            <span class="form-label">Email:</span> 
            <span id="email" class="label-result">${email}</span>
        </div>
        <div class="input-container inline">
            <span class="form-label">Comments:</span>
        </div>
        <div class="input-container inline"> 
            <span id="comments" class="label-result">${comments}</span>
        </div>
        <div class="input-container">
            <span class="form-label">Subscribed?:</span> 
            <span id="subscribe" class="label-result">${isSubscribed}</span>
        </div>
      </div>
    </body>
  </html>`;

  // prettier-ignore
  res
    .status(200)
    .type('html')
    .send(page);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
