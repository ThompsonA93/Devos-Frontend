import React, { createContext, useEffect, useState } from 'react';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';
import ballotArchive from '../artifacts/contracts/BallotArchive.sol/BallotArchive.json';

export const W3Context = createContext();

const W3ContextProvider = (props) => {
    const [address, setAddress] = useState()              // Client Wallet
    const [archive, setArchive] = useState("0xE4934b4007a417e0764F08Cbcd7F1db3EA66e69E")              // Predeployed Archive SC = required
    // 0xd223f3F15a0E4992D1D83C3d4B8fD3bf0Ba2cBD6

    // FIXME :: EXPERIMENTAL SETUP :: Store address => Pass to PollList
    const [totalVotums, setTotalVotums] = useState([]);
    
    useEffect(() => {
        // On Address-change, update polls
        console.log("Detected change on Address. Reloading Votums from Archive")
        readBallotsFromChain();
    }, [address]); 


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

            console.log("New ballot deployed to " + contract.address);
            // Example Ballots located at
            // 0xdC6F62cbEd4EfB913B76Db309E0195320e6B0311
            readBallotsFromChain();
        }
    }

    // FIXME :: Copy Chain-Data: Is there a better way?
    const readBallotsFromChain = async () => {
        console.log("Reading from Archive-Node");
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = await new ethers.Contract(
                archive, 
                ballotArchive.abi,
                provider
            );
            
            var ballots = await contract.getAllBallots();
            setTotalVotums(ballots);
            console.log("Received Ballots: " + totalVotums);
        }
    }


    const readBallotDataFromAddress = async (_address) => {
        console.log("Reading Ballot Data from Smart contract address " + _address);
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            const ballotContract = await new ethers.Contract(
                _address,
                ballotOpen.abi,
                provider
            );

            var ballotInformation = [
                await ballotContract.creator,
                await ballotContract.ballotAddress,
                await ballotContract.title,
                await ballotContract.metainfo,
                await ballotContract.startTime,
                await ballotContract.endTime,
                await ballotContract.totalVotes,
                await ballotContract.proVotes
            ];

            return ballotInformation;
        }

    }


    return (
        <W3Context.Provider value={{ address, archive, connect, setArchive, totalVotums, deployBallotToChain, readBallotDataFromAddress }}>
            {props.children}
        </W3Context.Provider>
    )
}

export default W3ContextProvider;