function digitarCaracter(elemento) {
  const arrayTexto = elemento.innerHTML.split("");
  elemento.innerHTML = "";
  arrayTexto.forEach((letra, i) => {
    setTimeout(() => (elemento.innerHTML += letra), 75 * i);
  });
}

const palavras = document.querySelector(".banner-texto");
digitarCaracter(palavras);

const menuLink = document.querySelectorAll('.menu-link[href^="#"]');
console.log(menuLink);

menuLink.forEach((item) => {
  item.addEventListener("click", scrollIdClick);
});

function scrollTopHref(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

function scrollIdClick(event) {
  event.preventDefault();
  const to = scrollTopHref(event.target) - 90;
  scrollPosition(to);
}

function scrollPosition(to) {
  window.scroll({
    top: to,
    behavior: "smooth",
  });
}

const debounce = function (func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const objetivo = document.querySelectorAll("[data-animacao]");
const animacaoClass = "anime";

function scrollAnimacao() {
  const topoDoSite = window.scrollY + window.innerHeight * 1.0;
  objetivo.forEach(function (element) {
    if (topoDoSite > element.offsetTop) {
      element.classList.add(animacaoClass);
    } else {
      element.classList.remove(animacaoClass);
    }
  });
}

scrollAnimacao();

if (objetivo.length) {
  window.addEventListener(
    "scroll",
    debounce(function () {
      scrollAnimacao();
    }, 200)
  );
}

class Slider {
  constructor(id) {
    this.slide = document.querySelector(`[data-slide="${id}"]`);
    this.active = 0;
    this.init();
  }

  activeSlide(index) {
    this.active = index;
    this.items.forEach((item) => item.classList.remove("active"));
    this.items[index].classList.add("active");
  }

  antes() {
    if (this.active > 0) {
      this.activeSlide(this.active - 1);
    } else {
      this.activeSlide(this.items.length - 1);
    }
  }

  depois() {
    if (this.active < this.items.length - 1) {
      this.activeSlide(this.active + 1);
    } else {
      this.activeSlide(0);
    }
  }

  addNavegacao() {
    const proximoEvento = this.slide.querySelector(".depoimentos-direita");
    const antesEvento = this.slide.querySelector(".depoimentos-esquerda");
    proximoEvento.addEventListener("click", this.depois);
    antesEvento.addEventListener("click", this.antes);
  }

  init() {
    this.depois = this.depois.bind(this);
    this.antes = this.antes.bind(this);
    this.items = this.slide.querySelectorAll(".depoimentos-contain > *");
    this.activeSlide(0);
    this.addNavegacao();
  }
}

new Slider("slide");

const mobileButton = document.getElementById("menu-mobile");

function menuToggle(event) {
  if (event.type === "touchstart") event.preventDefault();
  const nav = document.getElementById("menu");
  nav.classList.toggle("active");
}

mobileButton.addEventListener("click", menuToggle);
mobileButton.addEventListener("touchstart", menuToggle);
