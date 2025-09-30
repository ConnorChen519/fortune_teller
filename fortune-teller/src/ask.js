const q = document.getElementById("q");
const btn = document.getElementById("askBtn");
const reply = document.getElementById("reply");
const icon = document.getElementById("answerIcon");

const answers = [
  { text: "Yes.", mood: "yes" },
  { text: "No.", mood: "no" },
  { text: "Maybe.", mood: "maybe" },
  { text: "If the spirits permit.", mood: "maybe" }
];

const moodColor = {
  yes:   "#006400",   // green
  no:    "#8b0000",   // red
  maybe: "#444444"    // grey
};

function pick() {
  return answers[Math.floor(Math.random() * answers.length)];
}

function answer() {
    const a = pick();
    reply.textContent = a.text;
    reply.style.background = '#fbf6cf'
    reply.style.color = 'black'

//   icon.style.background = moodColor[a.mood];
}

btn.addEventListener("click", answer);
btn.style.width = '15%'
q.addEventListener("keydown", (e) => { if (e.key === "Enter") answer(); });
