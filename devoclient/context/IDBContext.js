import React, { createContext, useState } from 'react';

export const IDBContext = createContext();

const IDBContextProvider = (props) => {
    // TODO Is there a more effective way to use IDB for Frontend-GUI ? 
    /**
     * Stores Ballot Addresses (Archive)
     */
    const [idbAddressCache, setIDBAddressCache] = useState([]);

    /**
     * Stores Contract information (Ballots)
     */
    const [idbContractCache, setIDBContractCache] = useState([]);

    const initiateIDB = async () => {
        var idbOpen = indexedDB.open("DevosDB", 1);
        idbOpen.onupgradeneeded = function () {
            var db = idbOpen.result;
            var store1 = db.createObjectStore("ballots", { keyPath: "id" });
            store1.createIndex("address", ["address"], {unique: true});
            console.log("Updated Ballots-Store");
            var store2 = db.createObjectStore("ballotInfo", { keyPath: "address"});
            store2.createIndex("title", ["title"], {unique: false});
            console.log("Updated BallotInfo-Store");
        }
    }

    const writeToBallotsTable = async (...records) => {
        console.log("Writing to IDB_Table " + "ballots", records);
        var idbOpen = indexedDB.open("DevosDB", 1);
        idbOpen.onsuccess = function () {
            var db = idbOpen.result;
            var transaction = db.transaction("ballots", "readwrite");
            var store = transaction.objectStore("ballots");
            for (var i = 0; i < records[0].length; i++) {
                var address = records[0][i];
                store.put({ id: i, address: address });
                console.log("\tStored " + address + " on local IDB.\n");
            }
        }
    }
    
    const readFromBallotsTable = () => {
        console.log("Reading from IDB_Table");

        var idbOpen = indexedDB.open("DevosDB", 1);
        idbOpen.onsuccess = function(){
            var db = idbOpen.result;
            var transaction = db.transaction("ballots", "readonly");
            var store = transaction.objectStore("ballots");
            var recordCountRequest = store.count();
            recordCountRequest.onsuccess = async function(){
                var ballotRequest = store.getAll();
                ballotRequest.onsuccess = function(){
                    var retVal = ballotRequest.result;
                    setIDBAddressCache(retVal);
                    console.log("Read from IDB_Table", retVal);
                    console.log("Updated Cache", idbAddressCache);
                }
            }
        }
    }

    const writeToInfoTable = (...records) => {
        console.log("Writing to IDB_Table " + "ballotInfo", records);
        var idbOpen = indexedDB.open("DevosDB", 1);
        idbOpen.onsuccess = function () {
            var db = idbOpen.result;

            var tx2 = db.transaction("ballotInfo", "readwrite");
            var store2 = tx2.objectStore("ballotInfo");
            var recordWriteRequest = store2.put({
                address: records[2], 
                title: records[3], 
                creator: records[1],
                metainfo: records[4],
                startTime: new Date(records[5] * 1000).toLocaleString(),
                endTime: new Date(records[6] * 1000).toLocaleString(),
                totalVotes: ""+records[7],
                proVotes: ""+records[8]                        
            });
            recordWriteRequest.onsuccess = function(){
                console.log("Migrated Data to IDB ", recordWriteRequest.result);
                
                
                setIDBAddressCache(...idbAddressCache, [recordWriteRequest.result]);
                console.log("Updated IDB Cache " , idbAddressCache);
            }            
        }
    }


    return (
        <IDBContext.Provider value={{ idbAddressCache, idbContractCache, initiateIDB, writeToBallotsTable, readFromBallotsTable, writeToInfoTable }}>
            {props.children}
        </IDBContext.Provider>
    )
}

export default IDBContextProvider;