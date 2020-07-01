import React, { useState, useEffect } from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize';
import Logo from './components/Logo';
import Status from './components/Status';
import SelectCountry from './components/SelectCountry';
import axios from 'axios';

const App = () => {
  const config = {
    baseURL: 'https://covid19.mathdro.id/api'
  };
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState([{ type: 'confirmed', value: 0 }, { type: 'recovered', value: 0 }, { type: 'deaths', value: 0 }]);
  const fetchCountries = async () => {
    const res = await axios.get('/countries', config);
    setCountries(res.data.countries);
  };
  const fetchIP = async () => {
    const res = await axios.get('https://geo.ipify.org/api/v1?apiKey=at_OgOqHFuyJHD7CmBXvfDyWT7fbOJVX');
    setCountry(res.data.location.country);
    await fetchCountryStatus(res.data.location.country);
  };
  const fetchCountryStatus = async (country) => {
    const res = await await axios.get(`/countries/${country}`, config);
    setStatus([{ type: 'confirmed', value: res.data.confirmed.value }, { type: 'recovered', value: res.data.recovered.value }, { type: 'deaths', value: res.data.deaths.value }]);
  };
  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries();
    }
    if (!country) {
      fetchIP();
    }
  });
  const changeCountry = async (country) => {
    setLoading(true);
    await fetchCountryStatus(country);
    setLoading(false);
  }
  return (
    <div className="container" style={{ width: '90%' }}>
      <Logo />
      <Status loading={loading} status={status} />
      <SelectCountry countries={countries} changeCountry={changeCountry} />
    </div>
  )
}

export default App
