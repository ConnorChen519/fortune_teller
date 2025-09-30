// "Sticky" daily fortune: same result for a given day; new day => new fortune.
const msgBuckets = {
  great: [
    "You're very lucky today! The spirits will bless you.",
    "Fantastic omens abound. Say yes to bold moves.",
    "Golden winds favor you. Fortune smiles broadly."
  ],
  good: [
    "Good energy surrounds you. Small risks will pay off.",
    "Bright prospects—share kindness and receive more.",
    "Clear paths ahead. Trust your preparation."
  ],
  meh: [
    "A middling day. Keep calm and carry on.",
    "Neutral tides—effort matters more than luck.",
    "Steady steps beat sudden leaps today."
  ],
  bad: [
    "Luck is shy—double-check plans and be patient.",
    "Stormy vibes—avoid impulsive choices.",
    "Caution urged. The spirits are grumpy."
  ],
  awful: [
    "Your fortune today is terrible! The spirits are extremely dissatisfied—be careful.",
    "Red flags everywhere—delay big decisions.",
    "Lie low; let the storm pass."
  ]
};

// Simple seeded RNG based on YYYY-MM-DD so fortune is consistent for the day
function dailySeed() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function mulberry32(a) {
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function hashToInt(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickFortune(r) {
  // map r in [0,1) to buckets (skew however you like)
  if (r < 0.10) return ["awful", randomFrom(msgBuckets.awful, r)];
  if (r < 0.30) return ["bad",   randomFrom(msgBuckets.bad, r)];
  if (r < 0.70) return ["meh",   randomFrom(msgBuckets.meh, r)];
  if (r < 0.90) return ["good",  randomFrom(msgBuckets.good, r)];
  return ["great", randomFrom(msgBuckets.great, r)];
}

function randomFrom(arr, r) {
  const i = Math.floor(r * 1e6) % arr.length;
  return arr[i];
}

const fortuneEl = document.getElementById("fortune");
const iconEl = document.getElementById("moodIcon");
const seedInfo = document.getElementById("seedInfo");
const rollBtn = document.getElementById("roll");

function renderFortune() {
  const seed = dailySeed();
  const rng = mulberry32(hashToInt(seed));
  const r = rng();
  const [bucket, text] = pickFortune(r);
  fortuneEl.textContent = text;
  seedInfo.textContent = `Daily seed: ${seed}`;
  // change the icon background shade by bucket
  const shades = { awful:"#8b0000", bad:"#b22222", meh:"#444", good:"#2e8b57", great:"#006400" };
  iconEl.style.background = shades[bucket];
}

rollBtn.addEventListener("click", renderFortune);

// auto-generate on load
renderFortune();
