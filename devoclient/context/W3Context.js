import React, { createContext, useEffect, useState } from 'react';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';
import ballotArchive from '../artifacts/contracts/BallotArchive.sol/BallotArchive.json';

export const W3Context = createContext();

const W3ContextProvider = (props) => {
    const [address, setAddress] = useState('')
    const [archive, setArchive] = useState("0xE4934b4007a417e0764F08Cbcd7F1db3EA66e69E")

    const [totalSCVotums, setTotalSCVotums] = useState([]);
    const [ballotInfo, setBallotInfo] = useState([]);
    const [localBallots, setLocalBallots] = useState([]);


    useEffect(() => {
        console.log("W3Context::UseEffect on Address " + address);
        readBallotsFromChain();
        convertBallotData();
        console.log("\tCollected Blochchain information " + address);
    }, [address]);

    useEffect(() => {
        console.log("W3Context::UseEffect on ballotInfo " + ballotInfo);
        if(ballotInfo.id === undefined){    // Disregard misallocated objects; Not sure where those come from
            console.log("BallotInfo is Undefined!");
        }else if(localBallots[ballotInfo.id]){ // Check if Id already exists ; FIXME: Handled correctly?
            console.log("Ballot " + ballotInfo.id + " already allocated.");
        }else{  // Allocate if ID valid & not existing
            setLocalBallots([...localBallots, ballotInfo]);
        }
        console.log("\tUpdating local Ballots " + localBallots);
    }, [ballotInfo])


    // TODO :: Refactor to local storage ?
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

    const convertBallotData = async () => {
        console.log("\tNumber of Polls: " + totalSCVotums.length);
        for (var i = 0; i < totalSCVotums.length; i++) {
            console.log("\tWorking on: #" + i + " - " + totalSCVotums[i]);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = await new ethers.Contract(
                totalSCVotums[i],
                ballotOpen.abi,
                provider
            );
            var _creator = ""+ await contract.creator();
            var _title = ""+ await contract.title();
            var _metainfo = ""+ await contract.metainfo();
            var _startTime = ""+ await contract.startTime();
            var _endTime = ""+ await contract.endTime();
            var _totalVotes = ""+ await contract.totalVotes();
            var _proVotes = ""+ await contract.proVotes();
            
            var _startDate = ""+ new Date(_startTime * 1000).toLocaleString();
            var _endDate = ""+ new Date(_endTime * 1000).toLocaleString();

            console.log('\tReceived Ballot Data' + '\n' + 
            '\t\t _creator: ' + _creator + " (" + typeof _creator + ")\n" +        
            '\t\t _title: ' + _title + " (" + typeof _title + ")\n" +
            '\t\t _metainfo: ' + _metainfo + " (" + typeof _metainfo + ")\n" +
            '\t\t _startTime: ' + _startTime + " (" + typeof _startTime + ")\n" +
            '\t\t _endTime: ' + _endTime + " (" + typeof _endTime + ")\n" +
            '\t\t _totalVotes: ' + _totalVotes + " (" + typeof _totalVotes + ")\n" +
            '\t\t _proVotes: ' + _proVotes + " (" + typeof _proVotes + ")\n" +
            '\t\t _startDate: ' + _startDate + " (" + typeof _startDate + ")\n" +
            '\t\t _endDate: ' + _endDate + " (" + typeof _endDate + ")\n"        
            );
            
            setBallotInfo({id: i, title: _title, creator: _creator, metainfo: _metainfo, startDate: _startDate, endDate: _endDate, totalVotes: _totalVotes, proVotes: _proVotes });
            console.log("\tConversion::BallotInfo: " + ballotInfo);
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
            console.log("\tDeployed to Address: " + contract.address);
        }
    }


    const voteYes = async(id) => {
        console.log("Calling Yes on Ballot #" + id);

        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = await new ethers.Contract(
                totalSCVotums[id],
                ballotOpen.abi,
                signer
            );
            const contractInteration = await contract.vote(BigNumber.from(2));
            console.log("\tSubmitted Vote 'YES' on #"+id);
            updateLocalBallotVote(id, 2);
        }

    }
    
    const voteNo = async(id) => {
        console.log("Calling No on Ballot #" + id);

        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = await new ethers.Contract(
                totalSCVotums[id],
                ballotOpen.abi,
                signer
            );
            const contractInteration = await contract.vote(BigNumber.from(1));
            console.log("\tSubmitted Vote 'NO' on #"+id);
            updateLocalBallotVote(id, 1);
        }
    }

    // Doesn't quite work
    const updateLocalBallotVote = (id, choice) => {
        console.log("\tUpdating local Ballot #" + id + "\n\t\tTotalVotes: " + localBallots[id].totalVotes + "\n\t\tProVotes: " + localBallots[id].proVotes);

        var tVotes = parseInt(localBallots[id].totalVotes);
        tVotes += 1;
        localBallots[id].totalVotes = tVotes.toString();
        if(choice === 2){
            var pVotes = parseInt(localBallots[id].proVotes);
            pVotes += 1;
            localBallots[id].proVotes = pVotes.toString();
        }
        console.log("\tUpdated local Ballot #" + id + "\n\t\tTotalVotes: " + localBallots[id].totalVotes + "\n\t\tProVotes: " + localBallots[id].proVotes);
    }


    return (
        <W3Context.Provider value={{ address, archive, localBallots, connect, setArchive, deployBallotToChain, voteYes, voteNo }}>
            {props.children}
        </W3Context.Provider>
    )
}

export default W3ContextProvider;