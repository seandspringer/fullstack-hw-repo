const http = require('http');
const port = process.env.PORT || 5001;

/*
  From some reading I was doing, I found it was strongly recommended to add a valid minimal HTML structure to these responses 
  like the <!DOCTYPE html> and <html> and <body> tags. It appears the browser will infer this from the Content-Type but 
  I figured I would include them here as practice
*/

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format
const welcome = () => ({
  status: 200,
  header: {
    'Content-Type': 'text/html',
  },
  body: `
  <!DOCTYPE html>
  <html>
    <body>
      <div>
        <h1>Hello World!</h1>
        <h3>Hosted On Localhost Port ${port}</h3>
      </div>
    </body>
  </html>
  `,
});

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
const redirect = () => ({
  status: 302,
  header: {
    Location: '/redirected',
  },
  body: '',
});

const redirected = () => ({
  status: 200,
  header: {
    'Content-Type': 'text/html',
  },
  body: `
    <!DOCTYPE html>
    <html>
      <body>
        <div>
          <h1>Page: Redirected</h1>
          <h3>You can get here from /redirect or /redirected!</h3>
        </div>
      </body>
    </html>
  `,
});

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day
const cache = () => ({
  status: 200,
  header: {
    'Content-Type': 'text/html',
    'Cache-Control': `max-age=${60 * 60 * 24}`,
  },
  body: `
    <!DOCTYPE html>
    <html>
      <body>
        <div>
          <h1>Page: Cache</h1>
          <h3>this resource was cached</h3>
        </div>
      </body>
    </html>
  `,
});

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
const cookie = () => ({
  status: 200,
  header: {
    'Content-Type': 'text/plain',
    'Set-Cookie': 'hello=world',
  },
  body: 'cookies... yummm',
});

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format
const index = () => ({
  // Felt like we needed a splash page and root
  status: 200,
  header: {
    'Content-Type': 'text/html',
  },
  body: `
    <!DOCTYPE html>
    <html>
      <body>
        <div>
          <h1>Node Routing Exercise</h1>
          <h3>Using node-routing</h3>
        </div>
      </body>
    </html>
  `,
});

// 8.2 implicit func return
const other = () => ({
  status: 404,
  header: { 'Content-Type': 'text/html' },
  body: `
    <!DOCTYPE html>
    <html>
      <body>
        <div>
          <h1>404 - page not found</h1>
        </div>
      </body>
    </html>
  `,
});

const server = http.createServer((req, res) => {
  const routes = {
    '/': index,
    '/welcome': welcome,
    '/redirect': redirect,
    '/redirected': redirected,
    '/cache': cache,
    '/cookie': cookie,
    '/other': other,
  };

  // docs say to parse any query parameters that may be tied to the url
  const parsedURL = new URL(req.url, `http://localhost:${port}`);
  const func =
    req.method === 'GET' && routes[parsedURL.pathname]
      ? routes[parsedURL.pathname]
      : routes['/other'];
  const data = func();

  res.writeHead(data.status, data.header);
  res.write(data.body);
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
