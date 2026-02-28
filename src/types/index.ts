export interface Subscription {
  subscriber: string;
  tier: 'basic' | 'premium' | 'enterprise';
  startDate: number;
  endDate: number;
  active: boolean;
  autoRenew: boolean;
}

export interface Tier {
  name: string;
  price: number;
  duration: number;
  features: string[];
}

export interface SubscriptionStats {
  totalSubscribers: number;
  activeSubscriptions: number;
  revenue: number;
  churnRate: number;
}

export interface WalletState {
  address: string | null;
  connected: boolean;
  balance: number;
}

export interface TransactionResult {
  txId: string;
  success: boolean;
  error?: string;
}
