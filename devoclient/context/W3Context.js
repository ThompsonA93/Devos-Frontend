import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import { IDBContext } from './IDBContext';

import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';
import ballotArchive from '../artifacts/contracts/BallotArchive.sol/BallotArchive.json';

export const W3Context = createContext();

const W3ContextProvider = (props) => {
    const { initiateIDBStorages, writeToAddressArchiveTable, readFromAddressArchiveTable, writeToContractTable, readFromContractTable } = useContext(IDBContext);

    const [address, setAddress] = useState('');
    const [archive, setArchive] = useState("0xf96D2E0f246C9ED18e5D250D3C3Eb30E1C47f6Fd");

    /**
     * @deprecated Stores Ballot Addresses (Archive)
     * Is not really relevant for this demo, but may become relevant for Cross-Chain voting
     */
     const [idbAddressCache, setIDBAddressCache] = useState([]);

     /**
      * Stores Contract information (Ballots)
      */
     const [idbContractCache, setIDBContractCache] = useState([]);

    /*
    useEffect(() => {
       console.log("Reloading after Cache-Update", idbAddressCache, idbContractCache);
    }, [idbAddressCache, idbContractCache]);
    */

    useEffect(() => {
        if (address !== '') {       // If logged in, load IDB-Backend
            readBallotsfromIDB();   // Hydration 2
        } else {                    // If not logged in, load blockchain-backend
            readBallotsFromChain(); // Hydration 1
        }
    }, [address]);

    //********************************************************************//
    //********************** Backend Functions ***************************//
    //********************************************************************//
    /**
     * @dev Initiates and builds database+storage objects
     */
    const readBallotsFromChain = async () => {
        console.log("W3ContextProvider::readBallotsFromChain, Archive at: " + archive);
        if (window.ethereum) {
            try {
                /****************** Blockchain ***********************/
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

                /****************** Indexed DB ***********************/
                const loadIDBStart = performance.now();
                initiateIDBStorages();
                var writePromise = writeToAddressArchiveTable(ballots);

                const loadIDBDuration = performance.now() - loadIDBStart;
                console.log("Wrote contract information to IDB.\n\tLoading Time: " + loadIDBDuration + "ms\n");            
            } catch (err) {
                console.log(err);
            }
        }
        writeBallotsToIDB();
    }

    // TODO Refactor this clusterfuck
    /**
     * @dev Migrates Ballot-Information from BC to IDB
     */
    const writeBallotsToIDB = async () => {
        console.log("Migrating blockchain ballot data to local storage", idbAddressCache);
        var ballotAddr = readFromAddressArchiveTable().then(async (result) => {
            console.log("Result", result);
            for(var i = 0; i < result.length; i++){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(
                    result[i].address,
                    ballotOpen.abi,
                    provider
                );
                
                const fullBallotInformation = await contract.getFullBallotInformation();
                console.log("Received Data from Chain: " + fullBallotInformation);
                var writePromise = writeToContractTable(
                    i,                          // ID to store as
                    fullBallotInformation[0],   // ArchiveAddress
                    fullBallotInformation[1],   // Creator
                    fullBallotInformation[2],   // BallotAddress
                    fullBallotInformation[3],   // Title
                    fullBallotInformation[4],   // Metainfo
                    new Date(fullBallotInformation[5] * 1000).toLocaleString(), // startTime
                    new Date(fullBallotInformation[6] * 1000).toLocaleString(), // endTime
                    ""+fullBallotInformation[7],    // totalVotes
                    ""+fullBallotInformation[8]     // proVotes
                ).then(result => {
                    // TODO do something?
                });
            }
        });
    }


    
    //********************************************************************//
    //********************** Frontend Functions **************************//
    //********************************************************************//
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

    const readBallotsfromIDB = () => {
        readFromContractTable().then(dataSets => {
            setIDBContractCache(dataSets);
        });
    }    




    /*
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
    */




    //********************************************************************//
    //*********************** Ballot Functions ***************************//
    //********************************************************************//
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




    return (
        <W3Context.Provider value={{ address, archive, idbContractCache, setArchive, connect, deployBallotToChain, voteYes, voteNo }}>
            {props.children}
        </W3Context.Provider>
    )
}

export default W3ContextProvider;