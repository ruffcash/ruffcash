/* RuffCash — EIP-6963 + KennelFactory.open / Kennel.withdrawAll */

const RH_CHAIN_ID = 4663;
const RH_CHAIN_HEX = "0x" + RH_CHAIN_ID.toString(16);
const RH_CHAIN = {
  chainId: RH_CHAIN_HEX,
  chainName: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://rpc.mainnet.chain.robinhood.com"],
  blockExplorerUrls: ["https://robinhoodchain.blockscout.com"],
};

const FACTORY = "0xA87D37Ef625Acdc3eC6D8A9cFc376305D8C47232";
const MIN_WEI = 10400000000000000n;
const SEL_OPEN = "0xe4dcb06b";
const SEL_WITHDRAW_ALL = "0x853828b6";

let provider = null;
let account = null;

function shortAddr(a) {
  return a ? a.slice(0, 6) + "…" + a.slice(-4) : "";
}

function setStatus(msg) {
  const modal = document.getElementById("wallet-status");
  if (modal) modal.textContent = msg;
}

function paintAuth() {
  const corner = document.getElementById("auth-status");
  const last = localStorage.getItem("wc.kennel");
  if (account) {
    if (corner) corner.textContent = shortAddr(account) + " · 4663";
    setStatus(
      "Connected " + shortAddr(account) +
      (last ? " · kennel " + shortAddr(last) : " · factory ready")
    );
  } else {
    if (corner) corner.textContent = "not connected";
    setStatus("Wallet idle.");
  }
  const hint = document.getElementById("kennel-last");
  if (hint) hint.textContent = last ? "Last kennel: " + last : "";
}

function pickProvider() {
  return new Promise((resolve) => {
    const found = [];
    function onAnnounce(e) {
      if (e.detail && e.detail.provider) found.push(e.detail.provider);
    }
    window.addEventListener("eip6963:announceProvider", onAnnounce);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    setTimeout(() => {
      window.removeEventListener("eip6963:announceProvider", onAnnounce);
      resolve(found[0] || window.ethereum || null);
    }, 80);
  });
}

async function ensureChain(p) {
  try {
    await p.request({ method: "wallet_switchEthereumChain", params: [{ chainId: RH_CHAIN_HEX }] });
  } catch (err) {
    const code = err && err.code;
    if (code === 4902 || /unrecognized chain|not added/i.test(String(err && err.message))) {
      await p.request({ method: "wallet_addEthereumChain", params: [RH_CHAIN] });
    } else if (code === 4001) {
      throw new Error("cancelled");
    } else {
      throw err;
    }
  }
}

function parseEth(s) {
  const t = String(s || "").trim();
  if (!t) return 0n;
  const [a, b = ""] = t.split(".");
  if (!/^\d+$/.test(a) || (b && !/^\d+$/.test(b))) throw new Error("bad amount");
  return BigInt(a + (b + "000000000000000000").slice(0, 18));
}

function pad32(hex) {
  return hex.replace(/^0x/, "").padStart(64, "0");
}

function encodeOpen(name) {
  const bytes = new TextEncoder().encode(name);
  let data = "";
  for (const n of bytes) data += n.toString(16).padStart(2, "0");
  const padded = data.padEnd(Math.ceil(data.length / 64) * 64, "0");
  return (
    SEL_OPEN +
    pad32("20") +
    pad32(bytes.length.toString(16)) +
    padded
  );
}

async function openKennel() {
  if (!provider || !account) {
    setStatus("Connect first.");
    return;
  }
  const name = (document.getElementById("fund-name") || {}).value || "Hound";
  let wei;
  try {
    wei = parseEth((document.getElementById("fund-eth") || {}).value || "0.0104");
  } catch (e) {
    setStatus("Amount must look like 0.0104");
    return;
  }
  if (wei < MIN_WEI) {
    setStatus("Minimum is 0.0104 ETH.");
    return;
  }
  setStatus("Confirm open in wallet…");
  try {
    await ensureChain(provider);
    const hash = await provider.request({
      method: "eth_sendTransaction",
      params: [{
        from: account,
        to: FACTORY,
        value: "0x" + wei.toString(16),
        data: encodeOpen(name.trim() || "Hound"),
      }],
    });
    setStatus("Sent " + shortAddr(hash) + " — waiting…");
    let receipt = null;
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      receipt = await provider.request({ method: "eth_getTransactionReceipt", params: [hash] });
      if (receipt) break;
    }
    if (!receipt) {
      setStatus("Pending " + hash);
      return;
    }
    if (receipt.status === "0x0") {
      setStatus("Reverted. Check value >= 0.0104 on 4663.");
      return;
    }
    const kennel = receipt.logs && receipt.logs[0] && receipt.logs[0].address;
    if (kennel) localStorage.setItem("wc.kennel", kennel);
    setStatus("Kennel open " + shortAddr(kennel || hash));
    paintAuth();
  } catch (err) {
    setStatus((err && err.message) || "open failed");
  }
}

async function withdrawAll() {
  if (!provider || !account) {
    setStatus("Connect first.");
    return;
  }
  const kennel = (document.getElementById("fund-kennel") || {}).value || localStorage.getItem("wc.kennel");
  if (!kennel || !/^0x[0-9a-fA-F]{40}$/.test(kennel)) {
    setStatus("No kennel address yet. Open one first.");
    return;
  }
  setStatus("Confirm withdrawAll…");
  try {
    await ensureChain(provider);
    const hash = await provider.request({
      method: "eth_sendTransaction",
      params: [{ from: account, to: kennel, data: SEL_WITHDRAW_ALL }],
    });
    setStatus("Withdraw sent " + shortAddr(hash));
  } catch (err) {
    setStatus((err && err.message) || "withdraw failed");
  }
}

async function connectWallet() {
  const p = await pickProvider();
  if (!p) {
    setStatus("No injected wallet. Install Rabby or MetaMask.");
    return;
  }
  provider = p;
  try {
    const accs = await p.request({ method: "eth_requestAccounts" });
    account = Array.isArray(accs) && accs[0] ? String(accs[0]) : null;
    await ensureChain(p);
    if (account) localStorage.setItem("wc.account", account);
    paintAuth();
  } catch (err) {
    setStatus((err && err.message) || "connect failed");
  }
}

async function bootWallet() {
  paintAuth();
  const saved = localStorage.getItem("wc.account");
  const p = await pickProvider();
  if (p) {
    provider = p;
    try {
      const accs = await p.request({ method: "eth_accounts" });
      if (accs && accs[0]) {
        account = String(accs[0]);
        paintAuth();
      } else if (saved) {
        localStorage.removeItem("wc.account");
      }
    } catch (_) {}
  }
  const connect = document.getElementById("btn-connect");
  if (connect) connect.addEventListener("click", connectWallet);
  const openBtn = document.getElementById("btn-open");
  if (openBtn) openBtn.addEventListener("click", openKennel);
  const wBtn = document.getElementById("btn-withdraw");
  if (wBtn) wBtn.addEventListener("click", withdrawAll);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootWallet);
} else {
  bootWallet();
}
