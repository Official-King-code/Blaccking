
document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 100;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll("nav ul li a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").slice(1) === sec.id) {
          link.classList.add("active");
        }
      });
    }
  });
});
const toggleBtn = document.createElement('button');
toggleBtn.textContent = "Change Theme";
toggleBtn.className = "theme-toggle";
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});


const style = document.createElement('style');
style.textContent = `
  .light-mode {
    background-color: #f1f5f9;
    color: #0f172a;
  }
  .light-mode header { background: #e2e8f0; }
  .light-mode nav ul li a { color: #0f172a; }
  .light-mode button { background: #0f172a; color: #f1f5f9; }
`;
document.head.appendChild(style);


document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.querySelector(".my-name");
  if (nameEl) {
    const fullText = nameEl.textContent.trim();
    nameEl.textContent = "";
    let i = 0;
    const speed = 80;
    function type() {
      if (i < fullText.length) {
        nameEl.textContent += fullText.charAt(i++);
        setTimeout(type, speed);
      }
    }
    type();
  }
});


const revealEls = document.querySelectorAll("section");
function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  revealEls.forEach(sec => {
    const boxTop = sec.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      sec.classList.add("visible");
    } else {
      sec.classList.remove("visible");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


document.querySelectorAll(".social-links i").forEach(icon => {
  icon.addEventListener("mouseenter", () => icon.classList.add("icon-glow"));
  icon.addEventListener("mouseleave", () => icon.classList.remove("icon-glow"));
});


let colors = [[15,23,42],[56,189,248],[250,204,21]];
let step = 0;
let colorIndices = [0,1,2,0];
function updateGradient() {
  let c0 = colors[colorIndices[0]], c1 = colors[colorIndices[1]];
  let c2 = colors[colorIndices[2]], c3 = colors[colorIndices[3]];
  let istep = step/100;
  let color1 = `rgb(${Math.round((1-istep)*c0[0]+istep*c1[0])},${Math.round((1-istep)*c0[1]+istep*c1[1])},${Math.round((1-istep)*c0[2]+istep*c1[2])})`;
  let color2 = `rgb(${Math.round((1-istep)*c2[0]+istep*c3[0])},${Math.round((1-istep)*c2[1]+istep*c3[1])},${Math.round((1-istep)*c2[2]+istep*c3[2])})`;
  document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
  step = (step+1)%101;
  if(step===0){ colorIndices=colorIndices.map(i=>(i+1)%colors.length); }
}
setInterval(updateGradient,80);
