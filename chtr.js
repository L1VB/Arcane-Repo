document.addEventListener('DOMContentLoaded', function() {
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

  const slidesColumn = document.querySelector('.slides-column');
  const slides = document.querySelectorAll('.slides-column .slide');
  const activeSlideContainer = document.querySelector('.active-slide-container');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentSlideIndex = 0;

  let activeSlide = {
    img: activeSlideContainer.querySelector('img').src,
    alt: activeSlideContainer.querySelector('img').alt,
    topic: activeSlideContainer.querySelector('.topic').textContent.trim(),
    desc: activeSlideContainer.querySelector('.des').textContent.trim()
  };
  
  // Initialize slide indices
  slides.forEach((slide, index) => {
    slide.setAttribute('data-index', index);
    slide.addEventListener('click', function() {
      const clickedImg = this.dataset.img;
      const clickedAlt = this.dataset.alt;
      const clickedTopic = this.dataset.topic;
      const clickedDesc = this.dataset.desc;
      
      activeSlideContainer.classList.add('fade-out');
      
      setTimeout(() => {
        const newSlide = createSlideElement(
          activeSlide.img, 
          activeSlide.alt, 
          activeSlide.topic, 
          activeSlide.desc
        );
        
        activeSlideContainer.innerHTML = `
          <div class="active-slide">
            <img src="${clickedImg}" alt="${clickedAlt}">
            <div class="topic" id="h4">${clickedTopic}</div>
            <div class="des" id="medium-body">
              ${clickedDesc}
            </div>
          </div>
        `;
        
        activeSlide = {
          img: clickedImg,
          alt: clickedAlt,
          topic: clickedTopic,
          desc: clickedDesc
        };
        
        slidesColumn.removeChild(this);
        
        slidesColumn.appendChild(newSlide);
        
        bindClickEventToSlide(newSlide);

        updateSlideIndices();
        currentSlideIndex = parseInt(this.getAttribute('data-index'));
        
        activeSlideContainer.classList.remove('fade-out');
        activeSlideContainer.classList.add('fade-in');
        
        setTimeout(() => {
          activeSlideContainer.classList.remove('fade-in');
        }, 500);
      }, 500);
    });
  });
  
  function createSlideElement(imgSrc, imgAlt, topic, desc) {
    const newSlide = document.createElement('div');
    newSlide.className = 'slide';
    
    newSlide.dataset.img = imgSrc;
    newSlide.dataset.alt = imgAlt;
    newSlide.dataset.topic = topic;
    newSlide.dataset.desc = desc;
    
    newSlide.innerHTML = `
      <div class="slide-overlay"></div>
      <img src="${imgSrc}" alt="${imgAlt}">
      <div class="text-overlay">
        <div class="topic" id="stat-number">${topic}</div>
        <div class="des" id="bold-label">Click Here</div>
      </div>
    `;
    
    return newSlide;
  }
  
  function bindClickEventToSlide(slide) {
    slide.addEventListener('click', function() {
      const clickedImg = this.dataset.img;
      const clickedAlt = this.dataset.alt;
      const clickedTopic = this.dataset.topic;
      const clickedDesc = this.dataset.desc;
      
      activeSlideContainer.classList.add('fade-out');
      
      setTimeout(() => {
        const newSlide = createSlideElement(
          activeSlide.img, 
          activeSlide.alt, 
          activeSlide.topic, 
          activeSlide.desc
        );
        
        activeSlideContainer.innerHTML = `
          <div class="active-slide">
            <img src="${clickedImg}" alt="${clickedAlt}">
            <div class="topic" id="h4">${clickedTopic}</div>
            <div class="des" id="medium-body">
              ${clickedDesc}
            </div>
          </div>
        `;
        
        activeSlide = {
          img: clickedImg,
          alt: clickedAlt,
          topic: clickedTopic,
          desc: clickedDesc
        };
        
        slidesColumn.removeChild(this);
        
        slidesColumn.appendChild(newSlide);
        
        bindClickEventToSlide(newSlide);
        
        updateSlideIndices();
        currentSlideIndex = parseInt(this.getAttribute('data-index'));
        
        activeSlideContainer.classList.remove('fade-out');
        activeSlideContainer.classList.add('fade-in');
        
        setTimeout(() => {
          activeSlideContainer.classList.remove('fade-in');
        }, 500);
      }, 500);
    });
  }
  
  function updateSlideIndices() {
    const updatedSlides = document.querySelectorAll('.slides-column .slide');
    
    updatedSlides.forEach((slide, index) => {
      slide.setAttribute('data-index', index);
    });
  }
  
  if (prevBtn && nextBtn && slides.length > 0) {
    const slideWidth = slides[0].offsetWidth + 
      (parseInt(window.getComputedStyle(slides[0]).marginRight) || 20);
    
    prevBtn.addEventListener('click', function() {
      const updatedSlides = document.querySelectorAll('.slides-column .slide');
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        clickSlide(currentSlideIndex);
      } else if (updatedSlides.length > 0) {
        // Loop to the last slide if at the beginning
        currentSlideIndex = updatedSlides.length - 1;
        clickSlide(currentSlideIndex);
      }
    });
    
    nextBtn.addEventListener('click', function() {
      const updatedSlides = document.querySelectorAll('.slides-column .slide');
      if (currentSlideIndex < updatedSlides.length - 1) {
        currentSlideIndex++;
        clickSlide(currentSlideIndex);
      } else if (updatedSlides.length > 0) {
        // Loop to the first slide if at the end
        currentSlideIndex = 0;
        clickSlide(currentSlideIndex);
      }
    });
    
    function clickSlide(index) {
      const updatedSlides = document.querySelectorAll('.slides-column .slide');
      if (updatedSlides[index]) {
        updatedSlides[index].click();
      }
    }
    
    function scrollToSlide(index) {
      const updatedSlides = document.querySelectorAll('.slides-column .slide');
      if (slidesColumn && updatedSlides[index]) {
        if (window.innerWidth <= 900) {
          const targetPos = index * slideWidth;
          slidesColumn.scrollTo({
            left: targetPos,
            behavior: 'smooth'
          });
        } else {
          updatedSlides[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }
      }
    }
  }
});



