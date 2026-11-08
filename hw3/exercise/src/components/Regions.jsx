import ErrorItem from './ErrorItem';
import { useLoaderData } from 'react-router';

// regions route /regions
function RegionItem({ region, countries, count }) {
  return (
    <>
      <h5>
        {region} | Total Country Count = {count}
      </h5>
      <ul className="regions">
        {countries.map(({ country, uuid }) => {
          return <li key={uuid}>{country}</li>;
        })}
      </ul>
    </>
  );
}

export default function Regions() {
  const { data, error } = useLoaderData();

  if (error) {
    return (
      <>
        <h1>Regions</h1>
        <ErrorItem text={error} />
      </>
    );
  }

  return (
    <>
      <h1>Regions</h1>
      <h3>Each Country Divided Into Regions</h3>
      {data.map(({ region, countries, count }) => {
        return (
          <RegionItem region={region} countries={countries} count={count} />
        );
      })}
    </>
  );
}
