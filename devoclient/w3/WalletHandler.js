import { useState } from "react";
import Web3 from 'web3'

const connectWalletHandler = async () => {

    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
            console.log("connectWalletHandler::Accessing Web3");
            await window.ethereum.request({ method: "eth_requestAccounts" });            
            
            web3 = new Web3(window.ethereum);
            setWeb3(web3);
            console.log("Web3 Instance: " + web3);
            // Get list of accounts
            
            const account = await web3.eth.getAccounts();
            setAddress(account[0]);
            console.log("Account: " + address);

        } catch (err) {
            console.log(err);
        }
    }
}

export default connectWalletHandler