import { callReadOnlyFunction, cvToValue, standardPrincipalCV } from "@stacks/transactions";
import { STACKS_MAINNET } from "@stacks/network";

const CONTRACT_ADDRESS = "SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY";
const CONTRACT_NAME = "subscription";

export async function getSubscription(user: string) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-subscription",
    functionArgs: [standardPrincipalCV(user)],
    network: STACKS_MAINNET,
    senderAddress: CONTRACT_ADDRESS,
  });
  return cvToValue(result);
}

export async function isActive(user: string): Promise<boolean> {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "is-active",
    functionArgs: [standardPrincipalCV(user)],
    network: STACKS_MAINNET,
    senderAddress: CONTRACT_ADDRESS,
  });
  return cvToValue(result);
}

export async function getTier(user: string): Promise<string | null> {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-tier",
    functionArgs: [standardPrincipalCV(user)],
    network: STACKS_MAINNET,
    senderAddress: CONTRACT_ADDRESS,
  });
  return cvToValue(result);
}

export type SubscriptionTier = "basic" | "pro" | "premium";

export interface Subscription {
  tier: SubscriptionTier;
  expiresAt: number;
  amountPaid: number;
}
