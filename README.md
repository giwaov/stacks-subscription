# 📦 Stacks Subscription

Subscription-based membership service on Stacks blockchain.

## Features

- **3 Tiers**: Basic (0.1 STX), Pro (0.5 STX), Premium (1 STX)
- **Time-based Access**: 30-day subscription periods
- **On-chain Verification**: Check subscription status on-chain
- **Automatic Expiration**: Block-height based expiration

## Tech Stack

- **Smart Contract**: Clarity on Stacks
- **Frontend**: Next.js 14 + TypeScript
- **Wallet**: @stacks/connect
- **Transactions**: @stacks/transactions

## Deployed Contract

**Mainnet**: `SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY.subscription`

## Contract Functions

```clarity
(subscribe-basic)
(subscribe-pro)
(subscribe-premium)
(get-subscription (user principal))
(is-active (user principal))
(get-tier (user principal))
```

## Quick Start

```bash
npm install
npm run dev
```

## License

MIT
