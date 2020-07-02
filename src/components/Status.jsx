import React from 'react'
import StausItem from './StatusItem';


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

export default Status
