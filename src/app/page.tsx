// src/app/page.tsx
"use client";

import { useState } from 'react';

export default function Home() {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore(score + 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Simple Click Game</h1>
      <p>Your Score: {score}</p>
      <button onClick={handleClick} style={{ padding: '10px', fontSize: '18px' }}>
        Click Me!
      </button>
    </div>
  );
}
