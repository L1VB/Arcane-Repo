document.addEventListener('DOMContentLoaded', function() {
    const segments = document.querySelectorAll('.loading-segment');
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const segmentTime = 300;

    function typewriterEffect(index) {
        if (index >= segments.length) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.style.display = 'block';
            }, 500);
            return;
        }

        segments[index].style.animation = `typewriter 0.3s ease forwards`;
        setTimeout(() => {
            segments[index].classList.add('filled');
            typewriterEffect(index + 1);
        }, segmentTime);
    }

    typewriterEffect(0);
});


document.querySelectorAll('.toggle-collapse').forEach(button => {
    button.addEventListener('click', function() {
        const collapseContent = this.closest('.des').querySelector('.collapse-content');
        collapseContent.classList.toggle('active');
    });
});


document.addEventListener("DOMContentLoaded", function() {
    var sections = document.querySelectorAll(".about-BG-img");

    window.addEventListener("scroll", function() {
        sections.forEach(function(section) {
            var scrollPosition = window.scrollY;
            var sectionOffset = section.offsetTop;
            var backgroundPosition = (scrollPosition - sectionOffset) * 0.5; // Adjust the multiplier for desired effect

            section.style.backgroundPosition = "center " + backgroundPosition + "px";
        });
    });
});




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
