import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import { IDBContext } from './IDBContext';

import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';
import ballotArchive from '../artifacts/contracts/BallotArchive.sol/BallotArchive.json';

export const W3Context = createContext();

const W3ContextProvider = (props) => {
    /**
     * IDB Interface, @see IDBContext.js
     */
    const { initiateIDBStorages, writeToAddressArchiveTable, readFromAddressArchiveTable, writeToContractTable, readFromContractTable, updateContractTableVotes } = useContext(IDBContext);

    /**
     * Blockchain Metadata
     */
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

    /**
     * Awaits change on Address -- Separates phases of data loading
     */
    useEffect(() => {
        if (address !== '') {       // If logged in, load IDB-Backend
            console.log("W3Context::Loading from IDB to cache");
            readBallotsfromIDB();   // Hydration 2
        } else {                    // If not logged in, load blockchain-backend
            console.log("W3Context::Loading from Chain to IDB");
            readBallotsFromChain(); // Hydration 1
        }
    }, [address]);


    //********************************************************************//
    //********************** Backend Functions ***************************//
    //********************************************************************//
    /**
     * @dev Fetches ArchiveAddress information (and stores it via method call)
     */
    const readBallotsFromChain = async () => {
        console.log("W3Context::Reading archive-data from " + archive);
        if (window.ethereum) {
            try {
                /****************** Blockchain ***********************/
                let bcPerformanceStart = performance.now();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(
                    archive,
                    ballotArchive.abi,
                    provider
                );
                var ballots = await contract.getAllBallots();
                const bcPerformanceEnd = performance.now() - bcPerformanceStart;
                console.log("#1# Received Ballots: " + ballots + "\n\tLoading Time: " + bcPerformanceEnd + "ms\n");

                /****************** Indexed DB ***********************/
                const idbPerformanceStart = performance.now();

                initiateIDBStorages();
                var writePromise = writeToAddressArchiveTable(ballots);

                const idbPerformanceEnd = performance.now() - idbPerformanceStart;
                console.log("#2# Wrote contract information to IDB.\n\tLoading Time: " + idbPerformanceEnd + "ms\n");            
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
            let bcPerformanceStart = performance.now();
            for(var i = 0; i < result.length; i++){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(
                    result[i].address,
                    ballotOpen.abi,
                    provider
                );
                
                const fullBallotInformation = await contract.getFullBallotInformation();
                const bcPerformanceEnd = performance.now() - bcPerformanceStart;
                console.log("#3# Received ContractData: " + fullBallotInformation + "\n\tLoading Time: " + bcPerformanceEnd + "ms\n");

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
        const idbPerformanceStart = performance.now();
        readFromContractTable().then(dataSets => {
            setIDBContractCache(dataSets);
            const idbPerformanceEnd = performance.now() - idbPerformanceStart;
            console.log("#4# Cached contract information to IDB.", idbContractCache, "\n\tLoading Time: " + idbPerformanceEnd + "ms\n");
        });

    }    



    // TODO -- Test, seems a little erratic at times
    const updateCachedBallotVote = (id, choice) => {
        console.log("\tUpdating local Ballot #" + id + "\n\t\tTotalVotes: " + idbContractCache[id].totalVotes + "\n\t\tProVotes: " + idbContractCache[id].proVotes);

        var tVotes = parseInt(idbContractCache[id].totalVotes);
        tVotes += 1;
        idbContractCache[id].totalVotes = tVotes.toString();
        if (choice === 2) {
            var pVotes = parseInt(idbContractCache[id].proVotes);
            pVotes += 1;
            idbContractCache[id].proVotes = pVotes.toString();
        }
        console.log("\tUpdated local Ballot #" + id + "\n\t\tTotalVotes: " + idbContractCache[id].totalVotes + "\n\t\tProVotes: " + idbContractCache[id].proVotes);
    }




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
                idbContractCache[id].address,
                ballotOpen.abi,
                signer
            );

            try {
                const contractInteration = await contract.vote(BigNumber.from(2));
                console.log("\tSubmitted Vote 'YES' on #" + id);
                updateCachedBallotVote(id, 2);
                updateContractTableVotes(id, 2);
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
                idbContractCache[id].address,
                ballotOpen.abi,
                signer
            );

            try {
                const contractInteration = await contract.vote(BigNumber.from(1));
                console.log("\tSubmitted Vote 'NO' on #" + id);
                updateCachedBallotVote(id, 1);
                updateContractTableVotes(id, 1);
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