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
    
    slides.forEach((slide, index) => {
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
          <div class="des" id="bold-label">${imgAlt}</div>
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
      currentSlideIndex = 0;
      
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
          scrollToSlide(currentSlideIndex);
        }
      });
      
      nextBtn.addEventListener('click', function() {
        const updatedSlides = document.querySelectorAll('.slides-column .slide');
        if (currentSlideIndex < updatedSlides.length - 1) {
          currentSlideIndex++;
          scrollToSlide(currentSlideIndex);
        }
      });
      
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
          
          updatedSlides[index].click();
        }
      }
    }
  });