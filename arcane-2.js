document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const slide = document.querySelector('.slide');
    const videos = Array.from(slide.querySelectorAll('video'));
    const prevButton = carousel.querySelectorAll('button')[0];
    const nextButton = carousel.querySelectorAll('button')[1];
    
    // Adding animation class to facilitate smooth transitions
    videos.forEach(video => {
        video.style.transition = 'all 0.6s ease-in-out';
    });
    
    // Function to move a video to the end of the queue with animation
    function moveToBack() {
        // Disable buttons during animation
        prevButton.disabled = true;
        nextButton.disabled = true;
        
        const firstVideo = videos[0];
        
        // Add animation class to all videos
        videos.forEach(video => {
            video.style.transform = 'translateX(-100%)';
        });
        
        // After animation completes, rearrange the DOM
        setTimeout(() => {
            // Reset transform
            videos.forEach(video => {
                video.style.transform = '';
            });
            
            // Update array
            videos.shift();
            videos.push(firstVideo);
            
            // Update the DOM to reflect the new order
            videos.forEach(video => {
                slide.appendChild(video);
            });
            
            // Re-enable buttons
            prevButton.disabled = false;
            nextButton.disabled = false;
        }, 600); // Match the transition duration in CSS
    }
    
    // Function to move a video to the front of the queue with animation
    function moveToFront() {
        // Disable buttons during animation
        prevButton.disabled = true;
        nextButton.disabled = true;
        
        const lastVideo = videos[videos.length - 1];
        
        // Add animation class to all videos
        videos.forEach(video => {
            video.style.transform = 'translateX(100%)';
        });
        
        // After animation completes, rearrange the DOM
        setTimeout(() => {
            // Reset transform
            videos.forEach(video => {
                video.style.transform = '';
            });
            
            // Update array
            videos.pop();
            videos.unshift(lastVideo);
            
            // Update the DOM to reflect the new order
            videos.forEach(video => {
                slide.appendChild(video);
            });
            
            // Re-enable buttons
            prevButton.disabled = false;
            nextButton.disabled = false;
        }, 600); // Match the transition duration in CSS
    }
    
    // Add event listeners to the buttons
    nextButton.addEventListener('click', moveToBack);
    prevButton.addEventListener('click', moveToFront);
    
    // Initialize videos array to match DOM order
    videos.sort((a, b) => {
        return Array.from(slide.children).indexOf(a) - Array.from(slide.children).indexOf(b);
    });
    
    // Original loading screen functionality (kept from your code)
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

    // Toggle collapse functionality (kept from your code)
    document.querySelectorAll('.toggle-collapse').forEach(button => {
        button.addEventListener('click', function() {
            const collapseContent = this.closest('.des').querySelector('.collapse-content');
            collapseContent.classList.toggle('active');
        });
    });

    // Parallax effect functionality (kept from your code)
    var sections = document.querySelectorAll(".about-BG-img, .music#music-img");
    
    if (sections.length > 0) {
        window.addEventListener("scroll", function() {
            sections.forEach(function(section) {
                var scrollPosition = window.scrollY;
                var sectionOffset = section.offsetTop;
                var backgroundPosition = (scrollPosition - sectionOffset) * 0.5;
                
                section.style.backgroundPosition = "center " + backgroundPosition + "px";
            });
        });
    }

    // Hamburger menu functionality (kept from your code)
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
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuContent.contains(event.target) && event.target !== menuToggle) {
                menuContent.style.display = 'none';
            }
        });
    }
});