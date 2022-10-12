import React, { createContext, useState } from 'react';

export const W3Context = createContext();

const W3ContextProvider = (props) => {
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
    <W3Context.Provider value={{ address, connect }}>
      {props.children}
    </W3Context.Provider>
  );
};

export default W3ContextProvider;
