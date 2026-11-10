# Exercise - Countries API

## Summary

This site was built using [React](https://react.dev/) and [React Router](https://reactrouter.com/home) front-end library and uses [Vite](https://vite.dev/) build tool to compile the `React` `JSX` to `javascript` for rendering in the browser. The site consists of a home route and 3 data routes which render information from the [REST Countries API](https://restcountries.com/).

This repo was initialized using a `Vite` template via `npm create vite@latest -- --template react` which installed pre-built files including `src/App.css` and `src/index.css`. I do **not** claim to have created these style sheets, but I did like them so I left them in the project. I added only minimal `CSS` to the bottom of `src/App.css` starting at line `188`.

## Layout

The `Common JS` file, `server.js` will run on `localhost:5001` and acts as the intermediary between the front end and the REST Countries API. This format allows us to sidestep any `CORS` permissions necessary for the front end to query the REST API and also acts as a data pre-processor whereby the server side formats and cleans the requested data specific to the route requested by the front end.

This site was built using the `React` [single-page app (SPA)](https://react.dev/learn/creating-a-react-app) framework format whereby all routes return the exact same (minimalist) HTML page (index.html). `React-router` then kicks in to render each page via the built-in `RouteProvider` component which calls the `createBrowserRouter` function which maps a route to components and data loader functions.

The endpoints that are `fetched` from the front-end are absolute-path references which act as dummy endpoints that are intercepted by `server.js`. Then `server.js` makes the HTTP calls necessary to the external API and formats the data before fulfilling the front-end's `GET` request. The `Express` module is used to handle the routing, middleware, and HTTP handling.

I left my **free-tier** Countries API in this code for testing. At the time of writing this `README` there were ~900 more tokens available for this month. Each session should only consume 3 tokens, so there should be plenty of remaining tokens for PR analysis.

## How To Run

Make sure your current working directory is `hw3/exercise`. There is an `NPM` script called `runprod` which will build the React page and start the server. The server should print `Server running at http://localhost:{port}` where `{port}` should default to `5001`.

```bash
cd hw3/exercise
npm install
npm run runprod
```
