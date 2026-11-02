import { useState } from 'react'
import { createBrowserRouter, Outlet, NavLink, useLoaderData, RouterProvider } from "react-router"
import './App.css'

// https://vite.dev/plugins/#vitejs-plugin-react
// https://reactrouter.com/start/data/routing


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

const ErrorItem = ({text}) => {
  return (
    <p>
      {text}
    </p>
  )
}

const Navbar = () => (
  // <Outlet /> is the place where child routes will render
  // also see https://reactrouter.com/start/declarative/navigating
  <nav>
    <NavLink  to="/">Home</NavLink > | <NavLink  to="/countries">Countries</NavLink > | <NavLink  to="/populous">Population</NavLink > | <NavLink  to="/regions">Regions</NavLink >
  </nav>
)

const Home = () => {
  return <h1>Home</h1>
}

const CountriesItem = ({data}) => {
  const name = data.names.common;
  const capitals = data.capitals.map((capital) => {
    return capital.name;
  });
  const currencies = data.currencies.map((currency) => {
    return currency.name;
  });
  const key = data.uuid;

  return (
    <li> 
      {name || 'Unknown'} | {capitals?.join(', ') || 'Unknown'} | {currencies?.join(', ') || 'Unknown'}
    </li>
  )
}

const Countries = () => {
  const {data, error} = useLoaderData();
  console.log(data);
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
      <ul>
        {data.map((data) => {
          return <CountriesItem key={data.uuid} data={data} />
        })}
      </ul>
    </>
  )
}

const PopulationsItem = ({data}) => {
  const {names: { common: name}, population, flag: {url_svg, description}} = data;
  console.log(name, population);
  return (
    <li>
      {name || 'Unknown'} | {population || 'Unknown'} | <img className='flag' src={url_svg} alt={description} height='32px'/>
    </li>
  )
}

const Populations = () => {
  const {data, error} = useLoaderData();
  console.log(data);
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
      <ul>
        {data.map((data) => {
          return <PopulationsItem key={data.uuid} data={data} />
        })}
      </ul>
    </>
  )
}

const RegionItem = ({region, countries, count}) => {
  return (
    <>
      <h3>
        {region} | Total Country Count = {count}
      </h3>
      {countries.map(({country, uuid}) => {
        return (
          <ul>
            <li key={uuid}>{country}</li>
          </ul>
        )
      })}
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

  /*
    data = [{region: 'Asia", countries: [{country: name, uuid: uuid}], count: number}}]
  */

  return (
    <>
      <h1>Regions</h1>
      {data.map(({region, countries, count}) => {
          return <RegionItem region={region} countries={countries} count={count} />;
      })}
    </>
  )
}

const Other = () => {
  return (
    <>
      <h1>404-Page Not Found</h1>
    </>
  )
}

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {index: true, Component: Home},
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

const Main = () => {
  return <RouterProvider router={router} />;
}

export default Main
