import React, { useContext, useEffect, useState } from 'react';
import { W3Context } from '../context/W3Context';
import PollDetails from './PollDetails';

const PollUser = () => {
    const { address, loadedBackend } = useContext(W3Context);
    const [ballotData, setBallotData] = useState([]);

    useEffect(() => {
        if(loadedBackend){
            console.log("PollUser::Detected unlock of loaded Backend");
            fetchBallotData()
        }
    }, [loadedBackend]);

    useEffect(() => {
        console.log("Refreshing", ballotData);
    }, [ballotData]);

    const fetchBallotData = () => {
        console.log("Updated from IDB");

        var idbOpen = indexedDB.open("DevosDB", 1);
        idbOpen.onsuccess =function(){
            var db = idbOpen.result;
            var tx2 = db.transaction("ballotInfo", "readonly");
            var store = tx2.objectStore("ballotInfo");
            var recordReadRequest = store.getAll();
            recordReadRequest.onsuccess = function(){
                console.log("BallotInfo-IDB Request fetched: ", recordReadRequest.result);
                
                for(var i = 0; i < recordReadRequest.result.length; i++){
                    var record = {
                        id: i,
                        creator: recordReadRequest.result[i].creator,
                        address: recordReadRequest.result[i].address,
                        title: recordReadRequest.result[i].title,
                        metainfo: recordReadRequest.result[i].metainfo,
                        startTime: recordReadRequest.result[i].startTime,
                        endTime: recordReadRequest.result[i].endTime,
                        totalVotes: recordReadRequest.result[i].totalVotes,
                        proVotes: recordReadRequest.result[i].proVotes
                    }
                    setBallotData(...ballotData, [ record ]);
                }
                //setBallotData([recordReadRequest.result]);
                console.log("Cached for Hydration " , ballotData);
            }    
        }
    }

    return (
        <dl className='m-4'>
            {   
                ballotData.map(ballot => {
                    console.log("Filtering on creator: " + ballot.creator);
                    return ballot.creator === address ? (
                        <PollDetails ballot={ballot} />
                    ) : (
                        <></>
                    )
                })
            }
            
            {
            /* {localBallots.map(poll => {
                //console.log("\t\tCheck to render user ballot: \n\t" + poll.id + " || "+ poll.creator +  ":" + address);
                return poll.creator === address ? (
                    <PollDetails poll={poll} key={poll.id} />
                ) : (
                    <></>
                )
            })} */
            }
        </dl>
    )
}

export default PollUser;