import React, { createContext, useState } from 'react';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';


export const W3Context = createContext();

const W3ContextProvider = (props) => {
    const [address, setAddress] = useState('')              // Client Wallet
    const [archive, setArchive] = useState("0xd223f3F15a0E4992D1D83C3d4B8fD3bf0Ba2cBD6")              // Predeployed Archive SC = required


    // TODO :: Refactor to local storage
    const connect = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAddress(accounts[0]);
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

            // constructor(address _archiveAddress, string memory _title, string memory _metainfo, uint _votingDays)
            const contract = await scFactory.deploy(archive, title, metainfo, BigNumber.from(votingDays));

            console.log("New ballot deployed to " + contract.address);
            // Example Ballots located at
            // 0xC2a813698E74845E0A787c466C8F6b158C2A3958
        }
    }

    const readBallotsFromChain = async () => {
        console.log("Reading from Archive-Node");
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            const contract = await new ethers.Contract(
                archive, 
                ballotOpen.abi,
                provider
            );
            
            let ballots = await contract.ballots;
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
        <W3Context.Provider value={{ address, archive, connect, setArchive, deployBallotToChain, readBallotDataFromAddress }}>
            {props.children}
        </W3Context.Provider>
    )
}

export default W3ContextProvider;