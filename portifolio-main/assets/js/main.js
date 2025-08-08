import { projetos } from "./projetos.js";

let desafios = null;

// Tenta importar desafios dinamicamente (se disponível)
(async () => {
  try {
    const mod = await import("./desafios.js");
    desafios = mod.desafios;
  } catch (error) {
    console.warn("Arquivo desafios.js não encontrado ou não pode ser carregado.");
  }
})();

const navigation = document.querySelector("#navigation");
const backToTopButton = document.querySelector("#backToTopButton");
const toggle = document.querySelector("#sw-checkbox");
const projectsSection = document.querySelector("#projects .wrapper");

const notebook_1 = document.querySelector("#notebook-1");
const notebook_2 = document.querySelector("#notebook-2");
const notebook_2_white = document.querySelector("#notebook-2-white");
const vidro = document.querySelector("#vidro");

window.addEventListener("load", function begin() {
  projetos(projectsSection);

  const desafioBtn = document.querySelector("#desafio");
  if (desafioBtn && typeof desafios === "function") {
    desafioBtn.addEventListener("click", () => {
      desafios(projectsSection);

      const backBtn = document.querySelector("#backToProjectsBtn");
      if (backBtn) {
        backBtn.addEventListener("click", begin);
      }
    });
  } else if (desafioBtn) {
    // Desabilita botão ou mostra mensagem se desafios não estiver disponível
    desafioBtn.disabled = true;
    desafioBtn.title = "Desafios não disponível no momento";
  }
});

window.addEventListener("scroll", onScroll);
onScroll();

window.onload = setTimeout(() => {
  notebook_1.style.opacity = 0;

  notebook_1.style.animation = "none";
  notebook_2.style.animation = "none";
  notebook_2_white.style.animation = "none";
  vidro.style.animation = "none";
}, 4000);

function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();

  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(projects);
  activateMenuAtCurrentSection(knowledge);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);

  menuElement.classList.remove("active");

  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

openMenu();
function openMenu() {
  const openBtns = document.querySelectorAll(".open");
  openBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.add("menu-expanded");
    });
  });
}

closeMenu();
function closeMenu() {
  const closeBtns = document.querySelectorAll(".close");
  closeBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.remove("menu-expanded");
    });
  });
}

ScrollReveal({
  origin: "bottom",
  distance: "50px",
  duration: 1000,
}).reveal(
  `#home, 
  #home img, 
  #about, 
  #about header, 
  #about p,
  #about img,
  #projects,
  #projects header,
  #projects .card,
  #knowledge,
  #knowledg header,
  #knowledg .card,
  #contact,
  #contact header`
);

toggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});

function animateProgressBars() {
  const section = document.querySelector("#knowledge");
  const bars = document.querySelectorAll(".progress-bar");

  const sectionTop = section.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100) {
    bars.forEach(bar => {
      const fill = bar.querySelector(".progress-fill");
      const progress = bar.getAttribute("data-progress");
      fill.style.width = progress;
    });

    window.removeEventListener("scroll", animateProgressBars);
  }
}

window.addEventListener("scroll", animateProgressBars);
