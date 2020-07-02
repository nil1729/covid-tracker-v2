import React, { useState, useEffect } from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize';
import Logo from './components/Logo';
import Status from './components/Status';
import SelectCountry from './components/SelectCountry';
import axios from 'axios';
import Chart from './components/Chart';
import Credit from './components/Credit'

const App = () => {
  const config = {
    baseURL: 'https://covid19.mathdro.id/api'
  };
  const [width, setWidth] = useState(window.innerWidth);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date().toDateString());
  const [status, setStatus] = useState([{ type: 'confirmed', value: 0 }, { type: 'recovered', value: 0 }, { type: 'deaths', value: 0 }]);
  const fetchCountries = async () => {
    setLoading(true);
    const res = await axios.get('/countries', config);
    setCountries(res.data.countries);
    // await fetchIP();
    setLoading(false);
  };
  const fetchIP = async () => {
    const res = await axios.get('https://geo.ipify.org/api/v1?apiKey=at_1PomgzqEvF2gybGy9H6L21dMrztf9');
    setCountry(res.data.location.country);
    await fetchCountryStatus(res.data.location.country);
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
    M.AutoInit();
    setWidth(window.innerWidth);
    // eslint-disable-next-line
  }, [countries]);
  const changeCountry = async (country) => {
    setLoading(true);
    setCountry(country);
    await fetchCountryStatus(country);
    setLoading(false);
  }
  return (
    <>
      <span data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></span>
      <div className={`sidenav${width > 600 ? '-1' : ''}`} id="slide-out">
        <SelectCountry countries={countries} changeCountry={changeCountry} />
      </div>
      <div className="main">
        <Logo />
        <Status lastUpdate={lastUpdate} loading={loading} status={status} />
        <hr />
        <Chart loading={loading} country={country} status={status} />
        <Credit name="Nilanjan Deb" />
      </div>
    </>
  )
}

export default App
