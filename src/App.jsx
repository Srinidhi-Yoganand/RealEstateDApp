import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import Navigation from './components/Navigation.jsx';
import Search from './components/Search.jsx';
import Home from './components/Home.jsx';

import RealEstate from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'

import config from './config.json';

function App() {

  const [account, setAccount] = useState(null)

  const loadBlockchainData = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    // console.log(provider);
    console.log(accounts[0]);
    
    
  }
  useEffect(()=> {
    loadBlockchainData()
  },[])


  return (
    <>
      <div>
      <Navigation account={account} setAccount={setAccount} />
        Welcome to Millow...
      </div>
    </>
  )
}

export default App
