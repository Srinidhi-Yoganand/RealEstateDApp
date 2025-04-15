import React from 'react';
import { ethers } from 'ethers';
import logo from '../assets/logo.svg';

const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts.length > 0) {
            const account = accounts[0]; 
            setAccount(account);
          }
        } else {
          console.error('MetaMask is not installed.');
          alert('MetaMask is not installed.');
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    }

  return (
    <nav className="nav">
      <ul className="nav__links">
        <li><a href="#">Buy</a></li>
        <li><a href="#">Rent</a></li>
        <li><a href="#">Sell</a></li>
      </ul>

      <div className="nav__brand">
        <img src={logo} alt="Logo" />
        <h1>Millow</h1>
      </div>

      <div className="nav__connect">
        {account ? (
          <button type="button" disabled>
            {account.slice(0, 6) + '...' + account.slice(-4)}
          </button>
        ) : (
          <button type="button" onClick={connectHandler}>
            Connect
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
