import React, { createContext, useState } from 'react';

export const IDBContext = createContext();

/**
 * Acts as interface to communicate with indexed DB
 * @param props 
 * @returns 
 */
const IDBContextProvider = (props) => {
    /**
     * Initiates the data storages for the IDB
     */
    function initiateIDBStorages(){
        var idbOpen = indexedDB.open("DevosDB", 1);
        idbOpen.onupgradeneeded = function () {
            var db = idbOpen.result;
            var store1 = db.createObjectStore("ballots", { keyPath: "id" });
            store1.createIndex("address", ["address"], {unique: true});
            console.log("IDB::Updated Ballots-Store");
            var store2 = db.createObjectStore("ballotInfo", { keyPath: "id"});
            store2.createIndex("address", ["address"], {unique: true});
            store2.createIndex("title", ["title"], {unique: false});
            console.log("IDB::Updated BallotInfo-Store");
        }
    }

    /**
     * Writes information to the ballots-table, which holds the Smart contract addresses for each ballot
     * @param  {...any} records as addresses (Object!)
     * @returns Resolved promise or error
     */
    function writeToAddressArchiveTable(...records) {
        return new Promise(
            function(resolve, reject){
                if(records === undefined) reject(Error('Attempted to Write \'undefined\' to IDB'))
                var idbOpen = indexedDB.open("DevosDB", 1);
                idbOpen.onsuccess = function (event) {
                    //var db = idbOpen.result;
                    var db = event.target.result;
                    var transaction = db.transaction("ballots", "readwrite");
                    var store = transaction.objectStore("ballots");
                    for (var i = 0; i < records[0].length; i++) {
                        var address = records[0][i];
                        var objectStoreRequest = store.put({ id: i, address: address });
                        console.log("IDB::Write Archive-Address", address)
                    }
                    resolve("IDB::Resolved ArchiveAddress data store");
                    // TODO store.put could use improved onsuccess, but care of resolving promise too early
                }
            }
        )
    }
    
    /**
     * 
     * @returns addresses from the table containing all smart contract addresses
     */
    function readFromAddressArchiveTable(){
        return new Promise(
            function(resolve, reject){
                var idbOpen = indexedDB.open("DevosDB", 1);
                idbOpen.onsuccess = function(event){
                    //var db = idbOpen.result;
                    var db = event.target.result;
                    var transaction = db.transaction("ballots", "readonly");
                    var store = transaction.objectStore("ballots");
                    var ballotRequest = store.getAll();
                    ballotRequest.onsuccess = function(event){
                        if(ballotRequest.result){
                            console.log("IDB::Read Archive-Addresses", ballotRequest.result);
                            resolve(ballotRequest.result);
                        } else reject(Error('No Objects received'));       
                    }
                }
            }
        )
    }

    /**
     * @returns data of the smart contracts from the table containing all smart contract information
     */
    function readFromContractTable(){
        return new Promise(
            function(resolve, reject){
                var idbOpen = indexedDB.open("DevosDB", 1);
                idbOpen.onsuccess = function(event){
                    //var db = idbOpen.result;
                    var db = event.target.result;
                    var transaction = db.transaction("ballotInfo", "readonly");
                    var store = transaction.objectStore("ballotInfo");
                    var ballotRequest = store.getAll();
                    ballotRequest.onsuccess = function(event){
                        if(ballotRequest.result){
                            console.log("IDB::Read Contract-Data", ballotRequest.result);
                            resolve(ballotRequest.result);
                        } else reject(Error('No Objects received'));       
                    }
                }
            }
        )
    }

    /**
     * Writes smart contract metainformation to ballotInfo
     * @param  {...any} records as previously fetched smart contract information (@see W3Context.migrateBallotData)
     * @returns 
     */
    function writeToContractTable(...records){
        return new Promise(
            function(resolve,reject){
                var idbOpen = indexedDB.open("DevosDB", 1);
                idbOpen.onsuccess = function(event){
                    var db = event.target.result;
                    var tx = db.transaction("ballotInfo", "readwrite");
                    var store = tx.objectStore("ballotInfo");
                    var record = Object.assign({
                        id: records[0],                 // ID to store as
                        //archiveAddress: records[1],   // ArchiveAddress
                        creator: records[2],            // Creator
                        address: records[3],            // BallotAddress
                        title: records[4],              // Title
                        metaInfo: records[5],           // Metainfo
                        startTime: records[6],          // startTime
                        endTime: records[7],            // endTime
                        totalVotes: records[8],         // totalVotes
                        proVotes: records[9]            // proVotes
                    });
                    var recordWriteRequest = store.put(record);
                    recordWriteRequest.onsuccess = function(event){
                        console.log("IDB::Write Contract-Data", event.target.result);
                        resolve(recordWriteRequest);
                    }  
                }
            }
        )
    }

    

    return (
        <IDBContext.Provider value={{ initiateIDBStorages, writeToAddressArchiveTable, readFromAddressArchiveTable, writeToContractTable, readFromContractTable }}>
            {props.children}
        </IDBContext.Provider>
    )
}

export default IDBContextProvider;