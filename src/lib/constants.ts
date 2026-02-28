export const CONTRACT_ADDRESS = "SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY";

export const CONTRACTS = {
  SUBSCRIPTION: { address: CONTRACT_ADDRESS, name: "subscription" },
} as const;

export const EXPLORER_URL = "https://explorer.hiro.so";

export function getContractUrl(contractName: string) {
  return `${EXPLORER_URL}/txid/${CONTRACT_ADDRESS}.${contractName}?chain=mainnet`;
}

export function getTxUrl(txId: string) {
  return `${EXPLORER_URL}/txid/${txId}?chain=mainnet`;
}

export function formatSTX(microSTX: number): string {
  return (microSTX / 1_000_000).toFixed(6) + " STX";
}

export function parseSTX(stx: number): number {
  return stx * 1_000_000;
}

export const TIERS = {
  BASIC: { price: 1000000, duration: 30 }, // 1 STX for 30 days
  PREMIUM: { price: 5000000, duration: 30 }, // 5 STX for 30 days
  ENTERPRISE: { price: 20000000, duration: 30 }, // 20 STX for 30 days
} as const;
