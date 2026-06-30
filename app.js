document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Menu Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileNavToggle && nav) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // 4. Mouse Glow Tracking Effect for Cards (Spotlight)
  const cards = document.querySelectorAll('.glow-card, .service-card, .comparison-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 5. Brief Form Mock Submission
  const briefForm = document.getElementById('project-brief-form');
  const successMsg = document.querySelector('.form-success-msg');
  const submitBtn = document.querySelector('.btn-submit');

  if (briefForm && successMsg && submitBtn) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Visual feedback loading state
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Отправка...</span>';
      
      setTimeout(() => {
        // Hide button and input fields with a fade
        submitBtn.style.display = 'none';
        
        // Hide input fields or just show success msg inside form
        briefForm.querySelectorAll('.form-group').forEach(group => {
          group.style.opacity = '0.3';
          group.style.pointerEvents = 'none';
        });
        
        successMsg.style.display = 'flex';
        
        // Save name for console debugging / demo purposes
        const formData = new FormData(briefForm);
        console.log('Brief submitted successfully:', Object.fromEntries(formData.entries()));
      }, 1200);
    });
  }

  // 6. Smooth Scroll reveal animation helper (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add scroll class animations to sections and grid items
  const revealElements = document.querySelectorAll('.service-card, .portfolio-card, .step-card, .comparison-card, .section-header');
  revealElements.forEach((el, index) => {
    // Add base class for animation
    el.classList.add('scroll-reveal');
    
    // Add staggered delay based on index of siblings
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    
    revealObserver.observe(el);
  });
});
