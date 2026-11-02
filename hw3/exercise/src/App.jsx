import { useState } from 'react'
import { createBrowserRouter, Outlet, NavLink, useLoaderData, RouterProvider } from "react-router"
import './App.css'

// https://vite.dev/plugins/#vitejs-plugin-react
// https://reactrouter.com/start/data/routing

// internal routes sent to server.cjs
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
}

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
        error: data.payload
      }
    }

    return {
      data: data.payload,
      error: null
    }

  } catch (e) {
    return {
      data: null,
      error: `fetchCountries threw exception: ${e}`
    }
    
  }
}

// this is supposed to render during loading events. 
// See https://reactrouter.com/start/framework/route-module#hydratefallback
const HydrateFallback = () => {
  return <p>Loading ...</p>;
}

// some generic components
const ErrorItem = ({text}) => {
  return (
    <p>
      {text}
    </p>
  )
}

const Navbar = () => (
  <nav>
    <NavLink  to='/'>Home</NavLink > | <NavLink  to='/countries'>Countries</NavLink > | <NavLink  to='/populous'>Population</NavLink > | <NavLink  to='/regions'>Regions</NavLink >
  </nav>
)

// Home route '/'
const Home = () => {
  return (
  <>
    <h1>Home</h1>
    <h3>Everything You Ever Wanted to Know About The Countries On This Planet (Almost)</h3>
  </>
  )
}

// Countries route /countries
const CountriesItem = ({name, currencies, capitals}) => {
  const capitalsF = capitals.map((capital) => {
    return capital.name;
  });
  const currenciesF = currencies.map((currency) => {
    return currency.name;
  });

  return (
    <li> 
      {name || 'Unknown'} | {capitalsF?.join(', ') || 'Unknown'} | {currenciesF?.join(', ') || 'Unknown'}
    </li>
  )
}

const Countries = () => {
  const {data, error} = useLoaderData();
  
  if (error) {
    return (
      <>
      <h1>Countries</h1>
      <p>
        <ErrorItem text={error} />
      </p>
    </>  
    )
  }

  return (
    <>
      <h1>Countries</h1>
      <h3>All The Countries In the World</h3>
      <h5>(Country Name | Capital(s) | Currency(ies))</h5>
      <ul>
        {data.map(({name, uuid, currencies, capitals}) => {
          return <CountriesItem key={uuid} name={name} currencies={currencies} capitals={capitals} />
        })}
      </ul>
    </>
  )
}

// Population route /populous
const PopulationsItem = ({name, url_svg, description, population}) => {
  return (
    <li>
      {name || 'Unknown'} | {population.toLocaleString() || 'Unknown'} | <img className='flag' src={url_svg} alt={description} height='24px'/>
    </li>
  )
}

const Populations = () => {
  const {data, error} = useLoaderData();
  
  if (error) {
    return (
      <>
      <h1>Populations</h1>
      <p>
        <ErrorItem text={error} />
      </p>
    </>  
    )
  }

  return (
    <>
      <h1>Populations</h1>
      <h3>Countries With Population Greater Than 50 Million</h3>
      <h5>(Country | Population | Flag)</h5>
      <h3></h3>
      <ul>
        {data.map(({name, uuid, url_svg, description, population}) => {
          return <PopulationsItem key={uuid} name={name} url_svg={url_svg} description={description} population={population} />
        })}
      </ul>
    </>
  )
}

// regions route /regions
const RegionItem = ({region, countries, count}) => {
  return (
    <>
      <h5>
        {region} | Total Country Count = {count}
      </h5>
      <ul className='regions'>
      {countries.map(({country, uuid}) => {
        return <li key={uuid}>{country}</li>;
      })}
      </ul>
    </>
  )
}

const Regions = () => {
  const {data, error} = useLoaderData();
  
  if (error) {
    return (
      <>
      <h1>Regions</h1>
      <p>
        <ErrorItem text={error} />
      </p>
    </>  
    )
  }

  return (
    <>
      <h1>Regions</h1>
      <h3>Each Country Divided Into Regions</h3>
      {data.map(({region, countries, count}) => {
          return <RegionItem region={region} countries={countries} count={count} />;
      })}
    </>
  )
}

// 404 for any other route
const Other = () => {
  return (
    <>
      <h1>404-Page Not Found</h1>
    </>
  )
}

const App = () => {
  // <Outlet /> is the place where child routes will render
  // also see https://reactrouter.com/start/declarative/navigating
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

// reactrouter's way of handling routes. See https://reactrouter.com/start/data/routing
// loaders get called by react framework when page requested
const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {index: true, Component: Home}, // set / to index and redner component Home
      {
        path: 'countries', 
        Component: Countries,
        loader: () => {
          return fetchCountries('countries');
        },
      },
      {
        path: 'populous', 
        Component: Populations,
        loader: () => {
          return fetchCountries('populous');
        },
      },
      {
        path: 'regions', 
        Component: Regions,
        loader: () => {
          return fetchCountries('regions');
        }
      },
      {
        path: '*',
        Component: Other,
      }
    ]
  }
])

// this is what is actuall exported to main.jsx
const Main = () => {
  return <RouterProvider router={router} />;
}

export default Main;
