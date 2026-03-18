// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, i * 80);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// Observe all project cards
document.querySelectorAll('.proyecto-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
  revealObserver.observe(card);
});

// ===== SEND BUTTON =====
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name = document.querySelector('.form-input[type="text"]')?.value;
    const email = document.querySelector('.form-input[type="email"]')?.value;
    const msg = document.querySelector('textarea')?.value;

    if (!name || !email || !msg) {
      sendBtn.style.background = '#ff5f57';
      sendBtn.querySelector('span').textContent = 'Por favor rellena todos los campos';
      setTimeout(() => {
        sendBtn.style.background = '';
        sendBtn.querySelector('span').textContent = 'Enviar mensaje';
      }, 2000);
      return;
    }

    sendBtn.style.background = '#28c840';
    sendBtn.querySelector('span').textContent = '¡Mensaje enviado!';
    setTimeout(() => {
      sendBtn.style.background = '';
      sendBtn.querySelector('span').textContent = 'Enviar mensaje';
    }, 3000);
  });
}
// ===== REVEAL PROYECTOS - FIX TOTAL =====
function initProyectos() {
  const cards = document.querySelectorAll('.proyecto-card');
  
  if (!cards.length) return;

  // Forzar estado inicial
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  cards.forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', initProyectos);