import React, { useContext } from 'react';
import { W3Context } from '../context/W3Context';
import { RemoteAPIContext } from '../context/RemoteAPIContext';

const ConfigDetails = () => {
    const { archive } = useContext(W3Context);
    const { restProviderURI } = useContext(RemoteAPIContext);

    return (
        <div>
            <h3>Network details</h3>
            <dt>Archive: {archive}</dt>
            <dt>Remote REST-API: {restProviderURI}</dt>
        </div>
    )
}

export default ConfigDetails;
