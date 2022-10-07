"use strict";

const tabs = document.querySelectorAll(".education__tab");
const tabsContainer = document.querySelector(".education__tab-container");
const tabsContent = document.querySelectorAll(".education__content");
const workScrollTo = document.querySelector(".scroll-work");
const contactScrollTo = document.querySelector(".scroll-contact");
const allContainers = document.querySelectorAll(".container");
const nav = document.querySelector(".main-nav");
const imgTargets = document.querySelectorAll("img[data-src]");
const section4 = document.querySelector("#section--4");
const section5 = document.querySelector("#section--5");
const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelectorAll(".main-nav-link");
const allSections = document.querySelectorAll(".active");
const mainNavList = document.querySelector(".main-nav-list");

////////////////////////////////////////////////////
////////////////////////////////////////////////////

// Active Nav Link

const navSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  navLink.forEach(function (link) {
    if (link.getAttribute("href").slice(1) === entry.target.id) {
      link.classList.add("active-nav");
    } else {
      link.classList.remove("active-nav");
    }
  });
};
const secObserver = new IntersectionObserver(navSection, {
  root: null,
  threshold: 0.4,
  // rootMargin: "-200px",
});

allSections.forEach(function (section) {
  secObserver.observe(section);
});

// Nav Link scroll

mainNavList.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("main-nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed component education section

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".education__tab");
  console.log(clicked);

  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("education__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("education__content--active"));

  // Activate tab
  clicked.classList.add("education__tab--active");

  //Activate content area
  document
    .querySelector(`.education__content--${clicked.dataset.tab}`)
    .classList.add("education__content--active");
});

// Nav fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("main-nav-link")) {
    const link = e.target;
    const siblings = link
      .closest(".main-nav")
      .querySelectorAll(".main-nav-link");
    const logo = link.closest(".main-nav").querySelector(".logo");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.6));
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky Navigation

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting)
    nav.classList.add("nav-sticky"), (nav.style.height = "8rem");
  else nav.classList.remove("nav-sticky"), (nav.style.height = "9rem");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px `,
});

headerObserver.observe(header);

// Button Scroll TO

workScrollTo.addEventListener("click", function (e) {
  // const s4coords = section4.getBoundingClientRect();
  section4.scrollIntoView({ behavior: "smooth" });
});
contactScrollTo.addEventListener("click", function (e) {
  // const s4coords = section4.getBoundingClientRect();
  section5.scrollIntoView({ behavior: "smooth" });
});

// Reveal sections

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("container--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.12,
});
allContainers.forEach(function (container) {
  sectionObserver.observe(container);
  container.classList.add("container--hidden");
});

// Lazy loading images

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Make mobile navigation work

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mainNavList.classList.toggle("active");
});

navLink.forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mainNavList.classList.remove("active");
  })
);

// Quick Links

document.querySelector(".footer-lists").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("footer-list")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
