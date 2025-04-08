document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menuContent");

    toggle.addEventListener("click", () => {
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
        if (!document.querySelector(".H-Menu").contains(e.target)) {
            menu.style.display = "none";
        }
    });
});
