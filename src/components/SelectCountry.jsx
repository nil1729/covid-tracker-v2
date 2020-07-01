import React, { useEffect, useState } from 'react'
import M from 'materialize-css/dist/js/materialize';
import PropTypes from 'prop-types';


const SelectCountry = ({ countries, changeCountry }) => {
    useEffect(() => {
        M.AutoInit();
    });
    const [current, setCurrent] = useState("");
    const onChange = (e) => {
        changeCountry(e.target.value);
        setCurrent("");
    };
    return (
        <div className="container">
            <div className="row">
                <div className="input-field col s12">
                    <select value={current} onChange={onChange}>
                        <option value="" disabled>Choose your option</option>
                        {
                            countries.map(country => (
                                <option key={country.name} value={country.name}>{country.name}</option>
                            ))
                        }
                    </select>
                    <label>Select Country</label>
                </div>
            </div>
        </div>
    )
}

SelectCountry.propTypes = {
    countries: PropTypes.array.isRequired,
}

export default SelectCountry
