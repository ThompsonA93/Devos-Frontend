import React, {createContext, useState } from 'react';

export const PollContext = createContext();

const PollContextProvider = (props) => {
    const [polls, setPolls] = useState([
        {id: 1, title: 'Blockchain Party', creator: '0x4898426fBfc21F6c1a855631DaE0891B2c9e5e8A', metainfo:'Somebody should create a party concerning the implementation of Blockchain systems!', votingDays:14},
    ]);

    const createPoll = (creator, title, metainfo, votingDays) => {
        var id = polls.length+1;
        setPolls([...polls, {id, creator, title, metainfo, votingDays}]);
        console.log("PollContext::Creating Poll\nID:" + id + "Title:" + title + "\nAuthor:" + creator + "\nDescription:" + metainfo);
        console.log(polls);
    }

    const removePoll = (title) => {
        console.log("PollContext::Removing Poll\nTitle:" + title);
        setPolls(polls.filter(poll => poll.title !== title));
    }

    return (
        <PollContext.Provider value={{polls, createPoll, removePoll}}>
            {props.children}
        </PollContext.Provider>
    )
}

export default PollContextProvider;