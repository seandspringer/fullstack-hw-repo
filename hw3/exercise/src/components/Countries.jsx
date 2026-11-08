import ErrorItem from './ErrorItem';
import { useLoaderData } from 'react-router';

// Countries route /countries
function CountriesItem({ name, currencies, capitals }) {
  const capitalsF = capitals.map((capital) => capital.name);
  const currenciesF = currencies.map((currency) => currency.name);

  return (
    <li>
      {name || 'Unknown'} | {capitalsF?.join(', ') || 'Unknown'} | {' '}
      {currenciesF?.join(', ') || 'Unknown'}
    </li>
  );
}

export default function Countries() {
  const { data, error } = useLoaderData();

  if (error) {
    return (
      <>
        <h1>Countries</h1>
        <ErrorItem text={error} />
      </>
    );
  }

  return (
    <>
      <h1>Countries</h1>
      <h3>All The Countries In the World</h3>
      <h5>(Country Name | Capital(s) | Currency(ies))</h5>
      <ul>
        {data.map(({ name, uuid, currencies, capitals }) => {
          return (
            <CountriesItem
              key={uuid}
              name={name}
              currencies={currencies}
              capitals={capitals}
            />
          );
        })}
      </ul>
    </>
  );
}
