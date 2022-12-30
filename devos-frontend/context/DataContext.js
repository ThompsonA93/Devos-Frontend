import React, { createContext, useState, useEffect } from 'react';
import { ethers, BigNumber, ContractFactory } from 'ethers';

import ballotOpen from '../artifacts/contracts/BallotOpen.sol/BallotOpen.json';
import ballotArchive from '../artifacts/contracts/BallotArchive.sol/BallotArchive.json';

export const DataContext = createContext();

const DataContextProvider = (props) => {
  const [address, setAddress] = useState('');
  const [archive, setArchive] = useState(
    '0x67299F7a686a3E4eBfC79Ea7d8B5782Cc729a060'
  );
  const [iDB, setiDB] = useState(false);

  /**
   * Stores Contract information (Ballots)
   */
  const [idbContractCache, setIDBContractCache] = useState([]);

  /*
  useEffect(() => {
     console.log("Reloading after Cache-Update", idbAddressCache, idbContractCache);
  }, [idbAddressCache, idbContractCache]);
  */

  useEffect(() => {
    if (address !== '') {
      // If logged in, load IDB-Backend
      readBallotsfromIDB(); // Hydration 2
    } else if (address === '' && iDB) {
      // If not logged in, load blockchain-backend
      readBallotsFromChain(); // Hydration 1
    } else {
      initiateIDBStorages(); // Initialize
    }
  }, [address, iDB]);

  const connect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const address = ethers.utils.getAddress(accounts[0]);
      console.log('\tUser detected: ' + address);
      setAddress(address);
    }
    console.log('\tChange in Address: ' + address);
  };

  /**
   * @dev Initiates and builds database+storage objects
   */
  const readBallotsFromChain = async () => {
    console.log('DataContext::readBallotsFromChain, Archive at: ' + archive);
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
        console.log(
          '\tReceived Ballots: ' +
            ballots +
            '\n\tLoading Time: ' +
            loadContractDuration +
            'ms\n'
        );

        /****************** Indexed DB ***********************/
        const loadIDBStart = performance.now();
        var writePromise = writeToAddressArchiveTable(ballots);

        const loadIDBDuration = performance.now() - loadIDBStart;
        console.log(
          'Wrote contract information to IDB.\n\tLoading Time: ' +
            loadIDBDuration +
            'ms\n'
        );
      } catch (err) {
        console.log(err);
      }
    }
    writeBallotsToIDB();
  };

  /**
   * Initiates the data storages for the IDB
   */
  function initiateIDBStorages() {
    var idbOpen = indexedDB.open('DevosDB', 1);
    idbOpen.onupgradeneeded = function () {
      var db = idbOpen.result;
      var store1 = db.createObjectStore('ballots', { keyPath: 'id' });
      store1.createIndex('address', ['address'], { unique: true });
      console.log('IDB::Updated Ballots-Store');
      var store2 = db.createObjectStore('ballotInfo', { keyPath: 'id' });
      store2.createIndex('address', ['address'], { unique: true });
      store2.createIndex('title', ['title'], { unique: false });
      console.log('IDB::Updated BallotInfo-Store');
      setiDB(true);
    };
  }

  /**
   * Writes information to the ballots-table, which holds the Smart contract addresses for each ballot
   * @param  {...any} records as addresses (Object!)
   * @returns Resolved promise or error
   */
  function writeToAddressArchiveTable(...records) {
    return new Promise(function (resolve, reject) {
      if (records === undefined)
        reject(Error("Attempted to Write 'undefined' to IDB"));
      var idbOpen = indexedDB.open('DevosDB', 1);
      idbOpen.onsuccess = function (event) {
        //var db = idbOpen.result;
        var db = event.target.result;
        var transaction = db.transaction('ballots', 'readwrite');
        var store = transaction.objectStore('ballots');
        for (var i = 0; i < records[0].length; i++) {
          var address = records[0][i];
          var objectStoreRequest = store.put({ id: i, address: address });
          console.log('IDB::Write Archive-Address', address);
        }
        resolve('IDB::Resolved ArchiveAddress data store');
        // TODO store.put could use improved onsuccess, but care of resolving promise too early
      };
    });
  }

  /**
   *
   * @returns addresses from the table containing all smart contract addresses
   */
  function readFromAddressArchiveTable() {
    return new Promise(function (resolve, reject) {
      var idbOpen = indexedDB.open('DevosDB', 1);
      idbOpen.onsuccess = function (event) {
        //var db = idbOpen.result;
        var db = event.target.result;
        var transaction = db.transaction('ballots', 'readonly');
        var store = transaction.objectStore('ballots');
        var ballotRequest = store.getAll();
        ballotRequest.onsuccess = function (event) {
          if (ballotRequest.result) {
            console.log('IDB::Read Archive-Addresses', ballotRequest.result);
            resolve(ballotRequest.result);
          } else reject(Error('No Objects received'));
        };
      };
    });
  }

  /**
   * Writes smart contract metainformation to ballotInfo
   * @param  {...any} records as previously fetched smart contract information (@see W3Context.migrateBallotData)
   * @returns
   */
  function writeToContractTable(...records) {
    return new Promise(function (resolve, reject) {
      var idbOpen = indexedDB.open('DevosDB', 1);
      idbOpen.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction('ballotInfo', 'readwrite');
        var store = tx.objectStore('ballotInfo');
        var record = Object.assign({
          id: records[0], // ID to store as
          //archiveAddress: records[1],   // ArchiveAddress
          creator: records[2], // Creator
          address: records[3], // BallotAddress
          title: records[4], // Title
          metaInfo: records[5], // Metainfo
          startTime: records[6], // startTime
          endTime: records[7], // endTime
          totalVotes: records[8], // totalVotes
          proVotes: records[9], // proVotes
        });
        var recordWriteRequest = store.put(record);
        recordWriteRequest.onsuccess = function (event) {
          console.log('IDB::Write Contract-Data', event.target.result);
          resolve(recordWriteRequest);
        };
      };
    });
  }

  // TODO Refactor this clusterfuck
  /**
   * @dev Migrates Ballot-Information from BC to IDB
   */
  const writeBallotsToIDB = async () => {
    console.log('Migrating blockchain ballot data to local storage');
    var ballotAddr = readFromAddressArchiveTable().then(async (result) => {
      console.log('Result', result);
      for (var i = 0; i < result.length; i++) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          result[i].address,
          ballotOpen.abi,
          provider
        );

        const fullBallotInformation = await contract.getFullBallotInformation();
        console.log('Received Data from Chain: ' + fullBallotInformation);
        var writePromise = writeToContractTable(
          i, // ID to store as
          fullBallotInformation[0], // ArchiveAddress
          fullBallotInformation[1], // Creator
          fullBallotInformation[2], // BallotAddress
          fullBallotInformation[3], // Title
          fullBallotInformation[4], // Metainfo
          new Date(fullBallotInformation[5] * 1000).toLocaleString(), // startTime
          new Date(fullBallotInformation[6] * 1000).toLocaleString(), // endTime
          '' + fullBallotInformation[7], // totalVotes
          '' + fullBallotInformation[8] // proVotes
        ).then((result) => {
          // TODO do something?
        });
      }
    });
  };

  const readBallotsfromIDB = () => {
    readFromContractTable().then((dataSets) => {
      setIDBContractCache(dataSets);
    });
  };

  /**
   * @returns data of the smart contracts from the table containing all smart contract information
   */
  function readFromContractTable() {
    return new Promise(function (resolve, reject) {
      var idbOpen = indexedDB.open('DevosDB', 1);
      idbOpen.onsuccess = function (event) {
        //var db = idbOpen.result;
        var db = event.target.result;
        var transaction = db.transaction('ballotInfo', 'readonly');
        var store = transaction.objectStore('ballotInfo');
        var ballotRequest = store.getAll();
        ballotRequest.onsuccess = function (event) {
          if (ballotRequest.result) {
            console.log('IDB::Read Contract-Data', ballotRequest.result);
            resolve(ballotRequest.result);
          } else reject(Error('No Objects received'));
        };
      };
    });
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
        const contract = await scFactory.deploy(
          archive,
          title,
          metainfo,
          BigNumber.from(votingDays)
        );
        console.log('\tDeployed to Address: ' + contract.address);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const voteYes = async (id) => {
    console.log('\tCalling Yes on Ballot #' + id);
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
  };

  const voteNo = async (id) => {
    console.log('\tCalling No on Ballot #' + id);

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
  };

  return (
    <DataContext.Provider
      value={{
        address,
        idbContractCache,
        connect,
        voteYes,
        voteNo,
        deployBallotToChain,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
