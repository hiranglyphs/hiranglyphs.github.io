/* Applies saved theme before paint, and wires up the toggle button. */
(function () {
  if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.add("light-mode");
  }
})();

document.addEventListener("click", function (e) {
  var btn = e.target.closest && e.target.closest("#theme-toggle");
  if (!btn) return;
  var isLight = document.documentElement.classList.toggle("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  btn.setAttribute("aria-checked", isLight ? "true" : "false");
});
