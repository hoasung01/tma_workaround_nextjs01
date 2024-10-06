// src/global.d.ts
interface EthereumProvider {
  request: (args: { method: string }) => Promise<any>;
  isMetaMask?: boolean;
  on?: (event: string, handler: (...args: any[]) => void) => void;
}

interface Window {
  ethereum?: EthereumProvider;
}
