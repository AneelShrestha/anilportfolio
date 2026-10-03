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

  /* ------------------------------------------------------------------------
     Category Elements
     ------------------------------------------------------------------------ */

  const categoryContainer =
    document.getElementById('portfolioCategories');

  const categoryCards =
    document.querySelectorAll('.portfolio-category-card');

  const categoryButtons =
    document.querySelectorAll('.portfolio-view-btn');

  const portfolioItems =
    document.querySelectorAll('.portfolio-item');


  /*
   * If the portfolio category section or buttons don't exist,
   * stop here without affecting the rest of the website.
   */

  if (!categoryContainer || !categoryButtons.length) {
    return;
  }


  /* ------------------------------------------------------------------------
     Find / Create Works Container
     ------------------------------------------------------------------------ */

  let worksContainer =
    document.getElementById('portfolioWorks');


  /*
   * If your existing HTML already has #portfolioWorks,
   * we use it.
   *
   * If it doesn't, we create a container around the existing
   * .portfolio-item elements.
   */

  if (!worksContainer && portfolioItems.length) {

    worksContainer =
      document.createElement('div');

    worksContainer.id =
      'portfolioWorks';

    worksContainer.className =
      'portfolio-works mt-12';


    /*
     * Move existing portfolio items into the works container.
     */

    const firstItem =
      portfolioItems[0];

    firstItem.parentNode.insertBefore(
      worksContainer,
      firstItem
    );

    portfolioItems.forEach(item => {
      worksContainer.appendChild(item);
    });

  }


  /* ------------------------------------------------------------------------
     Back Button
     ------------------------------------------------------------------------ */

  let backButton =
    document.getElementById('portfolioBack');


  if (!backButton) {

    backButton =
      document.createElement('button');

    backButton.id =
      'portfolioBack';

    backButton.type =
      'button';

    backButton.className =
      'portfolio-back-btn';

    backButton.innerHTML =
      '<i class="fas fa-arrow-left"></i> Back to Categories';

    /*
     * Add the Back button before the works area.
     */

    if (worksContainer) {

      worksContainer.parentNode.insertBefore(
        backButton,
        worksContainer
      );

    } else {

      categoryContainer.parentNode.insertBefore(
        backButton,
        categoryContainer.nextSibling
      );

    }

  }


  /* ------------------------------------------------------------------------
     Initially Hide Works
     ------------------------------------------------------------------------ */

  if (worksContainer) {
    worksContainer.classList.add('hidden');
  }

  backButton.classList.add('hidden');


  /*
   * Hide individual works initially.
   */

  portfolioItems.forEach(item => {
    item.classList.add('hidden-item');
  });


  /* ==========================================================================
     SHOW SELECTED CATEGORY
     ========================================================================== */

  function showCategory(category) {

    /* ----------------------------------------------------------------------
       Hide Category Cards
       ---------------------------------------------------------------------- */

    categoryContainer.classList.add('hidden');


    /* ----------------------------------------------------------------------
       Show Works Container
       ---------------------------------------------------------------------- */

    if (worksContainer) {
      worksContainer.classList.remove('hidden');
    }


    /* ----------------------------------------------------------------------
       Show Back Button
       ---------------------------------------------------------------------- */

    backButton.classList.remove('hidden');


    /* ----------------------------------------------------------------------
       Filter Works
       ---------------------------------------------------------------------- */

    let visibleWorks =
      0;


    portfolioItems.forEach(item => {

      const itemCategory =
        item.getAttribute('data-category');


      /*
       * Show only matching category.
       *
       * Maximum = 5 works.
       */

      if (
        itemCategory &&
        itemCategory.toLowerCase() ===
        category.toLowerCase() &&
        visibleWorks < 5
      ) {

        item.classList.remove('hidden-item');
        item.classList.remove('hidden');

        visibleWorks++;

      } else {

        item.classList.add('hidden-item');

      }

    });


    /* ----------------------------------------------------------------------
       Update Works Heading
       ---------------------------------------------------------------------- */

    let categoryName =
      category;


    const selectedCard =
      document.querySelector(
        `.portfolio-category-card[data-category-card="${category}"]`
      );


    if (selectedCard) {

      const title =
        selectedCard.querySelector('h3');

      if (title) {
        categoryName =
          title.textContent.trim();
      }

    }


    /*
     * Create heading if one doesn't already exist.
     */

    let worksHeader =
      document.getElementById('portfolioWorksHeader');


    if (!worksHeader && worksContainer) {

      worksHeader =
        document.createElement('div');

      worksHeader.id =
        'portfolioWorksHeader';

      worksHeader.className =
        'mb-8';

      worksContainer.insertBefore(
        worksHeader,
        worksContainer.firstChild
      );

    }


    if (worksHeader) {

      worksHeader.innerHTML = `
        <span class="section-tag">SELECTED WORK</span>
        <h3 class="section-title mt-3">
          ${categoryName}
        </h3>
        <p class="section-description">
          Selected creative works from ${categoryName}.
        </p>
      `;

    }


    /* ----------------------------------------------------------------------
       Scroll to Works
       ---------------------------------------------------------------------- */

    if (worksContainer) {

      setTimeout(() => {

        worksContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

      }, 100);

    }

  }


  /* ==========================================================================
     RETURN TO CATEGORIES
     ========================================================================== */

  function showCategories() {

    /* ----------------------------------------------------------------------
       Hide All Works
       ---------------------------------------------------------------------- */

    portfolioItems.forEach(item => {

      item.classList.add('hidden-item');

    });


    /* ----------------------------------------------------------------------
       Hide Works Container
       ---------------------------------------------------------------------- */

    if (worksContainer) {

      worksContainer.classList.add('hidden');

    }


    /* ----------------------------------------------------------------------
       Hide Back Button
       ---------------------------------------------------------------------- */

    backButton.classList.add('hidden');


    /* ----------------------------------------------------------------------
       Show Category Cards
       ---------------------------------------------------------------------- */

    categoryContainer.classList.remove('hidden');


    /* ----------------------------------------------------------------------
       Scroll Back to Portfolio Categories
       ---------------------------------------------------------------------- */

    setTimeout(() => {

      categoryContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }, 100);

  }


  /* ==========================================================================
     EXPLORE WORK BUTTONS
     ========================================================================== */

  categoryButtons.forEach(button => {

    button.addEventListener('click', event => {

      /*
       * Prevent the button from doing anything
       * other than opening the selected category.
       */

      event.preventDefault();
      event.stopPropagation();


      /*
       * Read the exact value from:
       *
       * data-open-category="graphic"
       * data-open-category="branding"
       * data-open-category="social"
       * data-open-category="web"
       * data-open-category="video"
       * data-open-category="print"
       */

      const category =
        button.getAttribute('data-open-category');


      if (!category) {
        return;
      }


      showCategory(category);

    });

  });


  /* ==========================================================================
     BACK BUTTON
     ========================================================================== */

  backButton.addEventListener('click', event => {

    event.preventDefault();

    showCategories();

  });

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


  form.addEventListener('submit', event => {

    event.preventDefault();


    const submitBtn =
      form.querySelector(
        'button[type="submit"]'
      );


    if (!submitBtn) return;


    const originalText =
      submitBtn.innerHTML;


    /* ----------------------------------------------------------------------
       Loading State
       ---------------------------------------------------------------------- */

    submitBtn.innerHTML =
      `<i class="fas fa-spinner fa-spin mr-2"></i> Sending...`;

    submitBtn.disabled =
      true;


    /* ----------------------------------------------------------------------
       Submission Response
       ---------------------------------------------------------------------- */

    setTimeout(() => {

      feedback.classList.remove('hidden');

      form.reset();

      submitBtn.innerHTML =
        originalText;

      submitBtn.disabled =
        false;


      /* Hide feedback after 5 seconds */

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


      /* Close modal */

      pkgModal.classList.add('hidden');


      /* Scroll to contact */

      if (contactSection) {

        contactSection.scrollIntoView({
          behavior: 'smooth'
        });

      }

    };


  /* ------------------------------------------------------------------------
     Close Modal When Clicking Outside
     ------------------------------------------------------------------------ */

  pkgModal.addEventListener('click', event => {

    if (event.target === pkgModal) {

      window.closePkgModal();

    }

  });


  /* ------------------------------------------------------------------------
     Close Modal With Escape
     ------------------------------------------------------------------------ */

  document.addEventListener('keydown', event => {

    if (
      event.key === 'Escape' &&
      !pkgModal.classList.contains('hidden')
    ) {

      window.closePkgModal();

    }

  });

}
