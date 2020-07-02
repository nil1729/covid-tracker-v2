import React, { useState, useEffect } from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize';
import Logo from './components/Logo';
import Status from './components/Status';
import SelectCountry from './components/SelectCountry';
import axios from 'axios';
import Chart from './components/Chart';


const App = () => {
  const config = {
    baseURL: 'https://covid19.mathdro.id/api'
  };
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date().toDateString());
  const [status, setStatus] = useState([{ type: 'confirmed', value: 0 }, { type: 'recovered', value: 0 }, { type: 'deaths', value: 0 }]);
  const fetchCountries = async () => {
    setLoading(true);
    const res = await axios.get('/countries', config);
    setCountries(res.data.countries);
    setLoading(false);
  };
  const fetchIP = async () => {
    setLoading(true);
    const res = await axios.get('https://geo.ipify.org/api/v1?apiKey=at_OgOqHFuyJHD7CmBXvfDyWT7fbOJVX');
    setCountry(res.data.location.country);
    await fetchCountryStatus(res.data.location.country);
    setLoading(false);
  };
  const fetchCountryStatus = async (country) => {
    const res = await await axios.get(`/countries/${country}`, config);
    setLastUpdate(new Date(res.data.lastUpdate).toDateString());
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
    setCountry(country);
    await fetchCountryStatus(country);
    setLoading(false);
  }
  return (
    <>
      <div className="sidenav-1">
        <SelectCountry loading={loading} countries={countries} changeCountry={changeCountry} />
      </div>
      <div className="main">
        <Logo />
        <Status lastUpdate={lastUpdate} loading={loading} status={status} />
        <hr />
        <Chart loading={loading} country={country} status={status} />
      </div>
    </>
  )
}

export default App
