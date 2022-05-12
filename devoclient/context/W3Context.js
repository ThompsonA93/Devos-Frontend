import React, { createContext, useEffect, useState } from 'react';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';
import ballotArchive from '../artifacts/contracts/BallotArchive.sol/BallotArchive.json';

export const W3Context = createContext();

const W3ContextProvider = (props) => {
    const [address, setAddress] = useState('')              // Client Wallet
    const [archive, setArchive] = useState("0xE4934b4007a417e0764F08Cbcd7F1db3EA66e69E")              // Predeployed Archive SC = required
    // 0xd223f3F15a0E4992D1D83C3d4B8fD3bf0Ba2cBD6

    const [totalVotums, setTotalVotums] = useState([]);
    
    // TODO :: Refactor to local storage
    const connect = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const address = ethers.utils.getAddress(accounts[0]);
            console.log("User detected: " + address);               
            setAddress(address);
        }
        console.log("\tChange in Address: " + address);
    }

    const deployBallotToChain = async (title, metainfo, votingDays) => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const scFactory = new ContractFactory(
                ballotOpen.abi,
                ballotOpen.bytecode,
                signer
            );

            const contract = await scFactory.deploy(archive, title, metainfo, BigNumber.from(votingDays));
            console.log("\tDeployed to Address: " + contract.address);
        }
    }

    const readBallotsFromChain = async () => {
        console.log("W3ContextProvider::readBallotsFromChain, Archive at: " + archive);
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = await new ethers.Contract(
                archive, 
                ballotArchive.abi,
                provider
            );
            
            var ballots = await contract.getAllBallots();
            setTotalVotums(ballots);
            console.log("\tReceived Ballots: " + totalVotums);
        }
    }

    return (
        <W3Context.Provider value={{ address, archive, connect, setArchive, totalVotums, deployBallotToChain }}>
            {props.children}
        </W3Context.Provider>
    )
}

export default W3ContextProvider;