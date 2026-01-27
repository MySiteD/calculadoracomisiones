const current = location.pathname.split("/").pop();

document.querySelectorAll(".navbar .nav-link").forEach(link => {

  const href = link.getAttribute("href");

  if (href === current || (href === "index.html" && current === "")) {
    link.classList.add("active");
  }

});
