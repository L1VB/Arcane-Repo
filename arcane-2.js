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

    if (segments.length > 0 && loadingScreen) {
        typewriterEffect(0);
    }

    document.querySelectorAll('.toggle-collapse').forEach(button => {
        button.addEventListener('click', function() {
            const collapseContent = this.closest('.des').querySelector('.collapse-content');
            collapseContent.classList.toggle('active');
        });
    });

    const menuToggle = document.getElementById('menuToggle');
    const menuContent = document.getElementById('menuContent');

    if (menuToggle && menuContent) {
        menuToggle.addEventListener('click', function() {
            if (menuContent.style.display === 'block') {
                menuContent.style.display = 'none';
            } else {
                menuContent.style.display = 'block';
            }
        });

        document.addEventListener('click', function(event) {
            if (!menuContent.contains(event.target) && event.target !== menuToggle) {
                menuContent.style.display = 'none';
            }
        });
    }
});

// video carousel - buttons i like
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/embed";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Store YouTube Player objects
let players = {};

// video carousel
let slideIndex = 1;
let currentVideo = null;

// This function will be called when the YouTube API is ready
function onYouTubeIframeAPIReady() {
    // Initialize all iframe players
    for (let i = 1; i <= 5; i++) {
        players[`video${i}`] = new YT.Player(`video${i}`, {
            events: {
                'onReady': onPlayerReady
            }
        });
    }
}

function onPlayerReady(event) {
    // Do something when player is ready if needed
}

function plusSlides(n) {
    // Stop current video if it exists
    if (currentVideo && players[currentVideo]) {
        players[currentVideo].pauseVideo();
    }
    
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    // Stop current video if it exists
    if (currentVideo && players[currentVideo]) {
        players[currentVideo].pauseVideo();
    }
    
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    if (dots.length > 0) {
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        dots[slideIndex-1].className += " active";
    }
    
    // Display the current slide
    slides[slideIndex-1].style.display = "block";
    
    // Get the current video id
    currentVideo = `video${slideIndex}`;
    
    // Play the video if it exists and is initialized
    if (players[currentVideo] && players[currentVideo].playVideo) {
        // Add a small delay to ensure the slide is fully displayed
        setTimeout(() => {
            players[currentVideo].playVideo();
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
});