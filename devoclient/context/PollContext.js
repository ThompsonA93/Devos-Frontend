import React, {createContext, useContext, useEffect, useState } from 'react';
import { W3Context } from './W3Context';
import { ethers, BigNumber, ContractFactory } from 'ethers';
import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';

export const PollContext = createContext();

const PollContextProvider = (props) => {
    // Store addresses
    const { address, totalVotums } = useContext(W3Context);
    const [votumsIndex, setVotumsIndex] = useState(0);

    // Local Display of chain contract metadata (Creator, title, ...)
    const [totalPolls, setTotalPolls] = useState([]);
    const [runningPolls, setRunningPolls] = useState([]);
    const [completedPolls, setCompletedPolls] = useState([]);
    const [userPolls, setUserPolls] = useState([]);

    //{id: 1, title: 'Blockchain Party', creator: '0x4898426fBfc21F6c1a855631DaE0891B2c9e5e8A', metainfo:'Somebody should create a party concerning the implementation of Blockchain systems!', votingDays:14, totalVotes: 0, proVotes:0},

    useEffect(() => {
        updatePolls();
    }, [totalVotums]);

    const updatePolls = async () => {
        for(; votumsIndex < totalVotums.length;){
            console.log("Updating local Polls: " + totalVotums[votumsIndex]);

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
            console.log("Reading from openBallot: \nCreator: " + creator + "\nTitle:" + title + "\nMetainfo:" + metainfo + "\nTime:" + startTime + " -- " + endTime + "\nVotes: " + totalVotes + "/" + proVotes);
                

            var startDate = new Date(startTime * 1000).toLocaleString();
            var endDate = new Date(endTime * 1000).toLocaleString();

            console.log("Calculated voting days: \n\t" + startDate + " \n\t" + endDate);

            console.log("Current user: " + address);
            if(creator === address){
                console.log("User is Creator.");
                setUserPolls([...userPolls, {id: votumsIndex, title, creator, metainfo, startDate, endDate, totalVotes, proVotes }]);
                console.log("Allocated UserBallot: " + userPolls);
            }




            setTotalPolls([...totalPolls, {id: votumsIndex, title, creator, metainfo, startDate, endDate, totalVotes, proVotes }]);

            setVotumsIndex(votumsIndex++);
            console.log("Updated running index: " + votumsIndex);
        }
    }



    return (
        <PollContext.Provider value={{totalPolls, runningPolls, completedPolls, userPolls}}>
            {props.children}
        </PollContext.Provider>
    )
}

export default PollContextProvider;