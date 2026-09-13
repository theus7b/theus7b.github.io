(function () {
    var storageKey = "theme";
    var root = document.documentElement;
    var storedTheme = null;

    try {
        storedTheme = localStorage.getItem(storageKey);
    } catch (error) {
        storedTheme = null;
    }

    var theme = storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    root.dataset.theme = theme;

    function updateToggle(toggle) {
        var dark = root.dataset.theme === "dark";
        var label = dark ? "Ativar tema claro" : "Ativar tema escuro";

        toggle.setAttribute("aria-label", label);
        toggle.setAttribute("title", label);
        toggle.setAttribute("aria-pressed", String(dark));
    }

    document.addEventListener("DOMContentLoaded", function () {
        var toggle = document.querySelector("[data-theme-toggle]");

        if (!toggle) {
            return;
        }

        updateToggle(toggle);

        toggle.addEventListener("click", function () {
            var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

            root.dataset.theme = nextTheme;
            updateToggle(toggle);

            try {
                localStorage.setItem(storageKey, nextTheme);
            } catch (error) {
                // The theme still works when storage is unavailable.
            }
        });
    });
}());
