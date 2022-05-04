import React, {createContext, useState } from 'react';

export const RemoteAPIContext = createContext();

const RemoteAPIContextProvider = (props) => {
    const [restProviderURI, setRestProviderURI] = useState('')


    const getRestProviderURI = () => {
        console.log("RemoteAPIContext::URI requested [" + restProviderURI + "]");
        return restProviderURI;
    }

    return (
        <RemoteAPIContext.Provider value={{restProviderURI, setRestProviderURI}}>
            {props.children}
        </RemoteAPIContext.Provider>
    )

}

export default RemoteAPIContextProvider;