// src/global.d.ts

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  isMetaMask?: boolean;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
}

interface Window {
  ethereum?: EthereumProvider;
}
