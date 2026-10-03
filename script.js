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

  // Close mobile navigation after clicking a link
  const navLinks = mobileNav.querySelectorAll('a');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });
}


/* ==========================================================================
   2. Portfolio — Category → 5 Works → Back
   ========================================================================== */

function initPortfolioFilter() {

  const portfolioItems =
    document.querySelectorAll('.portfolio-item');

  /*
   * New category cards.
   *
   * Supported selectors:
   * .category-card
   * .portfolio-category
   * .filter-btn
   */
  const categoryCards =
    document.querySelectorAll(
      '.category-card, .portfolio-category, .filter-btn'
    );

  if (!categoryCards.length || !portfolioItems.length) return;


  /* ------------------------------------------------------------------------
     Find the portfolio containers
     ------------------------------------------------------------------------ */

  const categoryContainer =
    document.querySelector(
      '#portfolioCategories, .portfolio-categories, .category-grid'
    );

  const worksContainer =
    document.querySelector(
      '#portfolioWorks, .portfolio-works'
    );


  /* ------------------------------------------------------------------------
     Create / locate Back button
     ------------------------------------------------------------------------ */

  let backButton =
    document.getElementById('portfolioBack');

  if (!backButton && worksContainer) {

    backButton = document.createElement('button');

    backButton.id = 'portfolioBack';

    backButton.type = 'button';

    backButton.className =
      'inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 hover:bg-cyan-500 hover:text-black transition-all duration-300';

    backButton.innerHTML =
      '<i class="fas fa-arrow-left"></i> Back to Categories';

    worksContainer.parentNode.insertBefore(
      backButton,
      worksContainer
    );

    backButton.classList.add('hidden');
  }


  /* ------------------------------------------------------------------------
     Optional category / works heading elements
     ------------------------------------------------------------------------ */

  const worksTitle =
    document.getElementById('portfolioWorksTitle');

  const worksSubtitle =
    document.getElementById('portfolioWorksSubtitle');


  /* ------------------------------------------------------------------------
     Get category value
     ------------------------------------------------------------------------ */

  function getCategoryValue(card) {

    return (
      card.getAttribute('data-category') ||
      card.getAttribute('data-filter') ||
      card.dataset.category ||
      card.dataset.filter ||
      ''
    ).trim();
  }


  /* ------------------------------------------------------------------------
     Normalize category names
     ------------------------------------------------------------------------ */

  function normalizeCategory(value) {

    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/_/g, '-');
  }


  /* ------------------------------------------------------------------------
     Show selected category
     ------------------------------------------------------------------------ */

  function showCategory(selectedCategory, clickedCard) {

    const normalizedSelected =
      normalizeCategory(selectedCategory);


    /* --------------------------------------------------------------
       Hide category cards
       -------------------------------------------------------------- */

    if (categoryContainer) {

      categoryContainer.classList.add('hidden');

    } else {

      categoryCards.forEach(card => {
        card.classList.add('hidden');
      });

    }


    /* --------------------------------------------------------------
       Show works container
       -------------------------------------------------------------- */

    if (worksContainer) {
      worksContainer.classList.remove('hidden');
    }


    /* --------------------------------------------------------------
       Show Back button
       -------------------------------------------------------------- */

    if (backButton) {
      backButton.classList.remove('hidden');
    }


    /* --------------------------------------------------------------
       Get category name for heading
       -------------------------------------------------------------- */

    let categoryName = selectedCategory;

    if (clickedCard) {

      const titleElement =
        clickedCard.querySelector(
          'h1, h2, h3, h4, .category-title, .package-name'
        );

      if (titleElement) {
        categoryName = titleElement.textContent.trim();
      }
    }


    /* --------------------------------------------------------------
       Update heading if available
       -------------------------------------------------------------- */

    if (worksTitle) {
      worksTitle.textContent = categoryName;
    }

    if (worksSubtitle) {
      worksSubtitle.textContent =
        `Selected works from ${categoryName}`;
    }


    /* --------------------------------------------------------------
       Filter works
       -------------------------------------------------------------- */

    let visibleCount = 0;

    portfolioItems.forEach(item => {

      const itemCategory =
        item.getAttribute('data-category') ||
        item.dataset.category ||
        '';

      const normalizedItem =
        normalizeCategory(itemCategory);


      /*
       * Only show matching category.
       *
       * Maximum 5 works are displayed.
       */

      if (
        normalizedItem === normalizedSelected &&
        visibleCount < 5
      ) {

        item.classList.remove('hidden');
        item.classList.remove('hidden-item');

        visibleCount++;

      } else {

        item.classList.add('hidden-item');

      }

    });


    /* --------------------------------------------------------------
       Scroll to portfolio works
       -------------------------------------------------------------- */

    if (worksContainer) {

      setTimeout(() => {

        const portfolioSection =
          document.getElementById('work') ||
          document.getElementById('portfolio');

        if (portfolioSection) {

          portfolioSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

        }

      }, 100);

    }

  }


  /* ------------------------------------------------------------------------
     Return to category cards
     ------------------------------------------------------------------------ */

  function showCategories() {

    /* --------------------------------------------------------------
       Hide works
       -------------------------------------------------------------- */

    portfolioItems.forEach(item => {
      item.classList.add('hidden-item');
    });


    /* --------------------------------------------------------------
       Hide works container
       -------------------------------------------------------------- */

    if (worksContainer) {
      worksContainer.classList.add('hidden');
    }


    /* --------------------------------------------------------------
       Show category cards
       -------------------------------------------------------------- */

    if (categoryContainer) {

      categoryContainer.classList.remove('hidden');

    } else {

      categoryCards.forEach(card => {
        card.classList.remove('hidden');
      });

    }


    /* --------------------------------------------------------------
       Hide Back button
       -------------------------------------------------------------- */

    if (backButton) {
      backButton.classList.add('hidden');
    }


    /* --------------------------------------------------------------
       Clear heading
       -------------------------------------------------------------- */

    if (worksTitle) {
      worksTitle.textContent = '';
    }

    if (worksSubtitle) {
      worksSubtitle.textContent = '';
    }


    /* --------------------------------------------------------------
       Scroll back to category area
       -------------------------------------------------------------- */

    const portfolioSection =
      document.getElementById('work') ||
      document.getElementById('portfolio');

    if (portfolioSection) {

      portfolioSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }

  }


  /* ------------------------------------------------------------------------
     Category click events
     ------------------------------------------------------------------------ */

  categoryCards.forEach(card => {

    card.addEventListener('click', (event) => {

      /*
       * If the category card contains a normal link,
       * don't allow it to navigate away.
       */

      const link =
        event.target.closest('a');

      if (link) {

        const href =
          link.getAttribute('href');

        /*
         * Allow actual navigation links unless
         * they are placeholder/hash links.
         */

        if (
          href &&
          href !== '#' &&
          !href.startsWith('javascript:')
        ) {
          return;
        }

        event.preventDefault();
      }


      const category =
        getCategoryValue(card);

      if (!category) return;

      showCategory(category, card);

    });

  });


  /* ------------------------------------------------------------------------
     Back button click
     ------------------------------------------------------------------------ */

  if (backButton) {

    backButton.addEventListener(
      'click',
      showCategories
    );

  }


  /* ------------------------------------------------------------------------
     Initial portfolio state
     ------------------------------------------------------------------------ */

  portfolioItems.forEach(item => {
    item.classList.add('hidden-item');
  });

  if (worksContainer) {
    worksContainer.classList.add('hidden');
  }

  if (backButton) {
    backButton.classList.add('hidden');
  }

}


