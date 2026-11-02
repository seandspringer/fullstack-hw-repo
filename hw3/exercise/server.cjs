const express = require('express');
const { url } = require('inspector');
const path = require('path');
const app = express();
const port = process.env.PORT || 5001;

const APIKEY = 'rc_live_2763297f673744d3847956438cc3857a'; // free tier
const APIHEADER = {
  Authorization: `Bearer ${APIKEY}`,
};
const ENDPOINT = 'https://api.restcountries.com/countries/v5';

let cachedCountries = null; // only burn api token once per session by storing raw data here
const DEVMODE = process.argv.includes('--dev'); // used to prevent running out of api tokens during dev

const getCountries = async () => {
  if (cachedCountries) {
    return cachedCountries;
  }

  let offset = 0;
  let pages = [];
  let metadata = {};

  do {
    // API says this call returns in alphabetical orrder of names->>common
    const response = await fetch(`${ENDPOINT}?limit=100&offset=${offset}`, {
      headers: APIHEADER,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP Status Code: ${response.status} - ${response.statusText}`,
      );
    }

    const json = await response.json();

    metadata = json.data.meta;
    offset += metadata.count;
    pages.push(json.data.objects); // array of arrays

    if (DEVMODE) {
      // only get first page to save api tokens if in dev mode
      break;
    }
  } while (offset < metadata.total);

  cachedCountries = pages.flat();
  return cachedCountries;
};

app.get('/api/countries', async (req, res) => {
  try {
    const countries = await getCountries();

    const response = countries.map((country) => {
      const {
        capitals,
        currencies,
        uuid,
        names: { common },
      } = country;

      return {
        name: common,
        uuid: uuid,
        currencies: currencies,
        capitals: capitals,
      };
    });

    return res.status(200).json({
      payload: response,
    });
  } catch (error) {
    return res.status(500).json({
      payload: `Failed to parse API data: ${error}`,
    });
  }
});

app.get('/api/populous', async (req, res) => {
  try {
    const countries = await getCountries();
    const filtered = countries.filter((country) => {
      return (country.population || 0) > 50000000;
    });
    filtered.sort((first, second) => {
      // neg means first comes before second
      // pos means second comes before first
      return (second.population || 0) - (first.population || 0);
    });
    const response = filtered.map((country) => {
      const {
        population,
        flag: { description, url_svg },
        uuid,
        names: { common },
      } = country;

      return {
        name: common,
        uuid: uuid,
        url_svg: url_svg,
        description: description,
        population: population,
      };
    });

    return res.status(200).json({
      payload: response,
    });
  } catch (error) {
    return res.status(500).json({
      payload: `Failed to parse API data: ${error}`,
    });
  }
});

app.get('/api/regions', async (req, res) => {
  try {
    const countries = await getCountries();
    const regions = {};

    countries.forEach((country) => {
      const { region, names: { common: name = null } = {}, uuid } = country;

      const regionF = region ? region : 'Unknown';
      const nameF = name ? name : 'Unknown';

      if (!regions[regionF]) {
        // then doesn't exist in our list yet
        regions[regionF] = [];
      }

      regions[regionF].push({
        country: nameF,
        uuid: uuid,
      });
    });

    // so we can iterate over this in react - convert to array
    const reply = Object.entries(regions).map(([key, values]) => {
      return {
        region: key,
        countries: values,
        count: values.length,
      };
    });

    return res.status(200).json({
      payload: reply,
    });
  } catch (error) {
    return res.status(500).json({
      payload: `Failed to parse API data: ${error}`,
    });
  }
});

// serve static files in dist dir such as favicon.svg, assets/index.js, assets/index.css
app.use(express.static(path.join(__dirname, 'dist')));

// everything else gets the exact same dist/index.html file
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
