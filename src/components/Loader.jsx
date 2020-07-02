import React from 'react'
import PropTypes from 'prop-types';


const Loader = ({ size, color }) => {
    return (
        <>
            <div className={`preloader-wrapper ${size} active`}>
                <div className={`spinner-layer spinner-${color}-only`}>
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

Loader.propTypes = {
    size: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
}

export default Loader
