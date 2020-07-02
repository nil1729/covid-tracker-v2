import React from 'react';
import { Bar } from 'react-chartjs-2';
import Loader from './Loader';
import PropTypes from 'prop-types'


const Charts = ({ status, country, loading }) => {
    const fontFamily =
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
    const backgroundColors = [
        '#8c7ef765',
        'rgba(101, 231, 101, 0.582)',
        '#f05d648f',
    ];
    const borderColors = [
        '#8c7ef7',
        'green',
        '#f05d65',
    ];
    const chartTitleStyle = {
        display: true,
        text: `Current Country is ${country}`,
        fontSize: 20,
        fontColor: '#FF5A2B',
        fontStyle: 'normal',
        fontFamily: fontFamily,
    };
    const scaleConfig = {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    };
    const tooltipConfig = {
        titleFontFamily: fontFamily,
        titleFontStyle: 'normal',
        titleFontSize: 16,
        bodyFontFamily: fontFamily,
        bodyFontSize: 14,
        caretSize: 5,
        cornerRadius: 10,
    };
    const dataSet = {
        label: 'No. Of Cases',
        data: [...status.map(it => it.value)],
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
    };
    return (
        <div className="row">
            <div className="col s12">
                <div className='chart container py-2 center' style={{ height: '50vh' }}>
                    {
                        loading ? <Loader size="big" color="green" /> : (<Bar
                            data={{
                                labels: ['Confirmed Cases', 'Recovered', 'Deaths'],
                                datasets: [dataSet]
                            }}
                            options={{
                                scales: scaleConfig,
                                title: chartTitleStyle,
                                maintainAspectRatio: false,
                                tooltips: tooltipConfig,
                                legend: {
                                    display: false,
                                },
                            }}
                        />)
                    }
                </div>
            </div>
        </div>

    );
};

Charts.propTypes = {
    loading: PropTypes.bool.isRequired,
    // country: PropTypes.string.isRequired,
    status: PropTypes.array.isRequired,
}

export default Charts;