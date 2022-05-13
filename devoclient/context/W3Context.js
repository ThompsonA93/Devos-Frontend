import React, { createContext, useEffect, useState } from 'react';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';
import ballotArchive from '../artifacts/contracts/BallotArchive.sol/BallotArchive.json';

export const W3Context = createContext();

const W3ContextProvider = (props) => {
    const [address, setAddress] = useState('')
    const [archive, setArchive] = useState("0xE4934b4007a417e0764F08Cbcd7F1db3EA66e69E")

    const [totalSCVotums, setTotalSCVotums] = useState([]);
    const [localBallots, setLocalBallots] = useState([]);

    useEffect(() => {
        console.log("W3Context::UseEffect on Address " + address);
        readBallotsFromChain();
        convertBallotData();
    }, [address]);

    /*
    useEffect(() => {
        setLocalBallots(...localBallots, singleBallotData);
        console.log("Updated Local Ballot List: " + localBallots);
    }, [singleBallotData]);
    */
    /**************************************/
    /* Local Blockchain-Related           */
    /**************************************/
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
            setTotalSCVotums(ballots);
            console.log("\tReceived Ballots: " + totalSCVotums);
        }
    }


    const convertBallotData = async (localBallots) => {
        console.log("\tNumber of Polls: " + totalSCVotums.length);
        for (var i = 0; i < totalSCVotums.length; i++) {
            console.log("\tWorking on: #" + i + " - " + totalSCVotums[i]);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = await new ethers.Contract(
                totalSCVotums[i],
                ballotOpen.abi,
                provider
            );
            var _creator = await contract.creator();
            var _title = await contract.title();
            var _metainfo = await contract.metainfo();
            var _startTime = await contract.startTime();
            var _endTime = await contract.endTime();
            var _totalVotes = await contract.totalVotes();
            var _proVotes = await contract.proVotes();
            var _startDate = new Date(_startTime * 1000).toLocaleString();
            var _endDate = new Date(_endTime * 1000).toLocaleString();
            console.log("\tReceived Ballot Data: #" + i + "\n\tCreator: " + _creator + "\n\tTitle:" + _title + "\n\tMetainfo:" + _metainfo + "\n\tTime:" + _startDate + " -- " + _endDate + "\n\tVotes: " + _totalVotes + "/" + _proVotes);
            
            setLocalBallots([{id: i, title: _title, creator: _creator, metainfo: _metainfo, startDate: _startDate, endDate: _endDate, totalVotes: _totalVotes, proVotes: _proVotes }]);
            console.log("Allocated " + localBallots);
            
            /*
            setBallotData(...singleBallotData, 
                JSON.stringify({id: new Number(i), 
                    title: new String(_title), 
                    creator: new String(_creator), 
                    metainfo: new String(_metainfo), 
                    startDate: new Date(_startDate), 
                    endDate: new Date(_endDate), 
                    totalVotes: new Number(_totalVotes), 
                    proVotes: new Number(_proVotes) })
                );
            */
            //setSingleBallotData(...singleBallotData, [{id: i, title: _title, creator: _creator, metainfo: _metainfo, startDate: _startDate, endDate: _endDate, totalVotes: _totalVotes, proVotes: _proVotes }]);
            //console.log("Allocated Ballot data: " + singleBallotData.length + " : " + singleBallotData);
            
            //console.log("\tLocally allocated Ballot data: IT:" + singleBallotData[i] + "\n\tCreator: " + singleBallotData[i] + "\n\tTitle:" + singleBallotData.title + "\n\tMetainfo:" + singleBallotData.metainfo + "\n\tTime:" + singleBallotData.startDate + " -- " + singleBallotData.endDate + "\n\tVotes: " + singleBallotData.totalVotes + "/" + singleBallotData.proVotes);
            //setBallotData([{id: i, title: _title, creator: _creator, metainfo: _metainfo, startDate: _startDate, endDate: _endDate, totalVotes: _totalVotes, proVotes: _proVotes }]);
            //localStorage.setItem('ballot', JSON.stringify(i, _creator, _title, _metainfo, _startDate, _endDate, _totalVotes, _proVotes));
        }
    }














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




























    return (
        <W3Context.Provider value={{ address, archive, localBallots, connect, setArchive, totalSCVotums, deployBallotToChain }}>
            {props.children}
        </W3Context.Provider>
    )
}

export default W3ContextProvider;