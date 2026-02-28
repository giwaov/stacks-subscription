"use client";
import { useState, useEffect } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { openContractCall } from "@stacks/connect";
import { PostConditionMode } from "@stacks/transactions";
import { STACKS_MAINNET } from "@stacks/network";

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });
const CONTRACT_ADDRESS = "SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY";
const CONTRACT_NAME = "subscription";

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setAddress(userSession.loadUserData().profile.stxAddress.mainnet);
    }
  }, []);

  const connect = () => {
    showConnect({
      appDetails: { name: "Stacks Subscription", icon: "/icon.png" },
      onFinish: () => setAddress(userSession.loadUserData().profile.stxAddress.mainnet),
      userSession,
    });
  };

  const subscribe = async (tier: string) => {
    const functionName = `subscribe-${tier}`;
    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName,
      functionArgs: [],
      network: STACKS_MAINNET,
      postConditionMode: PostConditionMode.Allow,
      onFinish: (data) => alert(`Subscribed to ${tier}! TX: ${data.txId}`),
    });
  };

  return (
    <main style={{ padding: 40, fontFamily: "system-ui", maxWidth: 700, margin: "0 auto" }}>
      <h1>📦 Stacks Subscription</h1>
      <p>Subscription-based access on Stacks Mainnet</p>

      {!address ? (
        <button onClick={connect} style={{ padding: "12px 24px", fontSize: 16, cursor: "pointer" }}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected: {address.slice(0, 8)}...{address.slice(-4)}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 30 }}>
            <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8, textAlign: "center" }}>
              <h3>Basic</h3>
              <p style={{ fontSize: 24, fontWeight: "bold" }}>0.1 STX</p>
              <p>30 days access</p>
              <ul style={{ textAlign: "left", padding: "0 20px" }}>
                <li>Feature A</li>
                <li>Feature B</li>
              </ul>
              <button onClick={() => subscribe("basic")} style={{ padding: "10px 20px", marginTop: 10 }}>Subscribe</button>
            </div>

            <div style={{ padding: 20, border: "2px solid #4CAF50", borderRadius: 8, textAlign: "center", background: "#f9fff9" }}>
              <h3>Pro ⭐</h3>
              <p style={{ fontSize: 24, fontWeight: "bold" }}>0.5 STX</p>
              <p>30 days access</p>
              <ul style={{ textAlign: "left", padding: "0 20px" }}>
                <li>All Basic features</li>
                <li>Feature C</li>
                <li>Priority support</li>
              </ul>
              <button onClick={() => subscribe("pro")} style={{ padding: "10px 20px", marginTop: 10, background: "#4CAF50", color: "white", border: "none" }}>Subscribe</button>
            </div>

            <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8, textAlign: "center" }}>
              <h3>Premium</h3>
              <p style={{ fontSize: 24, fontWeight: "bold" }}>1 STX</p>
              <p>30 days access</p>
              <ul style={{ textAlign: "left", padding: "0 20px" }}>
                <li>All Pro features</li>
                <li>Feature D</li>
                <li>1-on-1 support</li>
              </ul>
              <button onClick={() => subscribe("premium")} style={{ padding: "10px 20px", marginTop: 10 }}>Subscribe</button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ marginTop: 40, color: "#666", fontSize: 14 }}>
        <p>Contract: {CONTRACT_ADDRESS}.{CONTRACT_NAME}</p>
        <p>Built with @stacks/connect and @stacks/transactions</p>
      </footer>
    </main>
  );
}
