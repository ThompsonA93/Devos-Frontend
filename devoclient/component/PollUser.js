import React, { useContext, useEffect, useState } from 'react';
import { W3Context } from '../context/W3Context';
import PollDetails from './PollDetails';

const PollUser = () => {
    const { address, loadedBackend } = useContext(W3Context);

    const [ballotData, setBallotData] = useState([]);

    useEffect(() => {
        console.log("PollUser::Detected unlock of loaded Backend");
        fetchBallotData();
    }, [loadedBackend]);

    const fetchBallotData = () => {
        console.log("Updated from IDB");

        var idbOpen = indexedDB.open("DevosDB", 1);
        var db = idbOpen.result;
        var tx2 = db.transaction("ballotInfo", "readonly");
        var store = tx2.objectStore("ballotInfo");
        var recordReadRequest = store.getAll();
        recordReadRequest.onsuccess = function(){
            console.log(recordReadRequest);
            setBallotData(...ballotData, [ recordReadRequest]);
        }
    }

    return (
        <dl className='m-4'>
            {
                ballotData.map(ballot => {
                    return ballot.creator === address ? (
                        <PollDetails ballot={ballot} />
                    ) : (
                        <></>
                    )
                })
            }
            
            {/* {localBallots.map(poll => {
                //console.log("\t\tCheck to render user ballot: \n\t" + poll.id + " || "+ poll.creator +  ":" + address);
                return poll.creator === address ? (
                    <PollDetails poll={poll} key={poll.id} />
                ) : (
                    <></>
                )
            })} */}
        </dl>
    )
}

export default PollUser;