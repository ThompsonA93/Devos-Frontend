import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';

export const DataContext = createContext();

const DataContextProvider = (props) => {
  const [address, setAddress] = useState('');

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

  return (
    <DataContext.Provider value={{ address, connect }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
