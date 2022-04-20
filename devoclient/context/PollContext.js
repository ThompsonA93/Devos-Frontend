import React, {createContext, useState } from 'react';

export const PollContext = createContext();

const PollContextProvider = (props) => {
    const [polls, setPolls] = useState([
        {id: 1, title: 'Blockchain Party', author: '0x4898426fBfc21F6c1a855631DaE0891B2c9e5e8A', description:'Somebody should create a party concerning the implementation of Blockchain systems!'},
        {id: 2, title: 'Sanction Netflix', author: '0x02Ea8B53386b8790C291333dA9dD33f5d69A9EC5', description:'Netflix just sucks. It should pay more tax.'},
        {id: 3, title: 'Support local industry', author: '0x35E36A676d6B1A35007Dc95d9DFA25B45B93c462', description:'Support companies which produce single egg cartons and bread bags.'},
    ]);

    const createPoll = (title, author, description) => {
        var id = polls.length+1;
        setPolls([...polls, {id, title, author, description}]);
        console.log("PollContext::Creating Poll\nID:" + id + "Title:" + title + "\nAuthor:" + author + "\nDescription:" + description);
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