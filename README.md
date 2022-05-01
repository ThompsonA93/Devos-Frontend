# DevoClient

| Environment| Version|
|-|-|
Operating System    | Ubuntu 20.04.4 LTS
Node                | v16.14.2


| Packages | Version |
|-|-|
bulma | ^0.9.3,
next | 12.1.5,
react | 18.0.0,
react-dom | 18.0.0,
solc | ^0.8.13,
web3 | ^1.7.3

## Installation

Run the following command for local project setup.
```sh
cd devoclient
npm install
```
### Solc Compilations
The Project supports on-site compilation of smart contracts. Put smart contracts into /w3/contracts, then run
```sh
npm run solcompile
```

### Metamask
The frontend connection to the blockchain system is handled by MetaMask.
> https://metamask.io/


## Execution
Run the following command and then visit the shown address via browser.
```sh
cd devoclient
npm run dev
```