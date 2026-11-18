
const themeToggle = document.getElementById("themeToggle");

// Comprobar que el botón existe
if (themeToggle) {
    const themeIcon = themeToggle.querySelector("i");
    const themeText = themeToggle.querySelector("span");

    // Recuperar el tema guardado
    const savedTheme = localStorage.getItem("jn-motors-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    // Actualizar icono y texto
    function updateThemeButton() {
        const isLight = document.body.classList.contains("light-mode");

        themeIcon.className = isLight
            ? "fa-solid fa-moon"
            : "fa-solid fa-sun";

        themeText.textContent = isLight
            ? "Modo oscuro"
            : "Modo claro";

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"
        );
    }

    // Mostrar el estado inicial
    updateThemeButton();

    // Cambiar entre temas
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        localStorage.setItem(
            "jn-motors-theme",
            isLight ? "light" : "dark"
        );

        updateThemeButton();
    });
}