// down arrow button
let currentTitleIndex = 0;
let scrollDirection = 'down';

function scrollToTitle() {
    const titleElements = document.querySelectorAll('.title');
    const navbarHeight = document.querySelector('.new-nav')?.offsetHeight || 0;

    if (titleElements.length === 0) return;

    if (scrollDirection === 'down') {
        if (currentTitleIndex < titleElements.length) {
            const targetElement = titleElements[currentTitleIndex];
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: elementPosition - navbarHeight - 60,
                behavior: 'smooth'
            });

            currentTitleIndex++;

            if (currentTitleIndex >= titleElements.length) {
                scrollDirection = 'up';
                currentTitleIndex = titleElements.length - 2;

                document.querySelector('#arrow-alternative img').style.transform = 'rotate(180deg)';
            }
        }
    } else {
        if (currentTitleIndex >= 0) {
            const targetElement = titleElements[currentTitleIndex];
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: elementPosition - navbarHeight - 60,
                behavior: 'smooth'
            });

            currentTitleIndex--;

            if (currentTitleIndex < 0) {
                scrollDirection = 'down';
                currentTitleIndex = 1;

                document.querySelector('#arrow-alternative img').style.transform = 'rotate(0deg)';
            }
        }
    }
}

window.addEventListener('scroll', function() {
    const arrow = document.querySelector('.down-arrow');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
        arrow.style.bottom = '2em';
        arrow.style.top = 'auto';
    } else {
        arrow.style.bottom = 'auto';
        arrow.style.top = 'auto';
    }
});

// text over - location
document.addEventListener('DOMContentLoaded', function() {
  // Only run if we're on a page with text overlays
  const textOverlays = document.querySelectorAll('.big-img-container .text-overlay');
  
  if (textOverlays.length > 0) {
      initializeTextOverlays();
  }

  function initializeTextOverlays() {
      textOverlays.forEach(overlay => {
          // Wrap content in a container for better measurement
          const content = overlay.querySelector('.des');
          if (!content) return;
          
          const container = document.createElement('div');
          container.className = 'read-more-container';
          content.parentNode.insertBefore(container, content);
          container.appendChild(content);
          
          // Check if content is overflowing
          checkOverflow(overlay, container);
          
          // Re-check on window resize
          window.addEventListener('resize', () => {
              checkOverflow(overlay, container);
          });
      });
  }

  function checkOverflow(overlay, container) {
      // Temporarily expand to measure full height
      overlay.classList.add('measuring');
      overlay.style.maxHeight = 'none';
      
      const isOverflowing = container.scrollHeight > overlay.clientHeight;
      
      // Remove temporary styles
      overlay.classList.remove('measuring');
      overlay.style.maxHeight = '';
      
      // Find or create the read more button
      let readMoreBtn = overlay.querySelector('.read-more-btn');
      
      if (isOverflowing) {
          if (!readMoreBtn) {
              readMoreBtn = document.createElement('button');
              readMoreBtn.className = 'read-more-btn';
              readMoreBtn.textContent = 'Read More';
              
              readMoreBtn.addEventListener('click', function(e) {
                  e.stopPropagation();
                  overlay.classList.toggle('expanded');
                  readMoreBtn.textContent = overlay.classList.contains('expanded') ? 'Read Less' : 'Read More';
              });
              
              overlay.appendChild(readMoreBtn);
          }
          readMoreBtn.style.display = 'block';
      } else if (readMoreBtn) {
          readMoreBtn.style.display = 'none';
          overlay.classList.remove('expanded');
      }
  }
});