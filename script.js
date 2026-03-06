// Mobile menu
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
if (burger) {
  burger.addEventListener("click", () => nav.classList.toggle("open"));
}

// Slider
const slides = Array.from(document.querySelectorAll(".slide"));
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const dotsWrap = document.getElementById("dots");

let index = 0;
let timer = null;

function renderDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dotbtn" + (i === index ? " active" : "");
    b.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(b);
  });
}

function show(i) {
  slides.forEach((s) => s.classList.remove("active"));
  slides[i].classList.add("active");
  renderDots();
}

function goTo(i, userAction=false) {
  index = (i + slides.length) % slides.length;
  show(index);
  if (userAction) restartAuto();
}

function restartAuto() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => goTo(index + 1), 6000);
}

if (prev) prev.addEventListener("click", () => goTo(index - 1, true));
if (next) next.addEventListener("click", () => goTo(index + 1, true));

renderDots();
show(index);
restartAuto();

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Simple mailto form (no backend needed)
function openMail(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = fd.get("name") || "";
  const company = fd.get("company") || "";
  const email = fd.get("email") || "";
  const message = fd.get("message") || "";

  const subject = encodeURIComponent("Harvester Pride - Quote Request");
  const body = encodeURIComponent(
`Name: ${name}
Company: ${company}
Email: ${email}

Message:
${message}
`);
  window.location.href = `mailto:info@harvesterpride.com?subject=${subject}&body=${body}`;
  return false;
}
// window.openMail = openMail;