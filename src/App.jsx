import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import Navigation from './components/Navigation.jsx';
import Search from './components/Search.jsx';
import Home from './components/Home.jsx';

import RealEstate from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'

import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null)
  const[escrow, setEscrow] = useState(null)
  const [homes, setHomes] = useState([])
  const [home, setHome] = useState({})
  const [account, setAccount] = useState(null)
  

  const loadBlockchainData = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum); 
        setProvider(provider);
        
        const network = await provider.getNetwork();
        const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider);
        const totalSupply = await realEstate.totalSupply();
        console.log(totalSupply.toString());
        
        const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider);
        setEscrow(escrow);
       
        const homes = []
        for (var i = 1; i <= totalSupply; i++) {
          const uri = await realEstate.tokenURI(i)
          const response = await fetch(uri)
          const metadata = await response.json()
          homes.push(metadata)
        }
        setHomes(homes)
        
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts.length > 0) {
            const account = accounts[0];
            setAccount(account);
          }
        });

        
        // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // if (accounts.length > 0) {
        //   const account = accounts[0];
        //   setAccount(account);
        // }
      } else {
        console.error('MetaMask is not installed. Please install it to use this app.');
        alert('MetaMask is not installed. Please install it to use this app.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  };

  useEffect(()=> {
    loadBlockchainData()
  },[])


  return (
    <>
      <div>
      <Navigation account={account} setAccount={setAccount} />
      <Search />
        <div className='cards__section'>
          <h3>Homes For You</h3>
          <hr />
          <div className='cards'>
            {homes.map((home,index) => (
              <div className='card' key={index}>
                <div className='card__image'>
                  <img src={home.image} alt="Home" />
                </div>
                <div className='card__info'>
                  <h4>{home.attributes[0].value} ETH</h4>
                  <p>
                    <strong>{home.attributes[2].value}</strong> bds |
                    <strong>{home.attributes[3].value}</strong> ba |
                    <strong>{home.attributes[4].value}</strong> sqft
                  </p>
                  <p>{home.address}</p>
                </div>
              </div>
            ))}
            
          </div>
        
        </div>
      </div>
    </>
  )
}

export default App
