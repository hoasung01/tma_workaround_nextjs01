"use client";

import { useState } from 'react';
import './globals.css'; // Assuming this file contains global CSS styles

export default function Home() {
    const [tokens, setTokens] = useState<number>(0);

    // Function to mint tokens
    const mineTokens = () => {
        const newTokens = Math.floor(Math.random() * 10) + 1; // Generate random tokens between 1 and 10
        setTokens(tokens + newTokens);
    };

    return (
        <div className="game-container">
            <h1 className="game-title">Planet CryptoQuest</h1>

            <div className="status-panel">
                <p>💰 Your Tokens: <strong>{tokens}</strong></p>
            </div>

            <div className="actions">
                <button onClick={mineTokens} className="btn primary">
                    🚀 Mine Tokens
                </button>
            </div>

            {/* Bottom Fixed Menu */}
            <div className="bottom-menu">
                <button className="menu-item">🏠 Home</button>
                <button className="menu-item">🏆 Leaderboard</button>
                <button className="menu-item">👥 Friends</button>
            </div>
        </div>
    );
}
