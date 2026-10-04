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
   2. Portfolio — Category → Works → Back → Preview
   ========================================================================== */

function initPortfolioFilter() {

  const categoryContainer =
    document.getElementById('portfolioCategories');

  const worksContainer =
    document.getElementById('portfolioWorks');

  const categoryButtons =
    document.querySelectorAll('.portfolio-view-btn');

  const workGrids =
    document.querySelectorAll('.portfolio-work-grid');

  const backButton =
    document.getElementById('portfolioBackBtn');

  const workNumber =
    document.getElementById('portfolioWorkNumber');

  const workTitle =
    document.getElementById('portfolioWorkTitle');

  const workDescription =
    document.getElementById('portfolioWorkDescription');

  const portfolioCount =
    document.getElementById('portfolioCount');


  /* ---------------------------------------------------------------
     SAFETY CHECK
  --------------------------------------------------------------- */

  if (
    !categoryContainer ||
    !worksContainer ||
    !categoryButtons.length ||
    !workGrids.length
  ) {
    return;
  }


  /* ---------------------------------------------------------------
     CATEGORY INFORMATION
  --------------------------------------------------------------- */

  const categoryInfo = {

    graphic: {
      number: '01 — GRAPHIC DESIGN',
      title: 'Graphic Design',
      description:
        'Selected graphic design projects and creative visual work.'
    },

    branding: {
      number: '02 — BRAND & IDENTITY',
      title: 'Brand & Identity',
      description:
        'Selected branding, logo and visual identity projects.'
    },

    social: {
      number: '03 — SOCIAL MEDIA DESIGN',
      title: 'Social Media Design',
      description:
        'Selected social media campaigns and digital content designs.'
    },

    web: {
      number: '04 — WEB · UI/UX DESIGN',
      title: 'Web · UI/UX Design',
      description:
        'Selected website, interface and user experience design projects.'
    },

    video: {
      number: '05 — VIDEO · MOTION GRAPHIC',
      title: 'Video · Motion Graphic',
      description:
        'Selected video editing, reels and motion graphic projects.'
    },

    print: {
      number: '06 — PRINTING / PUBLISHING MEDIA',
      title: 'Printing / Publishing Media',
      description:
        'Selected print, publication, brochure and editorial design projects.'
    }

  };


  /* ---------------------------------------------------------------
     INITIAL STATE
  --------------------------------------------------------------- */

  worksContainer.classList.add('hidden');

  workGrids.forEach(grid => {
    grid.classList.add('hidden');
  });

  if (backButton) {
    backButton.classList.add('hidden');
  }


  /* ---------------------------------------------------------------
     PREVIEW MODAL
  --------------------------------------------------------------- */

  let previewModal =
    document.getElementById('portfolioPreviewModal');


  if (!previewModal) {

    previewModal =
      document.createElement('div');

    previewModal.id =
      'portfolioPreviewModal';

    previewModal.className =
      'fixed inset-0 z-[9999] hidden items-center justify-center p-4 bg-black/90';


    previewModal.innerHTML = `

      <div
        class="relative w-full max-w-6xl max-h-[92vh]
               overflow-hidden rounded-2xl
               bg-[#101010] border border-white/10
               shadow-2xl"
      >

        <button
          type="button"
          id="portfolioPreviewClose"
          class="absolute top-4 right-4 z-20
                 w-11 h-11 rounded-full
                 flex items-center justify-center
                 bg-black/70 text-white
                 border border-white/20
                 hover:bg-white hover:text-black
                 transition"
          aria-label="Close Preview"
        >
          <i class="fas fa-times"></i>
        </button>


        <div
          class="max-h-[72vh] overflow-auto
                 flex items-center justify-center
                 bg-black"
        >

          <img
            id="portfolioPreviewImage"
            src=""
            alt="Portfolio Preview"
            class="max-w-full max-h-[72vh] object-contain"
          >

        </div>


        <div class="p-6 md:p-8">

          <span
            id="portfolioPreviewCategory"
            class="text-xs tracking-[0.2em]
                   uppercase opacity-60"
          ></span>

          <h3
            id="portfolioPreviewTitle"
            class="text-2xl md:text-3xl
                   font-semibold mt-2"
          ></h3>

          <p
            id="portfolioPreviewDescription"
            class="mt-3 opacity-70 max-w-3xl"
          ></p>

        </div>

      </div>

    `;

    document.body.appendChild(previewModal);
  }


  const previewImage =
    document.getElementById('portfolioPreviewImage');

  const previewCategory =
    document.getElementById('portfolioPreviewCategory');

  const previewTitle =
    document.getElementById('portfolioPreviewTitle');

  const previewDescription =
    document.getElementById('portfolioPreviewDescription');

  const previewClose =
    document.getElementById('portfolioPreviewClose');


  /* ---------------------------------------------------------------
     OPEN PREVIEW
  --------------------------------------------------------------- */

  function openPreview(card) {

    if (!card) return;

    const image =
      card.querySelector('.portfolio-project-image img');

    const title =
      card.querySelector('.portfolio-project-info h4');

    const category =
      card.querySelector('.portfolio-project-info span');

    const description =
      card.querySelector('.portfolio-project-info p');


    if (previewImage && image) {
      previewImage.src =
        image.src;

      previewImage.alt =
        image.alt || 'Portfolio Preview';
    }


    if (previewCategory && category) {
      previewCategory.textContent =
        category.textContent.trim();
    }


    if (previewTitle && title) {
      previewTitle.textContent =
        title.textContent.trim();
    }


    if (previewDescription && description) {
      previewDescription.textContent =
        description.textContent.trim();
    }


    previewModal.classList.remove('hidden');
    previewModal.classList.add('flex');

    document.body.style.overflow =
      'hidden';
  }


  /* ---------------------------------------------------------------
     CLOSE PREVIEW
  --------------------------------------------------------------- */

  function closePreview() {

    previewModal.classList.add('hidden');
    previewModal.classList.remove('flex');

    document.body.style.overflow =
      '';

    if (previewImage) {
      previewImage.src = '';
    }
  }


  if (previewClose) {

    previewClose.addEventListener(
      'click',
      closePreview
    );

  }


  previewModal.addEventListener(
    'click',
    event => {

      if (event.target === previewModal) {
        closePreview();
      }

    }
  );


  document.addEventListener(
    'keydown',
    event => {

      if (
        event.key === 'Escape' &&
        !previewModal.classList.contains('hidden')
      ) {
        closePreview();
      }

    }
  );


  /* ---------------------------------------------------------------
     ADD PREVIEW BUTTON TO EVERY PROJECT
  --------------------------------------------------------------- */

  const projectCards =
    document.querySelectorAll(
      '.portfolio-project-card'
    );


  projectCards.forEach(card => {

    const projectInfo =
      card.querySelector('.portfolio-project-info');

    if (!projectInfo) return;


    /* Prevent duplicate buttons */

    if (
      projectInfo.querySelector(
        '.portfolio-preview-btn'
      )
    ) {
      return;
    }


    const previewButton =
      document.createElement('button');

    previewButton.type =
      'button';

    previewButton.className =
      'portfolio-preview-btn mt-4';

    previewButton.innerHTML =
      `
        PREVIEW
        <i class="fas fa-expand-alt"></i>
      `;


    previewButton.addEventListener(
      'click',
      event => {

        event.preventDefault();
        event.stopPropagation();

        openPreview(card);

      }
    );


    projectInfo.appendChild(
      previewButton
    );

  });


  /* ---------------------------------------------------------------
     SHOW SELECTED CATEGORY
  --------------------------------------------------------------- */

  function showCategory(category) {

    const info =
      categoryInfo[category];


    /* Hide category cards */

    categoryContainer.classList.add(
      'hidden'
    );


    /* Show works area */

    worksContainer.classList.remove(
      'hidden'
    );


    /* Show back button */

    if (backButton) {
      backButton.classList.remove(
        'hidden'
      );
    }


    /* Hide every work grid */

    workGrids.forEach(grid => {

      grid.classList.add(
        'hidden'
      );

    });


    /* Find selected work grid */

    const selectedGrid =
      document.querySelector(
        `.portfolio-work-grid[data-work-category="${category}"]`
      );


    if (!selectedGrid) {
      return;
    }


    /* Show selected grid */

    selectedGrid.classList.remove(
      'hidden'
    );


    /* Update header */

    if (info) {

      if (workNumber) {
        workNumber.textContent =
          info.number;
      }

      if (workTitle) {
        workTitle.textContent =
          info.title;
      }

      if (workDescription) {
        workDescription.textContent =
          info.description;
      }

    }


    /* Count works */

    const cards =
      selectedGrid.querySelectorAll(
        '.portfolio-project-card'
      );


    if (portfolioCount) {

      portfolioCount.textContent =
        `${cards.length} Selected Works`;

    }


    /* Scroll to works */

    setTimeout(() => {

      worksContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }, 100);

  }


  /* ---------------------------------------------------------------
     BACK TO PORTFOLIO
  --------------------------------------------------------------- */

  function showCategories() {

    workGrids.forEach(grid => {

      grid.classList.add(
        'hidden'
      );

    });


    worksContainer.classList.add(
      'hidden'
    );


    categoryContainer.classList.remove(
      'hidden'
    );


    if (backButton) {

      backButton.classList.add(
        'hidden'
      );

    }


    setTimeout(() => {

      categoryContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }, 100);

  }


  /* ---------------------------------------------------------------
     CATEGORY BUTTON EVENTS
  --------------------------------------------------------------- */

  categoryButtons.forEach(button => {

    button.addEventListener(
      'click',
      event => {

        event.preventDefault();
        event.stopPropagation();


        const category =
          button.getAttribute(
            'data-open-category'
          );


        if (!category) {
          return;
        }


        showCategory(
          category
        );

      }
    );

  });


  /* ---------------------------------------------------------------
     BACK BUTTON EVENT
  --------------------------------------------------------------- */

  if (backButton) {

    backButton.addEventListener(
      'click',
      event => {

        event.preventDefault();

        showCategories();

      }
    );

  }

}
```



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
