function createContract() {
  var contract = new web3.eth.Contract(abi, address);
  var batch = new web3.BatchRequest();
  batch.add(web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
  batch.add(contract.methods.balance(address).call.request({ from: '0x0000000000000000000000000000000000000000' }, callback2));
  batch.execute();
}

function compileContract(){
  
}