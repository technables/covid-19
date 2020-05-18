import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;
  let countryUrl = "";
  if (country) {
    changeableUrl = `${url}/countries/${country}`;

    var dt = new Date();
    dt.setDate(dt.getDate() - 2);
    let date = dt.getMonth() + 1 + "-" + dt.getDate() + "-" + dt.getFullYear();

    countryUrl = `${url}/daily/${date}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);
    if (countryUrl) {
      const dData = await axios.get(countryUrl);
      const countryData = dData.data.filter(
        (cnt) => cnt.countryRegion.toLowerCase() === country.toLowerCase()
      );
      debugger;
      let n_confirmed = 0,
        n_recovered = 0,
        n_deaths = 0;
      if (countryData.length > 0) {
        countryData.forEach(
          (t) => (n_confirmed += parseInt(t.confirmed))
        );

         countryData.forEach(
          (t) => (n_recovered += parseInt(t.recovered))
        );

        countryData.forEach(
          (t) => (n_deaths += parseInt(t.deaths))
        );
      }

      const newcase = {
        n_confirmed: confirmed.value - n_confirmed,
        n_recovered: recovered.value - n_recovered,
        n_deaths: deaths.value - n_deaths,
      };

      const modifiedData = {
        confirmed,
        recovered,
        deaths,
       // newcase,
        lastUpdate,
      };

      return modifiedData;
    } else {
      const modifiedData = { confirmed, recovered, deaths, lastUpdate };
      return modifiedData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {}
};
