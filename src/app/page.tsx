"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './globals.css'; // Assuming this file contains global CSS styles

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tokens, setTokens] = useState<number>(0);
  const [nfts, setNfts] = useState<string[]>([]);
  const [stakedTokens, setStakedTokens] = useState<number>(0);
  const [rewards, setRewards] = useState<number>(0);
  const [marketplace, setMarketplace] = useState<{ name: string; price: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Function to connect the wallet
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Use MetaMask's provider if available
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } else {
        // Use Alchemy provider if MetaMask is not available
        const alchemyProvider = new ethers.JsonRpcProvider(
          process.env.ALCHEMY_API_KEY
        );

        // For example, get the latest block number from the Alchemy provider
        const latestBlockNumber = await alchemyProvider.getBlockNumber();
        console.log('Latest block number:', latestBlockNumber);

        // Since there's no user-provided wallet in this case, you can create a random wallet
        const wallet = ethers.Wallet.createRandom();
        setWalletAddress(wallet.address); // Set the random wallet address
        setError(null);
      }
    } catch (err) {
      console.error('Error connecting to the wallet:', err);
      setError('Could not connect to wallet.');
    }
  };

  const mineTokens = () => {
    const newTokens = Math.floor(Math.random() * 10) + 1; // Generate random tokens between 1 and 10
    setTokens(tokens + newTokens);
  };

  const discoverNFT = () => {
    const nftNames = ['Golden Axe', 'Cryptic Artifact', 'Mystic Shield'];
    const discoveredNft = nftNames[Math.floor(Math.random() * nftNames.length)];
    setNfts([...nfts, discoveredNft]);
  };

  const mineTokensWithNFT = () => {
    mineTokens(); // Existing token mining function
    if (Math.random() > 0.8) { // 20% chance to discover an NFT
      discoverNFT();
    }
  };

  const battlePlayer = () => {
    const playerWin = Math.random() > 0.5; // 50% chance to win
    if (playerWin && tokens >= 10) {
      setTokens(tokens + 10); // Gain 10 tokens from the opponent
      alert('You won the battle and stole 10 tokens!');
    } else if (!playerWin && tokens >= 10) {
      setTokens(tokens - 10); // Lose 10 tokens to the opponent
      alert('You lost the battle and lost 10 tokens!');
    } else {
      alert('Not enough tokens to battle!');
    }
  };

  const stakeTokens = (amount: number) => {
    if (tokens >= amount) {
      setTokens(tokens - amount);
      setStakedTokens(stakedTokens + amount);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRewards(stakedTokens * 0.01); // 1% rewards per time interval
    }, 5000); // Every 5 seconds, calculate rewards
    return () => clearInterval(interval);
  }, [stakedTokens]);

  const listNFTForSale = (nft: string, price: number) => {
    setMarketplace([...marketplace, { name: nft, price }]);
  };

  const buyNFT = (nft: { name: string; price: number }) => {
    if (tokens >= nft.price) {
      setTokens(tokens - nft.price);
      setNfts([...nfts, nft.name]);
      setMarketplace(marketplace.filter(item => item.name !== nft.name));
    }
  };

  const withdrawTokens = async () => {
    // Placeholder for token withdrawal logic using ethers.js and a smart contract
    alert('Withdraw tokens functionality will be implemented here.');
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Planet CryptoQuest</h1>
      {walletAddress ? (
        <>
          <div className="status-panel">
            <p>🌍 Welcome, explorer: <strong>{walletAddress}</strong></p>
            <p>💰 Your Tokens: <strong>{tokens}</strong></p>
            <p>🛠️ Your NFTs: {nfts.length > 0 ? nfts.join(', ') : 'None'}</p>
            <p>📈 Staked Tokens: <strong>{stakedTokens}</strong></p>
            <p>🎁 Earned Rewards: <strong>{rewards}</strong></p>
          </div>

          <div className="actions">
            <button onClick={mineTokensWithNFT} className="btn primary">
              🚀 Mine Tokens and Discover NFT
            </button>
            <button onClick={battlePlayer} className="btn danger">
              ⚔️ Battle Another Player
            </button>
            <button onClick={() => stakeTokens(10)} className="btn secondary">
              💎 Stake 10 Tokens
            </button>
            <button onClick={withdrawTokens} className="btn primary">
              🏦 Withdraw Tokens to Wallet
            </button>
          </div>

          <div className="marketplace">
            <h2>🏪 NFT Marketplace</h2>
            {marketplace.length > 0 ? marketplace.map((item) => (
              <div key={item.name} className="market-item">
                <p>{item.name} - {item.price} Tokens</p>
                <button onClick={() => buyNFT(item)} className="btn buy">Buy</button>
              </div>
            )) : <p>No NFTs listed for sale</p>}
            <button onClick={() => listNFTForSale('Mystic Shield', 50)} className="btn secondary">
              🛡️ List Mystic Shield for 50 Tokens
            </button>
          </div>
        </>
      ) : (
        <>
          <button onClick={connectWallet} className="btn connect-wallet">
            🔗 Connect Web3 Wallet
          </button>
          {error && <p className="error-message">{error}</p>}
        </>
      )}
    </div>
  );
}
