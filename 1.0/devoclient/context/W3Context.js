import React, {createContext, useState } from 'react';
import Web3 from 'web3'

export const W3Context = createContext();

const W3ContextProvider = (props) => {
    const [web3, setWeb3] = useState(null)                  // Web3 Obj
    const [address, setAddress] = useState('') // Client Wallet
    const [archive, setArchive] = useState('')              // Archive SC
    // const [network, setNetwork] = useState(null)         // Provided by Metamask


    const buildWeb3 = async () => {
        web3 = new Web3(window.ethereum);
        setWeb3(web3);
        console.log("Web3 Instance: " + web3);
    }

    const buildAccountAddress = async() => {
        const account = await web3.eth.getAccounts();
        setAddress(account[0]);
        console.log("Account: " + address);
    }

    // Refactor local storage
    const connect = async () => {
        console.log("W3Context::Connecting to Web3.")

        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        await buildWeb3();

        await buildAccountAddress();
    }

    const disconnect = () => {
        console.log("W3Context::Disconnecting.")
        // TODO
    }
    // constructor(address _archiveAddress, string memory _title, string memory _metainfo, uint _votingDays)
    const deployBallotToChain = async (title, metainfo, votingDays) => {
        console.log("Invoking Ballot creation on Blockchain.\nTitle: " + title + "\ņMetainfo:" + metainfo + "\nDays:"+votingDays);

        const abi = [{"inputs":[{"internalType":"address","name":"_archiveAddress","type":"address"},{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_metainfo","type":"string"},{"internalType":"uint256","name":"_votingDays","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"archiveAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ballotAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"creator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metainfo","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"title","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_choice","type":"uint8"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"votes","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}]

        const contract = new web3.eth.Contract(JSON.parse(abi));
        
        await contract.deploy({
            // TODO Deploying correctly
        });
    }

    return (
        <W3Context.Provider value={{address, archive, connect, disconnect, setArchive, deployBallotToChain}}>
            {props.children}
        </W3Context.Provider>
    )

}

export default W3ContextProvider;