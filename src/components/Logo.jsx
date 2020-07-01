import React from 'react'
import logo from './logo.png';

const Logo = () => {
    return (
        <div className="container center" style={{ padding: '1em' }}>
            <img src={logo} alt="covid19" className="responsive-img" />
        </div>
    )
}

export default Logo
