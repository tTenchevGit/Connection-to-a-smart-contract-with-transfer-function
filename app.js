const { ethers } = require("ethers");
const abi = require('./contractABI.json');
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    document.getElementById("connectButton").innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install MetaMask";
  }
}

async function execute() {
  if (typeof window.ethereum !== "undefined") {
    contractAddress = "0x18480F39254D1D282eE9796C97acd3C372930Fcb";
    // const abi = require('./contractABI.json');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      await contract.store(42);
    } catch (error) {
      console.log(error);
    }
  } else {
    document.getElementById("executeButton").innerHTML =
      "Please install MetaMask";
  }
}

async function transferTokens() {
  if (typeof window.ethereum !== "undefined") {
      const address = document.getElementById('address').value;
      const amount = document.getElementById('amount').value;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      console.log(`Attempting to transfer ${amount} to ${address}`);

      try {
          const transactionResponse = await contract.transfer(address, ethers.utils.parseUnits(amount, "ether"));
          await transactionResponse.wait();
          console.log('Transfer successful!');
          alert('Transfer successful!');
      } catch (error) {
          console.error('Transfer Error:', error);
          alert('Transfer failed. Check console for details.');
      }
  } else {
      alert('MetaMask is not available.');
      console.log('MetaMask is not available.');
  }
}

module.exports = {
  connect,
  execute,
};

