import React, {createContext, useContext, useEffect, useState } from 'react';
import { W3Context } from './W3Context';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';

export const PollContext = createContext();

const PollContextProvider = (props) => {
    // Store addresses
    const { address, totalVotums } = useContext(W3Context);

    // Local Display of chain contract metadata (Creator, title, ...)
    const [totalPolls, setTotalPolls] = useState([]);
    const [runningPolls, setRunningPolls] = useState([]);
    const [completedPolls, setCompletedPolls] = useState([]);
    const [userPolls, setUserPolls] = useState([]);


    const updatePolls = async() => {
        console.log("\tNumber Polls: " + totalVotums.length);

        for(var i = 0; i < totalVotums.length; i++){
            console.log("\tWorking on: #" + i + " - " + totalVotums[i]);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = await new ethers.Contract(
                totalVotums[i],
                ballotOpen.abi,
                provider
            );
            var creator = await contract.creator();
            var title = await contract.title();
            var metainfo = await contract.metainfo();
            var startTime = await contract.startTime();
            var endTime = await contract.endTime();
            var totalVotes = await contract.totalVotes();
            var proVotes = await contract.proVotes();
            var startDate = new Date(startTime * 1000).toLocaleString();
            var endDate = new Date(endTime * 1000).toLocaleString();

            console.log("\tLocally allocated Ballot data: IT:" + i + "\n\tCreator: " + creator + "\n\tTitle:" + title + "\n\tMetainfo:" + metainfo + "\n\tTime:" + startDate + " -- " + endDate + "\n\tVotes: " + totalVotes + "/" + proVotes);
            setTotalPolls([...totalPolls, {id: i+1, title, creator, metainfo, startDate, endDate, totalVotes, proVotes }]);

        }
    }


    

    //{id: 1, title: 'Blockchain Party', creator: '0x4898426fBfc21F6c1a855631DaE0891B2c9e5e8A', metainfo:'Somebody should create a party concerning the implementation of Blockchain systems!', votingDays:14, totalVotes: 0, proVotes:0},
    /*
    useEffect(() => {
        console.log("PollContextProvider::UseEffect Triggered, Change in Votums: " + totalVotums);
        console.log("\tTotal Polls " + totalPolls.length + "\tRunning Polls " + runningPolls.length + "\tCompleted Polls " + completedPolls.length + "\tUser Polls " + userPolls.length);
        updatePolls();
    }, [address]);
    */
   /*
    const updatePolls = async () => {
        console.log("PollContextProvider::updatePolls, Number Polls: " + totalVotums.length);

        for(var i = 0; i < totalVotums.length; i++){
            console.log("\tWorking on: #" + votumsIndex + " - " + totalVotums[votumsIndex]);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = await new ethers.Contract(
                totalVotums[votumsIndex],
                ballotOpen.abi,
                provider
            );
            var creator = await contract.creator();
            var title = await contract.title();
            var metainfo = await contract.metainfo();
            var startTime = await contract.startTime();
            var endTime = await contract.endTime();
            var totalVotes = await contract.totalVotes();
            var proVotes = await contract.proVotes();

            var startDate = new Date(startTime * 1000).toLocaleString();
            var endDate = new Date(endTime * 1000).toLocaleString();

            console.log("\tLocally allocated Ballot data:\n\tCreator: " + creator + "\n\tTitle:" + title + "\n\tMetainfo:" + metainfo + "\n\tTime:" + startDate + " -- " + endDate + "\n\tVotes: " + totalVotes + "/" + proVotes);
            setTotalPolls([...totalPolls, {id: votumsIndex, title, creator, metainfo, startDate, endDate, totalVotes, proVotes }]);
            console.log("\tAllocated to Total Polls")
            if(creator == address){
                setUserPolls([...userPolls, {id: votumsIndex, title, creator, metainfo, startDate, endDate, totalVotes, proVotes }]);
                console.log("\tAllocated to User Polls")
            }
            if(endDate.getTime < new Date().getTime()){
                setRunningPolls([...runningPolls, {id: votumsIndex, title, creator, metainfo, startDate, endDate, totalVotes, proVotes }]);
                console.log("\tAllocated to Running Polls")
            }else{
                setCompletedPolls([...completedPolls, {id: votumsIndex, title, creator, metainfo, startDate, endDate, totalVotes, proVotes }]);
                console.log("\tAllocated to Completed Polls")
            }
        }


    }
    */

    return (
        <PollContext.Provider value={{totalPolls, runningPolls, completedPolls, userPolls}}>
            {props.children}
        </PollContext.Provider>
    )
}

export default PollContextProvider;