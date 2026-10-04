/* =========================================================
   ANIL SHRESTHA — PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       INITIALIZE ALL FUNCTIONS
    ===================================================== */

    initMobileMenu();
    initPortfolioFilter();
    initContactForm();
    initModalHandlers();

});


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const mobileMenuButton =
        document.getElementById("mobileMenuBtn");

    const mobileNav =
        document.getElementById("mobileNav");

    if (!mobileMenuButton || !mobileNav) return;

    mobileMenuButton.addEventListener("click", () => {

        mobileNav.classList.toggle("hidden");

        const isOpen =
            !mobileNav.classList.contains("hidden");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* Close menu after clicking a navigation link */

    mobileNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.add("hidden");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   PORTFOLIO FILTER + FULL PREVIEW GALLERY
========================================================= */

function initPortfolioFilter() {

    const categories =
        document.getElementById("portfolioCategories");

    const works =
        document.getElementById("portfolioWorks");

    const viewButtons =
        document.querySelectorAll("[data-open-category]");

    const workGrids =
        document.querySelectorAll(".portfolio-work-grid");

    const backButton =
        document.getElementById("portfolioBackBtn");

    const workNumber =
        document.getElementById("portfolioWorkNumber");

    const workTitle =
        document.getElementById("portfolioWorkTitle");

    const workDescription =
        document.getElementById("portfolioWorkDescription");

    const workCount =
        document.getElementById("portfolioCount");


    if (
        !categories ||
        !works ||
        !viewButtons.length ||
        !workGrids.length
    ) {
        return;
    }


    /* =====================================================
       CATEGORY INFORMATION
    ===================================================== */

    const categoryInfo = {

        graphic: {
            number: "01 — GRAPHIC DESIGN",
            title: "Graphic Design",
            description:
                "Selected graphic design projects and creative visual work."
        },

        branding: {
            number: "02 — BRAND & IDENTITY",
            title: "Brand & Identity",
            description:
                "Selected branding, logo and visual identity projects."
        },

        social: {
            number: "03 — SOCIAL MEDIA DESIGN",
            title: "Social Media Design",
            description:
                "Selected social media campaigns and digital content."
        },

        web: {
            number: "04 — WEB · UI/UX",
            title: "Web · UI/UX Design",
            description:
                "Selected website, interface and digital experience projects."
        },

        video: {
            number: "05 — VIDEO · MOTION GRAPHIC",
            title: "Video · Motion Graphic",
            description:
                "Selected video editing, motion graphics and promotional work."
        },

        print: {
            number: "06 — PRINTING / PUBLISHING",
            title: "Printing / Publishing Media",
            description:
                "Selected print, publication and editorial design projects."
        }

    };


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    works.classList.add("hidden");

    workGrids.forEach(grid => {
        grid.classList.add("hidden");
    });


    /* =====================================================
       CREATE FULL PREVIEW MODAL
    ===================================================== */

    let previewModal =
        document.getElementById("portfolioPreviewModal");


    if (!previewModal) {

        previewModal =
            document.createElement("div");

        previewModal.id =
            "portfolioPreviewModal";

        previewModal.innerHTML = `

            <div class="portfolio-preview-backdrop"></div>

            <div class="portfolio-preview-container">

                <!-- CLOSE -->
                <button
                    type="button"
                    class="portfolio-preview-close"
                    id="portfolioPreviewClose"
                    aria-label="Close preview"
                >
                    <i class="fas fa-times"></i>
                </button>


                <!-- TOP BAR -->
                <div class="portfolio-preview-topbar">

                    <div class="portfolio-preview-category">
                        <span id="previewCategory">
                            GRAPHIC DESIGN
                        </span>
                    </div>

                    <div
                        class="portfolio-preview-counter"
                        id="previewCounter"
                    >
                        1 / 5
                    </div>

                </div>


                <!-- IMAGE AREA -->
                <div class="portfolio-preview-stage">

                    <button
                        type="button"
                        class="portfolio-preview-nav portfolio-preview-prev"
                        id="portfolioPreviewPrev"
                        aria-label="Previous work"
                    >
                        <i class="fas fa-chevron-left"></i>
                    </button>


                    <div class="portfolio-preview-frame">

                        <img
                            id="portfolioPreviewImage"
                            src=""
                            alt="Portfolio preview"
                        >

                    </div>


                    <button
                        type="button"
                        class="portfolio-preview-nav portfolio-preview-next"
                        id="portfolioPreviewNext"
                        aria-label="Next work"
                    >
                        <i class="fas fa-chevron-right"></i>
                    </button>

                </div>


                <!-- INFORMATION -->
                <div class="portfolio-preview-info">

                    <div>

                        <span
                            id="previewProjectCategory"
                            class="portfolio-preview-label"
                        >
                            GRAPHIC DESIGN
                        </span>

                        <h3 id="previewProjectTitle">
                            Creative Poster Design
                        </h3>

                        <p id="previewProjectDescription">
                            Promotional poster concept.
                        </p>

                    </div>

                </div>


                <!-- BOTTOM CONTROLS -->
                <div class="portfolio-preview-controls">

                    <button
                        type="button"
                        id="portfolioPreviewSlideshow"
                        class="portfolio-preview-slideshow"
                    >
                        <i class="fas fa-play"></i>
                        <span>SLIDESHOW</span>
                    </button>


                    <div class="portfolio-preview-hint">
                        <span>
                            <i class="fas fa-keyboard"></i>
                            Use ← → to navigate
                        </span>
                    </div>

                </div>

            </div>

        `;

        document.body.appendChild(previewModal);

    }


    /* =====================================================
       PREVIEW ELEMENTS
    ===================================================== */

    const previewImage =
        document.getElementById("portfolioPreviewImage");

    const previewCategory =
        document.getElementById("previewCategory");

    const previewCounter =
        document.getElementById("previewCounter");

    const previewProjectCategory =
        document.getElementById("previewProjectCategory");

    const previewProjectTitle =
        document.getElementById("previewProjectTitle");

    const previewProjectDescription =
        document.getElementById("previewProjectDescription");

    const previewClose =
        document.getElementById("portfolioPreviewClose");

    const previewPrev =
        document.getElementById("portfolioPreviewPrev");

    const previewNext =
        document.getElementById("portfolioPreviewNext");

    const previewSlideshow =
        document.getElementById("portfolioPreviewSlideshow");

    const previewBackdrop =
        previewModal.querySelector(
            ".portfolio-preview-backdrop"
        );


    /* =====================================================
       GALLERY VARIABLES
    ===================================================== */

    let currentProjects = [];

    let currentIndex = 0;

    let slideshowTimer = null;

    let slideshowRunning = false;


    /* =====================================================
       GET PROJECTS FROM CURRENT CATEGORY
    ===================================================== */

    function getProjects(category) {

        const grid =
            document.querySelector(
                `.portfolio-work-grid[data-work-category="${category}"]`
            );

        if (!grid) return [];

        return Array.from(
            grid.querySelectorAll(".portfolio-project-card")
        );

    }


    /* =====================================================
       READ PROJECT DATA
    ===================================================== */

    function getProjectData(card) {

        const image =
            card.querySelector(
                ".portfolio-project-image img"
            );

        const title =
            card.querySelector(
                ".portfolio-project-info h4"
            );

        const category =
            card.querySelector(
                ".portfolio-project-info span"
            );

        const description =
            card.querySelector(
                ".portfolio-project-info p"
            );


        return {

            image:
                image ? image.src : "",

            alt:
                image ? image.alt : "Portfolio preview",

            title:
                title ? title.textContent.trim() : "",

            category:
                category ? category.textContent.trim() : "",

            description:
                description
                    ? description.textContent.trim()
                    : ""

        };

    }


    /* =====================================================
       UPDATE PREVIEW
    ===================================================== */

    function updatePreview() {

        if (
            !currentProjects.length ||
            !previewImage
        ) {
            return;
        }


        const project =
            getProjectData(
                currentProjects[currentIndex]
            );


        /* Image */

        previewImage.classList.remove(
            "portfolio-preview-image-visible"
        );


        setTimeout(() => {

            previewImage.src =
                project.image;

            previewImage.alt =
                project.alt;

            previewImage.classList.add(
                "portfolio-preview-image-visible"
            );

        }, 80);


        /* Category */

        previewCategory.textContent =
            project.category;

        previewProjectCategory.textContent =
            project.category;


        /* Title */

        previewProjectTitle.textContent =
            project.title;


        /* Description */

        previewProjectDescription.textContent =
            project.description;


        /* Counter */

        previewCounter.textContent =
            `${currentIndex + 1} / ${currentProjects.length}`;

    }


    /* =====================================================
       OPEN PREVIEW
    ===================================================== */

    function openPreview(category, index) {

        currentProjects =
            getProjects(category);

        if (!currentProjects.length) return;

        currentIndex =
            Math.max(
                0,
                Math.min(
                    index,
                    currentProjects.length - 1
                )
            );


        updatePreview();


        /* Open modal */

        previewModal.classList.add(
            "is-active"
        );


        document.body.classList.add(
            "portfolio-preview-open"
        );


        /* Stop slideshow when opening */

        stopSlideshow();


        /* Prevent background scrolling */

        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       CLOSE PREVIEW
    ===================================================== */

    function closePreview() {

        stopSlideshow();

        previewModal.classList.remove(
            "is-active"
        );

        document.body.classList.remove(
            "portfolio-preview-open"
        );

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       NEXT PROJECT
    ===================================================== */

    function showNext() {

        if (!currentProjects.length) return;

        currentIndex++;

        if (
            currentIndex >=
            currentProjects.length
        ) {
            currentIndex = 0;
        }

        updatePreview();

    }


    /* =====================================================
       PREVIOUS PROJECT
    ===================================================== */

    function showPrevious() {

        if (!currentProjects.length) return;

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                currentProjects.length - 1;

        }

        updatePreview();

    }


    /* =====================================================
       SLIDESHOW
    ===================================================== */

    function startSlideshow() {

        if (slideshowRunning) return;

        slideshowRunning = true;


        previewSlideshow.innerHTML = `
            <i class="fas fa-pause"></i>
            <span>PAUSE</span>
        `;


        slideshowTimer =
            setInterval(() => {

                showNext();

            }, 4000);

    }


    function stopSlideshow() {

        slideshowRunning = false;


        if (slideshowTimer) {

            clearInterval(
                slideshowTimer
            );

            slideshowTimer = null;

        }


        if (previewSlideshow) {

            previewSlideshow.innerHTML = `
                <i class="fas fa-play"></i>
                <span>SLIDESHOW</span>
            `;

        }

    }


    function toggleSlideshow() {

        if (slideshowRunning) {

            stopSlideshow();

        } else {

            startSlideshow();

        }

    }


    /* =====================================================
       ADD PREVIEW BUTTON TO EVERY PROJECT
    ===================================================== */

    workGrids.forEach(grid => {

        const category =
            grid.dataset.workCategory;

        const cards =
            grid.querySelectorAll(
                ".portfolio-project-card"
            );


        cards.forEach((card, index) => {

            let previewButton =
                card.querySelector(
                    ".portfolio-project-preview-btn"
                );


            if (!previewButton) {

                previewButton =
                    document.createElement("button");

                previewButton.type =
                    "button";

                previewButton.className =
                    "portfolio-project-preview-btn";

                previewButton.innerHTML = `
                    <i class="fas fa-expand"></i>
                    PREVIEW
                `;

                card.appendChild(
                    previewButton
                );

            }


            previewButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    openPreview(
                        category,
                        index
                    );

                }
            );


            /* Also allow clicking image */

            const image =
                card.querySelector(
                    ".portfolio-project-image"
                );


            if (image) {

                image.style.cursor =
                    "pointer";


                image.addEventListener(
                    "click",
                    () => {

                        openPreview(
                            category,
                            index
                        );

                    }
                );

            }

        });

    });


    /* =====================================================
       CATEGORY SELECTION
    ===================================================== */

    function showCategory(category) {

        const info =
            categoryInfo[category];

        if (!info) return;


        /* Hide category cards */

        categories.classList.add(
            "hidden"
        );


        /* Show work area */

        works.classList.remove(
            "hidden"
        );


        /* Hide all work grids */

        workGrids.forEach(grid => {

            grid.classList.add(
                "hidden"
            );

        });


        /* Show selected category */

        const selectedGrid =
            document.querySelector(
                `.portfolio-work-grid[data-work-category="${category}"]`
            );


        if (selectedGrid) {

            selectedGrid.classList.remove(
                "hidden"
            );

        }


        /* Update heading */

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


        /* Update count */

        const projectCount =
            selectedGrid
                ? selectedGrid.querySelectorAll(
                    ".portfolio-project-card"
                ).length
                : 0;


        if (workCount) {

            workCount.textContent =
                `${projectCount} Selected Works`;

        }


        /* Scroll to work section */

        setTimeout(() => {

            works.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }


    /* =====================================================
       BACK TO PORTFOLIO
    ===================================================== */

    function showCategories() {

        stopSlideshow();


        workGrids.forEach(grid => {

            grid.classList.add(
                "hidden"
            );

        });


        works.classList.add(
            "hidden"
        );


        categories.classList.remove(
            "hidden"
        );


        setTimeout(() => {

            categories.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }


    /* =====================================================
       CATEGORY BUTTON EVENTS
    ===================================================== */

    viewButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const category =
                    button.dataset.openCategory;

                if (category) {

                    showCategory(
                        category
                    );

                }

            }
        );

    });


    /* =====================================================
       BACK BUTTON
    ===================================================== */

    if (backButton) {

        backButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showCategories();

            }
        );

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (previewPrev) {

        previewPrev.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showPrevious();

            }
        );

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (previewNext) {

        previewNext.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showNext();

            }
        );

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (previewClose) {

        previewClose.addEventListener(
            "click",
            event => {

                event.preventDefault();

                closePreview();

            }
        );

    }


    /* =====================================================
       CLICK BACKDROP TO CLOSE
    ===================================================== */

    if (previewBackdrop) {

        previewBackdrop.addEventListener(
            "click",
            () => {

                closePreview();

            }
        );

    }


    /* =====================================================
       SLIDESHOW BUTTON
    ===================================================== */

    if (previewSlideshow) {

        previewSlideshow.addEventListener(
            "click",
            event => {

                event.preventDefault();

                toggleSlideshow();

            }
        );

    }


    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !previewModal.classList.contains(
                    "is-active"
                )
            ) {
                return;
            }


            if (event.key === "Escape") {

                closePreview();

            }


            if (
                event.key === "ArrowRight"
            ) {

                showNext();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                showPrevious();

            }


            if (
                event.code === "Space"
            ) {

                event.preventDefault();

                toggleSlideshow();

            }

        }
    );


    /* =====================================================
       TOUCH / SWIPE SUPPORT
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    const stage =
        previewModal.querySelector(
            ".portfolio-preview-stage"
        );


    if (stage) {

        stage.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        stage.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const swipeDistance =
                    touchEndX - touchStartX;


                if (
                    Math.abs(swipeDistance) < 50
                ) {
                    return;
                }


                if (swipeDistance < 0) {

                    showNext();

                } else {

                    showPrevious();

                }

            },
            { passive: true }
        );

    }

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const contactForm =
        document.querySelector(
            "#contactForm"
        );

    if (!contactForm) return;


    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const button =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            if (!button) return;


            const originalText =
                button.innerHTML;


            button.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                SENDING...
            `;


            button.disabled = true;


            setTimeout(() => {

                button.innerHTML = `
                    <i class="fas fa-check"></i>
                    MESSAGE SENT
                `;


                setTimeout(() => {

                    button.innerHTML =
                        originalText;

                    button.disabled =
                        false;

                    contactForm.reset();

                }, 1800);


            }, 1200);

        }
    );

}


/* =========================================================
   PACKAGE MODAL
========================================================= */

function initModalHandlers() {

    const modal =
        document.getElementById(
            "packageModal"
        );

    if (!modal) return;


    const openButtons =
        document.querySelectorAll(
            "[data-package]"
        );


    const closeButtons =
        modal.querySelectorAll(
            "[data-close-modal]"
        );


    function openModal() {

        modal.classList.remove(
            "hidden"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeModal() {

        modal.classList.add(
            "hidden"
        );

        document.body.style.overflow =
            "";

    }


    openButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openModal();

            }
        );

    });


    closeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal();

            }
        );

    });


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                !modal.classList.contains(
                    "hidden"
                )
            ) {

                closeModal();

            }

        }
    );

}
