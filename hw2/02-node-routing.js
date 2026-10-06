const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format
const welcome = (data) => {
  data.status = 200;
  data.header = { 'Content-Type': 'text/html' };

  data.body = `
  <!DOCTYPE html>
  <html>
    <body>
      <div>
        <h1>Hello World!</h1>
        <h3>Hosted On Localhost Port ${port}</h3>
      </div>
    <body>
  </html>
  `;
};

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
const redirect = (data) => {
  data.status = 302;
  data.header = { Location: '/redirected' };
  data.body = '';
};

const redirected = (data) => {
  data.status = 200;
  data.header = { 'Content-Type': 'text/html' };

  data.body = `
  <!DOCTYPE html>
  <html>
    <body>
      <div>
        <h1>Page: Redirected</h1>
        <h3>You can get here from /redirect or /redirected!</h3>
      </div>
    <body>
  </html>
  `;
};

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day
const cache = (data) => {
  data.status = 200;
  data.header = {
    'Content-Type': 'text/html',
    'Cache-Control': `max-age=${60 * 60 * 24}`,
  };

  data.body = `
  <!DOCTYPE html>
  <html>
    <body>
      <div>
        <h1>Page: Cache</h1>
        <h3>this resource was cached</h3>
      </div>
    <body>
  </html>
  `;
};

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
const cookie = (data) => {
  data.status = 200;
  data.header = {
    'Content-Type': 'text/html',
    'Set-Cookie': 'hello=world',
  };

  data.body = `
  <!DOCTYPE html>
  <html>
    <body>
      <div>
        <h1>Page: Cookies</h1>
        <h3>cookies... yummm</h3>
      </div>
    <body>
  </html>
  `;
};

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format
const index = (data) => {
  //Felt like we needed a splash page and root
  data.status = 200;
  data.header = {
    'Content-Type': 'text/html',
  };

  data.body = `
  <!DOCTYPE html>
  <html>
    <body>
      <div>
        <h1>Node Routing Exercise</h1>
        <h3>Using node-routing</h3>
      </div>
    <body>
  </html>
  `;
};

const server = http.createServer((req, res) => {
  const routes = [
    '/',
    '/welcome',
    '/redirect',
    '/redirected',
    '/cache',
    '/cookie',
    '/other',
  ];

  const data = {
    status: 404,
    header: { 'Content-Type': 'text/html' },
    body: `
    <!DOCTYPE html>
    <html>
      <body>
        <div>
          <h1>404 - page not found</h1>
        </div>
      <body>
    </html>`,
  };

  //docs say to parse any query parameters that may be tied to the url
  const parsedURL = new URL(req.url, `http://localhost:${port}`);
  console.log(parsedURL.pathname);

  if (parsedURL.pathname === routes[0]) {
    index(data);
  } else if (parsedURL.pathname === routes[1]) {
    welcome(data);
  } else if (parsedURL.pathname === routes[2]) {
    redirect(data);
  } else if (parsedURL.pathname === routes[3]) {
    redirected(data);
  } else if (parsedURL.pathname === routes[4]) {
    cache(data);
  } else if (parsedURL.pathname === routes[5]) {
    cookie(data);
  }

  res.writeHead(data.status, data.header);
  res.write(data.body);
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
