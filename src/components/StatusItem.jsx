import React from 'react'
import Loader from './Loader'
const StatusItem = ({ item: { type, value }, lastUpdate, loading }) => {
    var format = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    });
    const types = {
        confirmed: {
            title: 'Confirmed Cases',
            about: 'Number of Active cases of COVID-19',
            color: '#8c7ef7'
        },
        recovered: {
            title: 'Recovered',
            about: 'Number of recoveries from COVID-19',
            color: 'green'
        },
        deaths: {
            title: 'Deaths',
            about: 'Number of deaths caused by COVID-19',
            color: '#f05d65'
        }
    }
    return (
        <div className="statusItem container grey lighten-2" style={{ padding: '10px 1em', borderBottom: `6px solid ${types[type].color}`, borderRadius: '5px', width: '80%' }}>
            <p style={{ color: `${types[type].color}` }}>{types[type].title}</p>
            {loading ? <Loader size="small" color="blue" /> : (<p className="flow-text teal-text">{format.format(value).substr(1)}</p>)}
            <p>{lastUpdate}</p>
            <p>{types[type].about}</p>
        </div>
    )
}

export default StatusItem
