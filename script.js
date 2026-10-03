/**
 * Anil Shrestha — Creative Portfolio Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initPortfolioFilter();
  initContactForm();
  initModalHandlers();
});

/* ==========================================================================
   1. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });

  // Close nav on link click
  const navLinks = mobileNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   2. Portfolio Works Filtering
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-black', 'shadow-lg', 'shadow-cyan-500/30');
        b.classList.add('bg-slate-900/80', 'text-slate-300', 'border-slate-800');
      });

      // Add active class to clicked button
      btn.classList.remove('bg-slate-900/80', 'text-slate-300', 'border-slate-800');
      btn.classList.add('bg-cyan-500', 'text-black', 'shadow-lg', 'shadow-cyan-500/30');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === itemCategory) {
          item.classList.remove('hidden-item');
        } else {
          item.classList.add('hidden-item');
        }
      });
    });
  });
}

/* ==========================================================================
   3. Interactive Contact Form Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Visual loading response
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Sending...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      feedback.classList.remove('hidden');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Hide message after 5 seconds
      setTimeout(() => {
        feedback.classList.add('hidden');
      }, 5000);
    }, 1200);
  });
}

/* ==========================================================================
   4. Packages & General Modal Handlers
   ========================================================================== */
function initModalHandlers() {
  const pkgModal = document.getElementById('pkgModal');
  const pkgTitle = document.getElementById('modalPkgTitle');

  if (!pkgModal) return;

  // Global functions attached to window for inline HTML onclick triggers
  window.openPkgModal = function(packageName) {
    if (pkgTitle) pkgTitle.innerText = `${packageName} Details`;
    pkgModal.classList.remove('hidden');
  };

  window.closePkgModal = function() {
    pkgModal.classList.add('hidden');
  };

  window.selectPackage = function(packageName) {
    const contactSection = document.getElementById('contact');
    const messageInput = document.getElementById('contactMessage');

    if (messageInput) {
      messageInput.value = `Hi Anil, I am interested in booking the ${packageName} package for my upcoming project.`;
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close modal when clicking outside content box
  pkgModal.addEventListener('click', (e) => {
    if (e.target === pkgModal) {
      window.closePkgModal();
    }
  });
}
