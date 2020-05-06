import React, { useState, useEffect } from "react";

import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";

import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchCountries] = useState([]);

  useEffect(() => {
    fetchAPI();
  }, [setFetchCountries]);

  const fetchAPI = async () => {
    setFetchCountries(await fetchCountries());
  };

  return (
    <FormControl className={styles.formControl}>
      <h3>Select Country</h3>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {fetchedCountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
