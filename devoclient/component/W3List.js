import React, { useContext } from 'react';
import W3Details from './W3Details';
import W3Config from './W3Config';

const W3List = () => {
    return (
        <div>
            <h3>Network details</h3>
            <W3Details />
            <h3>Network reconfiguration</h3>
            <W3Config />
        </div>
    )
}

export default W3List;
