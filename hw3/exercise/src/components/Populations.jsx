import ErrorItem from './ErrorItem';
import { useLoaderData } from 'react-router';

// Population route /populous
function PopulationsItem({ name, url_svg, description, population }) {
  return (
    <li>
      {name || 'Unknown'} | {population.toLocaleString() || 'Unknown'} | {' '}
      <img className="flag" src={url_svg} alt={description} height="24" />
    </li>
  );
}

export default function Populations() {
  const { data, error } = useLoaderData();

  if (error) {
    return (
      <>
        <h1>Populations</h1>
        <ErrorItem text={error} />
      </>
    );
  }

  return (
    <>
      <h1>Populations</h1>
      <h3>Countries With Population Greater Than 50 Million</h3>
      <h5>(Country | Population | Flag)</h5>
      <ul>
        {data.map(({ name, uuid, url_svg, description, population }) => {
          return (
            <PopulationsItem
              key={uuid}
              name={name}
              url_svg={url_svg}
              description={description}
              population={population}
            />
          );
        })}
      </ul>
    </>
  );
}
