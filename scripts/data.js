const WC = {
  name: 'RuffCash',
  ticker: 'RUFF',
  pair: 'RUFF / ETH',
  chainId: 4663,
  minDepositEth: 0.0104,
  ca: null,
  pound: null,
  launchpad: 'https://letscash.fun',
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
  { name: 'Mudpaw', kennel: '0x38c5e9147bd0a26f83e15c74ba09d6127ff4e850' }
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
