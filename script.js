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


    /* Close mobile menu after navigation */

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
   PORTFOLIO FILTER + IMAGE PREVIEW GALLERY
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
       INITIAL PORTFOLIO STATE
    ===================================================== */

    works.classList.add("hidden");

    workGrids.forEach(grid => {
        grid.classList.add("hidden");
    });


    /* =====================================================
       CREATE CLEAN IMAGE PREVIEW MODAL
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

                <!-- SMALL CLOSE BUTTON -->
                <button
                    type="button"
                    class="portfolio-preview-close"
                    id="portfolioPreviewClose"
                    aria-label="Close preview"
                >
                    <i class="fas fa-times"></i>
                </button>


                <!-- IMAGE STAGE -->
                <div class="portfolio-preview-stage">

                    <!-- SMALL PREVIOUS BUTTON -->
                    <button
                        type="button"
                        class="portfolio-preview-nav portfolio-preview-prev"
                        id="portfolioPreviewPrev"
                        aria-label="Previous work"
                    >
                        <i class="fas fa-chevron-left"></i>
                    </button>


                    <!-- IMAGE -->
                    <div class="portfolio-preview-frame">

                        <img
                            id="portfolioPreviewImage"
                            src=""
                            alt="Portfolio preview"
                        >

                        <!-- PLAY / PAUSE INDICATOR -->
                        <div
                            id="portfolioPreviewStatus"
                            class="portfolio-preview-status"
                        >
                            <i class="fas fa-pause"></i>
                        </div>

                    </div>


                    <!-- SMALL NEXT BUTTON -->
                    <button
                        type="button"
                        class="portfolio-preview-nav portfolio-preview-next"
                        id="portfolioPreviewNext"
                        aria-label="Next work"
                    >
                        <i class="fas fa-chevron-right"></i>
                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(
            previewModal
        );

    }


    /* =====================================================
       PREVIEW ELEMENTS
    ===================================================== */

    const previewImage =
        document.getElementById(
            "portfolioPreviewImage"
        );

    const previewClose =
        document.getElementById(
            "portfolioPreviewClose"
        );

    const previewPrev =
        document.getElementById(
            "portfolioPreviewPrev"
        );

    const previewNext =
        document.getElementById(
            "portfolioPreviewNext"
        );

    const previewBackdrop =
        previewModal.querySelector(
            ".portfolio-preview-backdrop"
        );

    const previewFrame =
        previewModal.querySelector(
            ".portfolio-preview-frame"
        );

    const previewStatus =
        document.getElementById(
            "portfolioPreviewStatus"
        );


    /* =====================================================
       GALLERY VARIABLES
    ===================================================== */

    let currentProjects = [];

    let currentIndex = 0;

    let slideshowTimer = null;

    let slideshowRunning = false;


    /* =====================================================
       GET PROJECTS FROM CATEGORY
    ===================================================== */

    function getProjects(category) {

        const grid =
            document.querySelector(
                `.portfolio-work-grid[data-work-category="${category}"]`
            );

        if (!grid) return [];


        return Array.from(
            grid.querySelectorAll(
                ".portfolio-project-card"
            )
        );

    }


    /* =====================================================
       GET IMAGE DATA
    ===================================================== */

    function getProjectData(card) {

        const image =
            card.querySelector(
                ".portfolio-project-image img"
            );


        return {

            image:
                image ? image.src : "",

            alt:
                image
                    ? image.alt
                    : "Portfolio preview"

        };

    }


    /* =====================================================
       UPDATE PREVIEW IMAGE
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


        /* Fade old image */

        previewImage.classList.remove(
            "portfolio-preview-image-visible"
        );


        setTimeout(() => {

            previewImage.src =
                project.image;

            previewImage.alt =
                project.alt;


            /* Fade new image in */

            previewImage.classList.add(
                "portfolio-preview-image-visible"
            );

        }, 100);

    }


    /* =====================================================
       SHOW PLAY / PAUSE INDICATOR
    ===================================================== */

    function showStatus(icon) {

        if (!previewStatus) return;


        previewStatus.innerHTML =
            `<i class="fas fa-${icon}"></i>`;


        previewStatus.classList.remove(
            "show"
        );


        /* Force animation restart */

        void previewStatus.offsetWidth;


        previewStatus.classList.add(
            "show"
        );


        setTimeout(() => {

            previewStatus.classList.remove(
                "show"
            );

        }, 700);

    }


    /* =====================================================
       OPEN PREVIEW
    ===================================================== */

    function openPreview(category, index) {

        currentProjects =
            getProjects(category);


        if (!currentProjects.length) {
            return;
        }


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


        document.body.style.overflow =
            "hidden";


        /* Automatically start slideshow */

        startSlideshow();

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
       NEXT WORK
    ===================================================== */

    function showNext() {

        if (!currentProjects.length) {
            return;
        }


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
       PREVIOUS WORK
    ===================================================== */

    function showPrevious() {

        if (!currentProjects.length) {
            return;
        }


        currentIndex--;


        if (currentIndex < 0) {

            currentIndex =
                currentProjects.length - 1;

        }


        updatePreview();

    }


    /* =====================================================
       START AUTOMATIC SLIDESHOW
    ===================================================== */

    function startSlideshow() {

        stopSlideshow(false);


        slideshowRunning =
            true;


        slideshowTimer =
            setInterval(() => {

                showNext();

            }, 4000);


        if (previewStatus) {

            previewStatus.innerHTML =
                `<i class="fas fa-pause"></i>`;

        }

    }


    /* =====================================================
       STOP AUTOMATIC SLIDESHOW
    ===================================================== */

    function stopSlideshow(updateStatus = true) {

        if (slideshowTimer) {

            clearInterval(
                slideshowTimer
            );

            slideshowTimer =
                null;

        }


        slideshowRunning =
            false;


        if (
            updateStatus &&
            previewStatus
        ) {

            previewStatus.innerHTML =
                `<i class="fas fa-play"></i>`;

        }

    }


    /* =====================================================
       TOGGLE PLAY / PAUSE
       CLICKING IMAGE
    ===================================================== */

    function toggleSlideshow() {

        if (slideshowRunning) {

            stopSlideshow();

            showStatus("play");

        } else {

            startSlideshow();

            showStatus("pause");

        }

    }


    /* =====================================================
       REMOVE OLD PREVIEW BUTTONS
       IF THEY EXIST
    ===================================================== */

    document
        .querySelectorAll(
            ".portfolio-project-preview-btn"
        )
        .forEach(button => {

            button.remove();

        });


    /* =====================================================
       CLICK IMAGE TO OPEN PREVIEW
    ===================================================== */

    workGrids.forEach(grid => {

        const category =
            grid.dataset.workCategory;


        const cards =
            grid.querySelectorAll(
                ".portfolio-project-card"
            );


        cards.forEach((card, index) => {

            const image =
                card.querySelector(
                    ".portfolio-project-image"
                );


            if (!image) return;


            image.style.cursor =
                "pointer";


            image.addEventListener(
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

        });

    });


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
       BACKDROP CLOSE
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
       IMAGE CLICK = PLAY / PAUSE
    ===================================================== */

    if (previewFrame) {

        previewFrame.addEventListener(
            "click",
            event => {

                /*
                 * Do not toggle when clicking
                 * navigation buttons.
                 */

                if (
                    event.target.closest(
                        ".portfolio-preview-nav"
                    )
                ) {
                    return;
                }


                toggleSlideshow();

            }
        );

    }


    /* =====================================================
       TOUCH SWIPE
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    if (previewFrame) {

        previewFrame.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        previewFrame.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const distance =
                    touchEndX -
                    touchStartX;


                if (
                    Math.abs(distance) < 50
                ) {
                    return;
                }


                if (distance < 0) {

                    showNext();

                } else {

                    showPrevious();

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       CATEGORY SELECTION
    ===================================================== */

    function showCategory(category) {

        const info =
            categoryInfo[category];


        if (!info) {
            return;
        }


        /* Hide category cards */

        categories.classList.add(
            "hidden"
        );


        /* Show work section */

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


        /* Update section information */

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


        /* Count selected works */

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


        /* Scroll to selected work */

        setTimeout(() => {

            works.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }


    /* =====================================================
       BACK TO PORTFOLIO CATEGORIES
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

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const contactForm =
        document.querySelector(
            "#contactForm"
        );


    if (!contactForm) {
        return;
    }


    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const button =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            if (!button) {
                return;
            }


            const originalText =
                button.innerHTML;


            button.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                SENDING...
            `;


            button.disabled =
                true;


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


    if (!modal) {
        return;
    }


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
