import React, { createContext, useEffect, useState } from 'react';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';
import ballotArchive from '../artifacts/contracts/BallotArchive.sol/BallotArchive.json';

export const W3Context = createContext();

const W3ContextProvider = (props) => {
    const [address, setAddress] = useState('');
    const [archive, setArchive] = useState("0xf96D2E0f246C9ED18e5D250D3C3Eb30E1C47f6Fd");

    const [loadedBackend, setLoadedBackend] = useState(false);

    // On Login
    useEffect(() => {
        if (address !== '') {
            console.log("\tW3Context::UseEffect on Address [" + address + "]\n");
            setLoadedBackend(true);             // Hydration 2 -- Load IDB Data to Frontend
        } else {
            readBallotsFromChain();             // Hydration 1 -- Load ALL blockchain data
        }
    }, [address]);

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

                var idbOpen = indexedDB.open("DevosDB", 1);
                idbOpen.onerror = function (event) {
                    console.log("IDB-Loading error: " + event);
                }
                idbOpen.onupgradeneeded = function () {
                    var db = idbOpen.result;
                    var store1 = db.createObjectStore("ballots", { keyPath: "id" });
                    store1.createIndex("address", ["address"], {unique: true});
                    console.log("Updated Ballots-Store");
                    var store2 = db.createObjectStore("ballotInfo", { keyPath: "address"});
                    store2.createIndex("title", ["title"], {unique: false});
                    console.log("Updated BallotInfo-Store");
                }
                idbOpen.onsuccess = function () {
                    var db = idbOpen.result;
                    var transaction = db.transaction("ballots", "readwrite");
                    var store = transaction.objectStore("ballots");
                     for (var i = 0; i < ballots.length; i++) {
                        var address = ballots[i];
                        store.put({ id: i, address: address });
                        console.log("\tStored " + address + " on local IDB.\n");
                    }
                }
                const loadIDBDuration = performance.now() - loadIDBStart;
                console.log("Wrote contract information to IDB.\n\tLoading Time: " + loadIDBDuration + "ms\n");            
            } catch (err) {
                console.log(err);
            }
        }
        migrateBallotData();
    }

    // TODO Refactor this clusterfuck
    /**
     * @dev Migrates Ballot-Information from BC to IDB
     */
    const migrateBallotData = async () => {
        console.log("Migrating blockchain ballot data to local storage");
        var idbOpen = indexedDB.open("DevosDB", 1);
        idbOpen.onsuccess = async function(){
            console.log("\tIDB-Connection Success. Reading TotalBallotAddresses");
            var db = idbOpen.result;
            var transaction = db.transaction("ballots", "readonly");
            var store = transaction.objectStore("ballots");
            var recordCountRequest = store.count();
            recordCountRequest.onsuccess = async function(){
                console.log("\tCounting: " + recordCountRequest.result);
                for(var i = 0; i < recordCountRequest.result; i++){
                    var ballotRequest = store.get(i);
                    ballotRequest.onsuccess = async function(){
                        console.log("\t\tFetched ", ballotRequest.result);
                        var addr = ballotRequest.result.address;

                        try{
                            const provider = new ethers.providers.Web3Provider(window.ethereum);
                            const contract = new ethers.Contract(
                                addr,
                                ballotOpen.abi,
                                provider
                            );
                            const fullBallotInformation = await contract.getFullBallotInformation();
                            console.log("Received Data from Chain: " + fullBallotInformation);
                            
                            var tx2 = db.transaction("ballotInfo", "readwrite");
                            var store2 = tx2.objectStore("ballotInfo");
                            var recordWriteRequest = store2.put({
                                address: fullBallotInformation[2], 
                                title: fullBallotInformation[3], 
                                creator: fullBallotInformation[1],
                                metainfo: fullBallotInformation[4],
                                startTime: new Date(fullBallotInformation[5] * 1000).toLocaleString(),
                                endTime: new Date(fullBallotInformation[6] * 1000).toLocaleString(),
                                totalVotes: ""+fullBallotInformation[7],
                                proVotes: ""+fullBallotInformation[8]                        
                            });
                            recordWriteRequest.onsuccess = async function(){
                                console.log("Migrated Data to IDB ", recordWriteRequest.result);
                            }
                        }catch(err){
                            console.log(err)
                        }
                    }
                }
            }
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
        <W3Context.Provider value={{ address, archive, setArchive, loadedBackend, connect, deployBallotToChain, voteYes, voteNo }}>
            {props.children}
        </W3Context.Provider>
    )
}

export default W3ContextProvider;