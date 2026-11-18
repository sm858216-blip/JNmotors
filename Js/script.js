const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const opened = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// BOTÓN DE CAMBIO DE TEMA
const themeToggle = document.getElementById("themeToggle");
const themeText = themeToggle.querySelector("span");

// Cargar el tema guardado
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
} else {
    document.body.classList.remove("light");
}

// Actualizar el texto del botón
function updateThemeButton() {
    const light = document.body.classList.contains("light");

    themeText.textContent = light ? "OSCURO" : "CLARO";
}

// Mostrar el tema inicial
updateThemeButton();

// Cambiar y guardar el tema
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const light = document.body.classList.contains("light");

    localStorage.setItem("theme", light ? "light" : "dark");

    updateThemeButton();
});

const searchInput = document.getElementById("searchInput");
const filters = [...document.querySelectorAll(".filter")];
const products = [...document.querySelectorAll(".product-card")];
const emptyState = document.getElementById("emptyState");
let activeFilter = "all";

function filterProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  let visible = 0;
  products.forEach(card => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesText = card.dataset.name.toLocaleLowerCase("es").includes(query) ||
      card.textContent.toLocaleLowerCase("es").includes(query);
    const show = matchesCategory && matchesText;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}
searchInput.addEventListener("input", filterProducts);
filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  activeFilter = button.dataset.filter;
  filterProducts();
}));

const dialog = document.getElementById("productDialog");
const dialogTitle = document.getElementById("dialogTitle");
document.querySelectorAll(".details-btn").forEach(button => button.addEventListener("click", () => {
  const name = button.dataset.product;
  dialogTitle.textContent = name;
  document.getElementById("dialogWhatsapp").href =
    "https://wa.me/573104589201?text=" + encodeURIComponent("Hola, quiero consultar disponibilidad de: " + name);
  dialog.showModal();
}));
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
