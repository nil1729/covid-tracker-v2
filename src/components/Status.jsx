import React from 'react'
import StausItem from './StatusItem';
import PropTypes from 'prop-types'


const Status = ({ status, lastUpdate, loading }) => {
    return (
        <div className="container" style={{ width: '90%' }}>
            <div className="row">
                {
                    status.map(item => (
                        <div key={item.type} className="col s12 m4">
                            <StausItem loading={loading} item={item} lastUpdate={lastUpdate} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

Status.propTypes = {
    status: PropTypes.array.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default Status
