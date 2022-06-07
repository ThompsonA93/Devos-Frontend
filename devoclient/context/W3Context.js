import React, { createContext, useEffect, useState } from 'react';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';
import ballotArchive from '../artifacts/contracts/BallotArchive.sol/BallotArchive.json';

import IDBHandler from '../scripts/IDBHandler';

export const W3Context = createContext();

const W3ContextProvider = (props) => {
    const [address, setAddress] = useState('');
    const [archive, setArchive] = useState("0xE4934b4007a417e0764F08Cbcd7F1db3EA66e69E");

    const [loadTotalBallotsDB, setLoadTotalBallotsDB] = useState(false);
    const [loadSingleBallots, setLoadSingleBallots] = useState(0);

    // On Login
    useEffect(() => {
        if (address !== '') {
            setLoadTotalBallotsDB(true);
            console.log("\tW3Context::UseEffect on Address [" + address + "]\n");
        }
    }, [address]);

    // Update IDB-DB TotalBallots
    useEffect(() => {
        if (loadTotalBallotsDB) {
            console.log("\tW3Context::UseEffect on loadTotalBallotsDB [" + loadTotalBallotsDB + "]\n");
            readBallotsFromChain();
            setLoadTotalBallotsDB(false);
        }
    }, [loadTotalBallotsDB]);

    // Update IDB-DB SingleBallots
    useEffect(() => {
        if (loadSingleBallots) {
            console.log("\tW3Context::UseEffect on setLoadSingleBallots.\n");
            for (var i = 0; i < loadSingleBallots; i++) {
                convertBallotData(i);
            }

        }
    }, [loadSingleBallots]);

    const connect = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const address = ethers.utils.getAddress(accounts[0]);
            console.log("\tUser detected: " + address);
            setAddress(address);
        }
        console.log("\tChange in Address: " + address);
    }

    const readBallotsFromChain = async () => {
        console.log("W3ContextProvider::readBallotsFromChain, Archive at: " + archive);
        if (window.ethereum) {
            try {
                const loadContractStart = performance.now();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(
                    archive,
                    ballotArchive.abi,
                    provider
                );
                var ballots = await contract.getAllBallots();
                const loadContractDuration = performance.now() - loadContractStart;
                console.log("\tReceived Ballots: " + ballots + "\n\tLoading Time: " + loadContractDuration + "ms\n");

                // Load Address-Votums to IDB
                const loadIDBStart = performance.now();
                
                setLoadSingleBallots(ballots.length);
            
            } catch (err) {
                console.log(err);
            }

        }
    }

    const convertBallotData = async (id) => {
        console.log("\tWorking on contract #" + id + "\n");
        try {
            const request = indexedDB.open("DevosDB", 1);
            var contractAddress;
            request.onerror = function (event) {
                console.log("IDB-Loading error: " + event);
            }
            request.onupgradeneeded = function () {
                const db = request.result;
            }
            request.onsuccess = function (id) {
                const db = request.result;
                const transaction = db.transaction("ballots", "readwrite");
                const store = transaction.objectStore("ballots");
                const query = store.get(1);
                contractAddress = query.result;
                
            }
            console.log("Fetched Address: " + contractAddress);

            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const contract = new ethers.Contract(
            //     contractaddress,
            //     ballotOpen.abi,
            //     provider
            // );
            // var _creator = "" + await contract.creator();
            // var _title = "" + await contract.title();
            // var _metainfo = "" + await contract.metainfo();
            // var _startTime = "" + await contract.startTime();
            // var _endTime = "" + await contract.endTime();
            // var _totalVotes = "" + await contract.totalVotes();
            // var _proVotes = "" + await contract.proVotes();

            // var _startDate = "" + new Date(_startTime * 1000).toLocaleString();
            // var _endDate = "" + new Date(_endTime * 1000).toLocaleString();

            // console.log('\tReceived Ballot Data' + '\n' +
            //     '\t\t _creator: ' + _creator + " (" + typeof _creator + ")\n" +
            //     '\t\t _title: ' + _title + " (" + typeof _title + ")\n" +
            //     '\t\t _metainfo: ' + _metainfo + " (" + typeof _metainfo + ")\n" +
            //     '\t\t _startTime: ' + _startTime + " (" + typeof _startTime + ")\n" +
            //     '\t\t _endTime: ' + _endTime + " (" + typeof _endTime + ")\n" +
            //     '\t\t _totalVotes: ' + _totalVotes + " (" + typeof _totalVotes + ")\n" +
            //     '\t\t _proVotes: ' + _proVotes + " (" + typeof _proVotes + ")\n" +
            //     '\t\t _startDate: ' + _startDate + " (" + typeof _startDate + ")\n" +
            //     '\t\t _endDate: ' + _endDate + " (" + typeof _endDate + ")\n" +
            //     '\t\t ReadTime: ' + (t1 - t0) + " ms\n"
            // );

            // const importedContractData = {
            //     id: i,
            //     title: _title,
            //     creator: _creator,
            //     metainfo: _metainfo,
            //     startDate: _startDate,
            //     endDate: _endDate,
            //     totalVotes: _totalVotes,
            //     proVotes: _proVotes
            // }
            // console.log("As Object: " + importedContractData);

            /***************************/
            /***** IndexDB Storage *****/
            /***************************/
            // FIXME: DB Creation not needed for every worker thread


        } catch (err) {
            console.log(err);
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

            try {
                const contract = await scFactory.deploy(archive, title, metainfo, BigNumber.from(votingDays));
                console.log("\tDeployed to Address: " + contract.address);
            } catch (err) {
                console.log(err);
            }
        }
    }


    const voteYes = async (id) => {
        console.log("\tCalling Yes on Ballot #" + id);
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
        console.log("\tCalling No on Ballot #" + id);

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
        <W3Context.Provider value={{ address, archive, connect, setArchive, deployBallotToChain, voteYes, voteNo }}>
            {props.children}
        </W3Context.Provider>
    )
}

export default W3ContextProvider;