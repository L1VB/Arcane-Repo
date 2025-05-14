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
  
  // Define the ordered list of slides for proper navigation
  const slidesOrder = [
    {
      topic: "Season 1 Act 1",
      img: "https://d2w9rnfcy7mm78.cloudfront.net/36028132/original_e846d7c9b0cd999b65653686bacfe619.png?1744782821?bc=0",
      alt: "Season1-Act1",
      desc: "Vi and Powder find their parents dead after a battle in Piltover and are taken in by Vander, a former rebel leader. Years later, the sisters steal from Piltover, but Powder accidentally causes an explosion using magical crystals. Jayce, a Piltover student, is expelled when his arcane experiments are discovered, though Viktor offers to help him continue his work. Meanwhile, crime lord Silco captures Vander after transforming the thug Deckard with a mutagen called shimmer. During a failed rescue attempt, Powder unintentionally kills Mylo and Claggor. Heartbroken, Vi abandons her and is then captured by Marcus, while Silco takes Powder under his wing."
    },
    {
      topic: "Season 1 Act 2",
      img: "https://d2w9rnfcy7mm78.cloudfront.net/36028101/original_c063881be146af2e0ac0cc95a0e7e599.png?1744782617?bc=0",
      alt: "Season1-Act2",
      desc: "Years pass, and Piltover thrives thanks to Jayce's development of Hextech. Powder, now known as Jinx, works for Silco and steals a Hextech gemstone, killing several enforcers in the process. Caitlyn, an enforcer, frees Vi from prison to help track down Silco. Unbeknownst to them, Marcus is secretly working for Silco, while Viktor struggles with a terminal illness. Vi learns that Jinx is now working for Silco, and the sisters briefly reunite before being separated by the Firelights."
    },
    {
      topic: "Season 1 Act 3",
      img: "https://d2w9rnfcy7mm78.cloudfront.net/35910948/original_94f800a97096d5a9fbf90eb85ee93e7b.png?1744339311?bc=0",
      alt: "Season1-Act3",
      desc: "The Firelights are led by Ekko, a childhood friend of Vi and Powder. Jayce and Vi team up to attack shimmer factories, but during a raid, Jayce accidentally kills a child. In an attempt to end the conflict, Jayce offers Silco a deal—Zaun's independence in exchange for Jinx. However, Jinx kidnaps Vi and Caitlyn, forcing a dramatic confrontation with Silco. When Silco tries to shoot Vi, Jinx accidentally kills him instead. Fully embracing her new identity, Jinx fires a gemstone-powered rocket at the Piltover council just as they approve Zaun's independence."
    },
    {
      topic: "Season 2 Act 1",
      img: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/11/vi-caitlyn-task-force-gray-arcane-season-2.jpg",
      alt: "Season2-Act1",
      desc: "Some councilors survive Jinx's attack, and Caitlyn forms a task force with Vi to capture her. Meanwhile, Zaun's chem-barons battle for control, and Jinx meets and saves a young orphan named Isha. Viktor, now bonded with the Hexcore, gains magical healing abilities. Ambessa survives an assassination attempt, but her daughter Mel is abducted. During an escape, Jinx damages Zaun's air ducts, releasing toxic gas into Piltover. In response, Ambessa enforces martial law, appointing Caitlyn as commander."
    },
    {
      topic: "Season 2 Act 2",
      img: "https://d2w9rnfcy7mm78.cloudfront.net/36355005/original_79462a8555700ade8f57aa79a0b03899.jpg?1746007769?bc=0",
      alt: "Season2-Act2",
      desc: "With Piltover and Noxian forces occupying Zaun, Jinx becomes a local hero. She and Sevika break into Stillwater Hold to rescue Isha, but a human-wolf hybrid created by Singed attacks the prison and recognizes Jinx. The creature is revealed to be Vander, and Vi is finally reunited with both him and Jinx. Meanwhile, Mel discovers her latent magical powers while imprisoned by the Black Rose, and Jayce, after encountering a wild rune, vows to destroy Hextech."
    },
    {
      topic: "Season 2 Act 3",
      img: "https://i0.wp.com/brignews.com/wp-content/uploads/2024/11/GdKhD91acAEyyOn.jpg?resize=2048,870&ssl=1",
      alt: "Season2-Act3",
      desc: "Ekko and Heimerdinger travel to a parallel universe where Hextech was never invented and witness a better outcome. Jayce is shown a post-apocalyptic future caused by Viktor’s unchecked ambitions. Desperate, Viktor allies with Ambessa to attack Piltover after being denied access to the Hexgate anomaly. Vi, believing in her sister’s redemption, releases Jinx—who then turns on her and imprisons her before setting off to “break the cycle of violence.” While Noxian forces distract Piltover with a large-scale assault, Viktor infiltrates the Hex Vault. Jayce ultimately convinces him to abandon his plan, and together they destroy the wild rune, vanishing in the process. In the end, Jinx seemingly sacrifices herself to protect Vi from a feral Vander."
    }
  ];
  
  let currentSlideIndex = 0;

  // Initialize active slide from the DOM
  let activeSlide = {
    img: activeSlideContainer.querySelector('img').src,
    alt: activeSlideContainer.querySelector('img').alt,
    topic: activeSlideContainer.querySelector('.topic').textContent.trim(),
    desc: activeSlideContainer.querySelector('.des').textContent.trim()
  };
  
  // Find the current index in the ordered list
  function findCurrentOrderIndex() {
    return slidesOrder.findIndex(slide => slide.topic === activeSlide.topic);
  }
  
  // Initialize slide indices and click handlers
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
  
  // Fixed navigation for small screens
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      const currentOrderIndex = findCurrentOrderIndex();
      
      if (currentOrderIndex === -1) return; // Safety check
      
      // Calculate the previous index, looping back to the last slide if at the first
      const prevOrderIndex = currentOrderIndex > 0 ? currentOrderIndex - 1 : slidesOrder.length - 1;
      const prevSlide = slidesOrder[prevOrderIndex];
      
      // Update active slide with animation
      activeSlideContainer.classList.add('fade-out');
      
      setTimeout(() => {
        activeSlideContainer.innerHTML = `
          <div class="active-slide">
            <img src="${prevSlide.img}" alt="${prevSlide.alt}">
            <div class="topic" id="h4">${prevSlide.topic}</div>
            <div class="des" id="medium-body">
              ${prevSlide.desc}
            </div>
          </div>
        `;
        
        // Update active slide reference
        activeSlide = {
          img: prevSlide.img,
          alt: prevSlide.alt,
          topic: prevSlide.topic,
          desc: prevSlide.desc
        };
        
        activeSlideContainer.classList.remove('fade-out');
        activeSlideContainer.classList.add('fade-in');
        
        setTimeout(() => {
          activeSlideContainer.classList.remove('fade-in');
        }, 500);
      }, 500);
    });
    
    nextBtn.addEventListener('click', function() {
      const currentOrderIndex = findCurrentOrderIndex();
      
      if (currentOrderIndex === -1) return; // Safety check
      
      // Calculate the next index, looping back to the first slide if at the last
      const nextOrderIndex = (currentOrderIndex + 1) % slidesOrder.length;
      const nextSlide = slidesOrder[nextOrderIndex];
      
      // Update active slide with animation
      activeSlideContainer.classList.add('fade-out');
      
      setTimeout(() => {
        activeSlideContainer.innerHTML = `
          <div class="active-slide">
            <img src="${nextSlide.img}" alt="${nextSlide.alt}">
            <div class="topic" id="h4">${nextSlide.topic}</div>
            <div class="des" id="medium-body">
              ${nextSlide.desc}
            </div>
          </div>
        `;
        
        // Update active slide reference
        activeSlide = {
          img: nextSlide.img,
          alt: nextSlide.alt,
          topic: nextSlide.topic,
          desc: nextSlide.desc
        };
        
        activeSlideContainer.classList.remove('fade-out');
        activeSlideContainer.classList.add('fade-in');
        
        setTimeout(() => {
          activeSlideContainer.classList.remove('fade-in');
        }, 500);
      }, 500);
    });
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