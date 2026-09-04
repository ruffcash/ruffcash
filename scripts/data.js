const WC = {
  name: 'RuffCash',
  ticker: 'RUFF',
  pair: 'RUFF / ETH',
  chainId: 4663,
  minDepositEth: 0.0104,
  ca: '0x0ac7a624d7b9ece67edb2d7b2cafd2065a5318cc',
  pound: null,
  launchpad: 'https://letscash.fun',
  pairUrl: 'https://letscash.fun/token/0x0ac7a624d7b9ece67edb2d7b2cafd2065a5318cc',
  site: 'https://ruffcash.xyz',
  x: 'https://x.com/ruffcashXYZ',
  telegram: 'https://t.me/ruffcashXYZ'
};

const PACKS = [
  { name: 'Bowl Club', tag: 'BWL', color: '#f0b03c' },
  { name: 'Stick Dogs', tag: 'STK', color: '#78c47f' },
  { name: 'Night Shift', tag: 'NGT', color: '#5ec8e8' },
  { name: 'No Leash', tag: 'NLS', color: '#e0705f' }
];
const SEED_HOUNDS = [
  { name: 'Stickthief', kennel: '0x4c81a7f2d6e9b03c5a17fe28d4b96017cc3a1e55' },
  { name: 'Bowlbroker', kennel: '0x9e2d5b71c0af38e64d2b19f7a5c80e33bb47d612' },
  { name: 'Sir Ruff', kennel: '0x71fa30c8b96e2d54f0a7c1b3e85d629a4f0cd738' },
  { name: 'unemployed corgi', kennel: '0x2b7c94e15d3a80f6b2e47c09a1d5638fe0b2ac41' },
  { name: 'Loafhound', kennel: '0xd35e08a4172cb9f6e5308d1ba74c2f9016e5b7cd' },
  { name: 'kibble maxi', kennel: '0x6a1f83d0e7c25b49af360d178e2c4b95170fa3e2' },
  { name: 'Doorbell', kennel: '0xb04d76e39a1c58f2760ba3e14d97c5028fe61b3a' },
  { name: 'Mudpaw', kennel: '0x38c5e9147bd0a26f83e15c74ba09d6127ff4e850' },
  { name: 'Gravy', kennel: '0x8fb35d0176ae94c2e13b60df58a7c94021e6d3ba' },
  { name: 'Chewmaster', kennel: '0x5d90cf3a186e47b2d05fa19c637e824b0a3d61fe' },
  { name: 'quietwoof', kennel: '0xa62e470bd9153c8f41d70e26ba85c1937df04e2b' },
  { name: 'FETCHOOOR', kennel: '0x0c48f1e26a7b95d3086c2fa41e7d5b39604ac81f' },
  { name: 'Postman Hater', kennel: '0x2e7940b13cf6a85d0be2174c39f5a0186dd4bc73' },
  { name: 'Three Legs', kennel: '0xc51ae802d6f39b47105e83ca27bd964f0e18a35c' },
  { name: 'Yard Sale', kennel: '0x74d0b3e91a52f8c6407de2b195ca3f6802ce7d14' },
  { name: 'Biscuit Fund', kennel: '0x1af6c204e8b73d95026fa1c58e347b90d5e2ac6f' },
  { name: 'Snoutlaw', kennel: '0xe803a5c17b294df6015ce8a37b2d40196fc5b78e' },
  { name: 'Longcoat', kennel: '0x59c1e64ab328df05e94b17c6a2f8301de4b90a11' },
  { name: 'Tennis Ball ETF', kennel: '0x3d7e0a92c4f186b5027ad3e619c58f740b1e2ca6' },
  { name: 'Zoomies', kennel: '0xb9420ecd1a763f85026b4d09e7c31a58f0d6e4b7' },
  { name: 'Old Man Rex', kennel: '0x06f5b3ea92d17c4805e6a13bd7c920f4e18ca35d' },
  { name: 'wet nose', kennel: '0x4e8c20b7d5a91f36074ce2ab18d95f3620ae7c1b' },
  { name: 'Fencejumper', kennel: '0xa17d40e9c2b586f3015d7ea49b3c860f27d1e5b4' },
  { name: 'Paw Ledger', kennel: '0x7c05e1ba63d29f4870ae15c3d6b91f0248ea3b7d' },
  { name: 'Sausage', kennel: '0x0e93f5c827a614db205c7e19b3a48f6710dc2e95' },
  { name: 'Hydrant King', kennel: '0x86a1d70b493ce25f014ad6b28f7c93150e2b4da8' },
  { name: 'silent shepherd', kennel: '0x3f5ce9a20d84b716059e2c3fa17d640b8ec19d73' },
  { name: 'Good Boy Capital', kennel: '0xc70e2bd419a63f85024cd1e7b09a5f3168d4ba2e' },
  { name: 'Ruff Draft', kennel: '0x11a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4' },
  { name: 'Bowl Empty', kennel: '0x22b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5' },
  { name: 'Stick Tax', kennel: '0x33c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6' },
  { name: 'Barklay', kennel: '0x44d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f7' },
  { name: 'Leashless', kennel: '0x55e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708' },
  { name: 'Kibble OTC', kennel: '0x66f708192a3b4c5d6e7f8091a2b3c4d5e6f70819' },
  { name: 'Sofa Claim', kennel: '0x7708192a3b4c5d6e7f8091a2b3c4d5e6f708192a' },
  { name: 'Tail Risk', kennel: '0x88192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b' }
];
const LINES = {
  open: ['Stick on the table. You move first.'],
  counter: ['Decay is shared. I am not folding at a full stick.'],
  press: ['The stick is rotting. Fold or we both walk empty.'],
  close_deal: ['Fine. I fold. Take the stick.'],
  close_nodeal: ['No. The stick burns.']
};
if (typeof window !== 'undefined') {
  window.WC = WC;
  window.PACKS = PACKS;
  window.SEED_HOUNDS = SEED_HOUNDS;
  window.LINES = LINES;
}