/* ==========================================================================
   3. Interactive Contact Form Submission
   ========================================================================== */

function initContactForm() {

  const form =
    document.getElementById('contactForm');

  const feedback =
    document.getElementById('formFeedback');

  if (!form || !feedback) return;


  form.addEventListener('submit', (e) => {

    e.preventDefault();


    /* --------------------------------------------------------------
       Submit button
       -------------------------------------------------------------- */

    const submitBtn =
      form.querySelector(
        'button[type="submit"]'
      );

    if (!submitBtn) return;


    const originalText =
      submitBtn.innerHTML;


    /* --------------------------------------------------------------
       Loading state
       -------------------------------------------------------------- */

    submitBtn.innerHTML =
      `<i class="fas fa-spinner fa-spin mr-2"></i> Sending...`;

    submitBtn.disabled = true;


    /* --------------------------------------------------------------
       Simulated submission
       -------------------------------------------------------------- */

    setTimeout(() => {

      feedback.classList.remove('hidden');

      form.reset();

      submitBtn.innerHTML =
        originalText;

      submitBtn.disabled = false;


      /* ------------------------------------------------------------
         Hide success message after 5 seconds
         ------------------------------------------------------------ */

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

  const pkgModal =
    document.getElementById('pkgModal');

  const pkgTitle =
    document.getElementById('modalPkgTitle');

  if (!pkgModal) return;


  /* ------------------------------------------------------------------------
     Open Package Modal
     ------------------------------------------------------------------------ */

  window.openPkgModal =
    function(packageName) {

      if (pkgTitle) {

        pkgTitle.innerText =
          `${packageName} Details`;

      }

      pkgModal.classList.remove('hidden');

    };


  /* ------------------------------------------------------------------------
     Close Package Modal
     ------------------------------------------------------------------------ */

  window.closePkgModal =
    function() {

      pkgModal.classList.add('hidden');

    };


  /* ------------------------------------------------------------------------
     Select Package
     ------------------------------------------------------------------------ */

  window.selectPackage =
    function(packageName) {

      const contactSection =
        document.getElementById('contact');

      const messageInput =
        document.getElementById('contactMessage');


      if (messageInput) {

        messageInput.value =
          `Hi Anil, I am interested in booking the ${packageName} package for my upcoming project.`;

      }


      /* --------------------------------------------------------------
         Close modal after selecting package
         -------------------------------------------------------------- */

      pkgModal.classList.add('hidden');


      /* --------------------------------------------------------------
         Scroll to contact
         -------------------------------------------------------------- */

      if (contactSection) {

        contactSection.scrollIntoView({
          behavior: 'smooth'
        });

      }

    };


  /* ------------------------------------------------------------------------
     Close modal when clicking outside content box
     ------------------------------------------------------------------------ */

  pkgModal.addEventListener('click', (e) => {

    if (e.target === pkgModal) {

      window.closePkgModal();

    }

  });


  /* ------------------------------------------------------------------------
     Close modal with Escape key
     ------------------------------------------------------------------------ */

  document.addEventListener('keydown', (e) => {

    if (
      e.key === 'Escape' &&
      !pkgModal.classList.contains('hidden')
    ) {

      window.closePkgModal();

    }

  });

}
