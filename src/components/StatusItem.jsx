import React, { useState } from 'react'

const StatusItem = ({ item: { type, value } }) => {
    const types = {
        confirmed: {
            title: 'Confirmed Cases',
            about: 'Number of Active cases of COVID-19'
        },
        recovered: {
            title: 'Recovered',
            about: 'Number of recoveries from COVID-19'
        },
        deaths: {
            title: 'Deaths',
            about: 'Number of deaths caused by COVID-19'
        }
    }
    return (
        <div className="container grey lighten-2" style={{ padding: '1em', borderBottom: '5px solid green', borderRadius: '5px' }}>
            <p>{types[type].title}</p>
            <p className="flow-text">{value}</p>
            <p>Wed Jul 01 2020</p>
            <p>{types[type].about}</p>
        </div>
    )
}

export default StatusItem
