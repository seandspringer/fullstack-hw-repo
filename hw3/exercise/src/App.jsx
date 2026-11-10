import { createBrowserRouter, RouterProvider } from 'react-router';
import Main from './components/Main';
import Countries from './components/Countries';
import Home from './components/Home';
import Other from './components/Other';
import Populations from './components/Populations';
import Regions from './components/Regions';
import './App.css';

// https://vite.dev/plugins/#vitejs-plugin-react
// https://reactrouter.com/start/data/routing

// internal routes sent to server.js
const getEndpoint = (dataType) => {
  switch (dataType) {
    case 'countries':
      return '/api/countries';
    case 'populous':
      return '/api/populous';
    case 'regions':
      return '/api/regions';
    default:
      return '/api/unknown';
  }
};

// main data loader. If an error occurs, then it sets the error attribute to
// indicate to the react page, else set data attribute
const fetchCountries = async (dataType) => {
  try {
    const endpoint = getEndpoint(dataType);
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: data.payload,
      };
    }

    return {
      data: data.payload,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: `fetchCountries threw exception: ${err}`,
    };
  }
};

// reactrouter's way of handling routes. See https://reactrouter.com/start/data/routing
// loaders get called by react framework when page requested
const router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
    children: [
      {
        // set '/' to index and render component Home
        index: true,
        Component: Home,
        // this is supposed to render during loading events.
        // See https://reactrouter.com/start/framework/route-module#hydratefallback
        HydrateFallback: () => {
          return <p role="status">Loading Home Route ...</p>;
        },
      },
      {
        path: 'countries',
        Component: Countries,
        loader: () => fetchCountries('countries'),
        HydrateFallback: () => {
          return <p role="status">Loading Countries Route ...</p>;
        },
      },
      {
        path: 'populous',
        Component: Populations,
        loader: () => fetchCountries('populous'),
        HydrateFallback: () => {
          return <p role="status">Loading Populous Route ...</p>;
        },
      },
      {
        path: 'regions',
        Component: Regions,
        loader: () => fetchCountries('regions'),
        HydrateFallback: () => {
          return <p role="status">Loading Regions Route ...</p>;
        },
      },
      {
        path: '*',
        Component: Other,
        HydrateFallback: () => {
          return <p role="status">Loading Unknown Route ...</p>;
        },
      },
    ],
  },
]);

// this is what is actuall exported to main.jsx
export default function App() {
  return <RouterProvider router={router} />;
}
