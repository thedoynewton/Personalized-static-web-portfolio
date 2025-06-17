// This file will handle navigation and dynamic content loading for the SPA Portfolio

const routes = {
  "": "home",
  "#home": "home",
  "#about": "about",
  "#projects": "projects",
  "#techstack": "techstack",
  "#blog": "blog",
  "#resume": "resume",
};

const main = document.querySelector("main");

async function loadContent(route) {
  let file = "";
  switch (route) {
    case "about":
      file = "about.html";
      break;
    case "projects":
      file = "project.html";
      break;
    case "techstack":
      file = "techStack.html";
      break;
    case "blog":
      file = "blog.html";
      break;
    case "resume":
      file = "resume.html";
      break;
    default:
      file = "index.html";
  }
  if (file === "index.html") {
    // Only load the main section for home
    const res = await fetch("index.html");
    const text = await res.text();
    const temp = document.createElement("div");
    temp.innerHTML = text;
    const homeSection = temp.querySelector("main").innerHTML;
    main.innerHTML = homeSection;
  } else {
    const res = await fetch(file);
    const text = await res.text();
    const temp = document.createElement("div");
    temp.innerHTML = text;
    const content = temp.querySelector(
      "main, .about-container, .projects-main, .techstack-main, .maintenance-main, #resume"
    );
    if (content) {
      main.innerHTML = content.outerHTML;
    } else {
      main.innerHTML = "<p>Content not found.</p>";
    }
  }
}

function handleNav(e) {
  if (e.target.tagName === "A" && e.target.closest(".nav-links")) {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    let hash = "";
    if (href === "index.html") hash = "#home";
    else if (href === "about.html") hash = "#about";
    else if (href === "project.html") hash = "#projects";
    else if (href === "techStack.html") hash = "#techstack";
    else if (href === "blog.html") hash = "#blog";
    else if (href === "resume.html") hash = "#resume";
    else return;
    history.pushState({}, "", hash);
    loadContent(routes[hash]);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".nav-links").addEventListener("click", handleNav);
  window.addEventListener("popstate", () => {
    const hash = window.location.hash || "#home";
    loadContent(routes[hash]);
  });
  const hash = window.location.hash || "#home";
  loadContent(routes[hash]);
});
