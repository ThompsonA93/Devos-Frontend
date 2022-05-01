import React, {createContext, useState } from 'react';
import Web3 from 'web3'

export const W3Context = createContext();

const W3ContextProvider = (props) => {
    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState('Not connected')
    const [network, setNetwork] = useState(null)
    const [archive, setArchive] = useState(null)

    // Refactor local storage
    const connect = async () => {
        console.log("W3Context::Connecting to Web3.")

        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        web3 = new Web3(window.ethereum);
        setWeb3(web3);
        console.log("Web3 Instance: " + web3);

        const account = await web3.eth.getAccounts();
        setAddress(account[0]);
        console.log("Account: " + address);
    }

    const disconnect = () => {
        console.log("W3Context::Disconnecting.")
        // TODO
    }

    const getAddress = () => {
        console.log("W3Context::Address requested [" + address + "]")
        return address;
    }

    const setNetworkConf = () => {

    }

    const setArchiveAddress = (archiveAddress) => {

    }

    const deployToChain = (title, metainfo, votingDays) => {

    }


    return (
        <W3Context.Provider value={{address, connect, disconnect, getAddress}}>
            {props.children}
        </W3Context.Provider>
    )

}

export default W3ContextProvider;