import React, { createContext, useEffect, useState } from 'react';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';
import ballotArchive from '../artifacts/contracts/BallotArchive.sol/BallotArchive.json';

export const W3Context = createContext();

const W3ContextProvider = (props) => {
    const [address, setAddress] = useState('');
    const [archive, setArchive] = useState("0xE4934b4007a417e0764F08Cbcd7F1db3EA66e69E");

    const [totalSCVotums, setTotalSCVotums] = useState([]);
    const [ballotInfo, setBallotInfo] = useState([]);
    const [localBallots, setLocalBallots] = useState([]);

    useEffect(() => {
        readBallotsFromChain();
        for (var i = 0; i < totalSCVotums.length; i++) {
            convertBallotData(i);
        }
        console.log("W3Context::UseEffect on Address " + address + "\n" +
            "\tCollected Blockchain information on " + totalSCVotums + "\n"
        );
    }, [address]);

    useEffect(() => {
        if (ballotInfo.id === undefined) {    // Disregard misallocated objects; Not sure where those come from
            console.log("\tBallotInfo is Undefined!");
        } else if (localBallots[ballotInfo.id]) { // Check if Id already exists ; FIXME: Handled correctly?
            console.log("\tBallot " + ballotInfo.id + " already allocated.");
        } else {  // Allocate if ID valid & not existing
            setLocalBallots([...localBallots, ballotInfo]);
        }
        
        console.log("W3Context::UseEffect on ballotInfo " + ballotInfo + "\n" + 
            "\tUpdating local Ballots " + localBallots + "\n"
        );
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

            try {
                var ballots = await contract.getAllBallots();
                setTotalSCVotums(ballots);
                console.log("\tReceived Ballots: " + totalSCVotums);
            } catch (err) {
                console.log(err);
            }
        }


    }

    const convertBallotData = async (i) => {
        console.log("\tNumber of Polls: " + totalSCVotums.length);
        //for (var i = 0; i < totalSCVotums.length; i++) {
        const t0 = performance.now();

        console.log("\tWorking on: #" + i + " - " + totalSCVotums[i]);
        if (localBallots[i]) {
            console.log("Local Ballot #" + i + " exists.\n")
        } else {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(
                    totalSCVotums[i],
                    ballotOpen.abi,
                    provider
                );
                var _creator = "" + await contract.creator();
                var _title = "" + await contract.title();
                var _metainfo = "" + await contract.metainfo();
                var _startTime = "" + await contract.startTime();
                var _endTime = "" + await contract.endTime();
                var _totalVotes = "" + await contract.totalVotes();
                var _proVotes = "" + await contract.proVotes();

                var _startDate = "" + new Date(_startTime * 1000).toLocaleString();
                var _endDate = "" + new Date(_endTime * 1000).toLocaleString();

                const t1 = performance.now();

                console.log('\tReceived Ballot Data' + '\n' +
                    '\t\t _creator: ' + _creator + " (" + typeof _creator + ")\n" +
                    '\t\t _title: ' + _title + " (" + typeof _title + ")\n" +
                    '\t\t _metainfo: ' + _metainfo + " (" + typeof _metainfo + ")\n" +
                    '\t\t _startTime: ' + _startTime + " (" + typeof _startTime + ")\n" +
                    '\t\t _endTime: ' + _endTime + " (" + typeof _endTime + ")\n" +
                    '\t\t _totalVotes: ' + _totalVotes + " (" + typeof _totalVotes + ")\n" +
                    '\t\t _proVotes: ' + _proVotes + " (" + typeof _proVotes + ")\n" +
                    '\t\t _startDate: ' + _startDate + " (" + typeof _startDate + ")\n" +
                    '\t\t _endDate: ' + _endDate + " (" + typeof _endDate + ")\n" +
                    '\t\t ReadTime: ' + (t1 - t0) + " ms\n"
                );
                // FIXME :: Testing area. Check on use for LocalStorage vs StateStorage vs IdxDB
                // Check three different criterias for testing scopes
                // Different Scenarios (Scalability, Performance, Efficiency, Cost)
                // Usecases: At University, Hospital, Gov...
                // Performance vs Trust 
                const importedContractData = {
                    id: i, 
                    title: _title, 
                    creator: _creator, 
                    metainfo: _metainfo, 
                    startDate: _startDate, 
                    endDate: _endDate, 
                    totalVotes: _totalVotes, 
                    proVotes: _proVotes
                }

                /***************************/
                /***** Session Storage *****/
                /***************************/
                sessionStorage.setItem("DevosBallotInformation_"+i, JSON.stringify(importedContractData));
                let sessionStorageContractData = sessionStorage.getItem("DevosBallotInformation_"+i);
                console.log(JSON.parse(sessionStorageContractData));

                /***************************/
                /***** IndexDB Storage *****/
                /***************************/
                // FIXME: DB Creation not needed for every worker thread
                


                

                /***************************/
                /****** State Storage ******/
                /***************************/
                // FIXME :: Dirty timeout versus Race Condition
                await new Promise(r => setTimeout(r, i * 233))
                setBallotInfo({ id: i, title: _title, creator: _creator, metainfo: _metainfo, startDate: _startDate, endDate: _endDate, totalVotes: _totalVotes, proVotes: _proVotes });
                console.log("\tConversion::BallotInfo: " + ballotInfo);

            } catch (err) {
                console.log(err);
            }
        }
        //}
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

            try {
                const contract = await scFactory.deploy(archive, title, metainfo, BigNumber.from(votingDays));
                console.log("\tDeployed to Address: " + contract.address);
            } catch (err) {
                console.log(err);
            }
        }
    }


    const voteYes = async (id) => {
        console.log("Calling Yes on Ballot #" + id);
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = await new ethers.Contract(
                totalSCVotums[id],
                ballotOpen.abi,
                signer
            );

            try {
                const contractInteration = await contract.vote(BigNumber.from(2));
                console.log("\tSubmitted Vote 'YES' on #" + id);
                updateLocalBallotVote(id, 2);
            } catch (err) {
                console.log(err);

            }

        }

    }

    const voteNo = async (id) => {
        console.log("Calling No on Ballot #" + id);

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = await new ethers.Contract(
                totalSCVotums[id],
                ballotOpen.abi,
                signer
            );

            try {
                const contractInteration = await contract.vote(BigNumber.from(1));
                console.log("\tSubmitted Vote 'NO' on #" + id);
                updateLocalBallotVote(id, 1);
            } catch (err) {
                console.log(err);
            }
        }
    }

    // TODO -- Test, seems a little erratic at times
    const updateLocalBallotVote = (id, choice) => {
        console.log("\tUpdating local Ballot #" + id + "\n\t\tTotalVotes: " + localBallots[id].totalVotes + "\n\t\tProVotes: " + localBallots[id].proVotes);

        var tVotes = parseInt(localBallots[id].totalVotes);
        tVotes += 1;
        localBallots[id].totalVotes = tVotes.toString();
        if (choice === 2) {
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