/* =========================================================
   ANIL SHRESTHA — PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const preloader = document.getElementById("preloader");
    const siteHeader = document.getElementById("siteHeader");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton") ||
        document.getElementById("mobileMenuBtn");

    const mobileNav =
        document.getElementById("mobileNav");


    /* =====================================================
       PRELOADER
    ===================================================== */

    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.classList.add("hidden");

                setTimeout(() => {
                    preloader.style.display = "none";
                }, 600);

            }, 500);
        });
    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function handleHeaderScroll() {

        if (!siteHeader) return;

        if (window.scrollY > 40) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenuButton && mobileNav) {

        mobileMenuButton.addEventListener("click", () => {

            mobileNav.classList.toggle("active");

            mobileMenuButton.classList.toggle("active");

        });


        mobileNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");
                mobileMenuButton.classList.remove("active");

            });

        });
    }


    /* =====================================================
       PORTFOLIO CATEGORY FILTER
    ===================================================== */

    const categoryCards =
        document.querySelectorAll("[data-category-card]");

    const openCategoryButtons =
        document.querySelectorAll("[data-open-category]");

    const portfolioCategories =
        document.getElementById("portfolioCategories");

    const portfolioWorks =
        document.getElementById("portfolioWorks");

    const backButton =
        document.getElementById("portfolioBackBtn");

    const workNumber =
        document.getElementById("portfolioWorkNumber");

    const workTitle =
        document.getElementById("portfolioWorkTitle");

    const workDescription =
        document.getElementById("portfolioWorkDescription");

    const portfolioCount =
        document.getElementById("portfolioCount");

    const workGrids =
        document.querySelectorAll("[data-work-category]");


    /* =====================================================
       PORTFOLIO DATA
    ===================================================== */

    const portfolioData = {

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
                "Selected branding, identity and visual communication projects."
        },

        social: {
            number: "03 — SOCIAL MEDIA DESIGN",
            title: "Social Media Design",
            description:
                "Selected social media campaigns and digital content designs."
        },

        web: {
            number: "04 — WEB · UI/UX",
            title: "Web · UI/UX Design",
            description:
                "Selected website, interface and user experience design projects."
        },

        video: {
            number: "05 — VIDEO · MOTION GRAPHIC",
            title: "Video · Motion Graphic",
            description:
                "Selected video editing, reels and motion graphic projects."
        },

        print: {
            number: "06 — PRINTING / PUBLISHING",
            title: "Printing / Publishing Media",
            description:
                "Selected print, editorial and publishing design projects."
        }

    };


    /* =====================================================
       OPEN PORTFOLIO CATEGORY
    ===================================================== */

    function openPortfolioCategory(category) {

        if (!portfolioData[category]) return;

        const data = portfolioData[category];

        if (portfolioCategories) {
            portfolioCategories.classList.add("hidden");
        }

        if (portfolioWorks) {
            portfolioWorks.classList.remove("hidden");
        }

        if (workNumber) {
            workNumber.textContent = data.number;
        }

        if (workTitle) {
            workTitle.textContent = data.title;
        }

        if (workDescription) {
            workDescription.textContent = data.description;
        }


        /* Show selected work grid */

        workGrids.forEach(grid => {

            if (grid.dataset.workCategory === category) {
                grid.classList.remove("hidden");

                const total =
                    grid.querySelectorAll(
                        ".portfolio-project-card"
                    ).length;

                if (portfolioCount) {
                    portfolioCount.textContent =
                        `${total} Selected Works`;
                }

            } else {
                grid.classList.add("hidden");
            }

        });


        /* Scroll to works */

        setTimeout(() => {

            if (portfolioWorks) {

                portfolioWorks.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 50);
    }


    /* =====================================================
       CATEGORY CLICK
    ===================================================== */

    openCategoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.openCategory;

            openPortfolioCategory(category);

        });

    });


    categoryCards.forEach(card => {

        card.addEventListener("click", event => {

            if (event.target.closest("button")) return;

            const category =
                card.dataset.categoryCard;

            openPortfolioCategory(category);

        });

    });


    /* =====================================================
       BACK TO PORTFOLIO
    ===================================================== */

    if (backButton) {

        backButton.addEventListener("click", () => {

            if (portfolioWorks) {
                portfolioWorks.classList.add("hidden");
            }

            if (portfolioCategories) {
                portfolioCategories.classList.remove("hidden");
            }

            window.scrollTo({
                top: portfolioCategories
                    ? portfolioCategories.offsetTop - 100
                    : 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       PORTFOLIO IMAGE PREVIEW MODAL
    ===================================================== */

    let previewModal = null;
    let previewImage = null;
    let previewFrame = null;

    let previewImages = [];
    let currentPreviewIndex = 0;

    let slideshowTimer = null;
    let slideshowPlaying = false;


    /* =====================================================
       CREATE PREVIEW MODAL
    ===================================================== */

    function createPreviewModal() {

        if (document.getElementById("portfolioPreviewModal")) {
            return;
        }

        previewModal = document.createElement("div");

        previewModal.id = "portfolioPreviewModal";

        previewModal.innerHTML = `

            <div class="portfolio-preview-backdrop"></div>

            <div class="portfolio-preview-container">

                <button
                    type="button"
                    class="portfolio-preview-close"
                    aria-label="Close preview"
                >
                    ×
                </button>

                <button
                    type="button"
                    class="portfolio-preview-prev"
                    aria-label="Previous image"
                >
                    &lt;
                </button>

                <div class="portfolio-preview-frame">

                    <img
                        class="portfolio-preview-image"
                        src=""
                        alt="Portfolio preview"
                    >

                </div>

                <button
                    type="button"
                    class="portfolio-preview-next"
                    aria-label="Next image"
                >
                    &gt;
                </button>

            </div>
        `;

        document.body.appendChild(previewModal);


        /* Store elements */

        previewImage =
            previewModal.querySelector(
                ".portfolio-preview-image"
            );

        previewFrame =
            previewModal.querySelector(
                ".portfolio-preview-frame"
            );


        const closeButton =
            previewModal.querySelector(
                ".portfolio-preview-close"
            );

        const previousButton =
            previewModal.querySelector(
                ".portfolio-preview-prev"
            );

        const nextButton =
            previewModal.querySelector(
                ".portfolio-preview-next"
            );

        const backdrop =
            previewModal.querySelector(
                ".portfolio-preview-backdrop"
            );


        /* =================================================
           CLOSE
        ================================================= */

        closeButton.addEventListener("click", closePreview);

        backdrop.addEventListener("click", closePreview);


        /* =================================================
           PREVIOUS
        ================================================= */

        previousButton.addEventListener("click", event => {

            event.stopPropagation();

            showPreviousImage();

        });


        /* =================================================
           NEXT
        ================================================= */

        nextButton.addEventListener("click", event => {

            event.stopPropagation();

            showNextImage();

        });


        /* =================================================
           IMAGE CLICK
           Toggle slideshow
        ================================================= */

        previewFrame.addEventListener("click", event => {

            event.stopPropagation();

            toggleSlideshow();

        });


        /* =================================================
           PREVENT CONTAINER CLICK FROM CLOSING
        ================================================= */

        const container =
            previewModal.querySelector(
                ".portfolio-preview-container"
            );

        container.addEventListener("click", event => {
            event.stopPropagation();
        });
    }


    /* =====================================================
       COLLECT IMAGES FROM CURRENT CATEGORY
    ===================================================== */

    function collectPreviewImages(clickedImage) {

        const currentGrid =
            clickedImage.closest(
                ".portfolio-work-grid"
            );

        if (!currentGrid) return [];

        const images =
            Array.from(
                currentGrid.querySelectorAll(
                    ".portfolio-project-image img"
                )
            );

        return images.map(img => ({
            src: img.src,
            alt: img.alt || "Portfolio preview"
        }));
    }


    /* =====================================================
       OPEN PREVIEW
    ===================================================== */

    function openPreview(clickedImage) {

        createPreviewModal();

        previewImages =
            collectPreviewImages(clickedImage);

        if (!previewImages.length) return;

        currentPreviewIndex =
            previewImages.findIndex(
                item => item.src === clickedImage.src
            );

        if (currentPreviewIndex < 0) {
            currentPreviewIndex = 0;
        }


        updatePreviewImage();


        previewModal.classList.add("active");

        document.body.classList.add(
            "portfolio-preview-open"
        );


        /* Start automatic slideshow */

        startSlideshow();
    }


    /* =====================================================
       UPDATE IMAGE
    ===================================================== */

    function updatePreviewImage() {

        if (!previewImage || !previewImages.length) {
            return;
        }

        const current =
            previewImages[currentPreviewIndex];

        previewImage.src = current.src;
        previewImage.alt = current.alt;
    }


    /* =====================================================
       NEXT IMAGE
    ===================================================== */

    function showNextImage() {

        if (!previewImages.length) return;

        currentPreviewIndex =
            (currentPreviewIndex + 1) %
            previewImages.length;

        updatePreviewImage();
    }


    /* =====================================================
       PREVIOUS IMAGE
    ===================================================== */

    function showPreviousImage() {

        if (!previewImages.length) return;

        currentPreviewIndex =
            (currentPreviewIndex - 1 +
                previewImages.length) %
            previewImages.length;

        updatePreviewImage();
    }


    /* =====================================================
       START SLIDESHOW
    ===================================================== */

    function startSlideshow() {

        stopSlideshow();

        slideshowPlaying = true;

        slideshowTimer =
            setInterval(() => {

                showNextImage();

            }, 4000);
    }


    /* =====================================================
       STOP SLIDESHOW
    ===================================================== */

    function stopSlideshow() {

        if (slideshowTimer) {

            clearInterval(slideshowTimer);

            slideshowTimer = null;
        }

        slideshowPlaying = false;
    }


    /* =====================================================
       TOGGLE SLIDESHOW
    ===================================================== */

    function toggleSlideshow() {

        if (slideshowPlaying) {

            stopSlideshow();

        } else {

            startSlideshow();

        }
    }


    /* =====================================================
       CLOSE PREVIEW
    ===================================================== */

    function closePreview() {

        if (!previewModal) return;

        stopSlideshow();

        previewModal.classList.remove("active");

        document.body.classList.remove(
            "portfolio-preview-open"
        );
    }


    /* =====================================================
       IMAGE CLICK EVENTS
    ===================================================== */

    function initPortfolioPreview() {

        const projectImages =
            document.querySelectorAll(
                ".portfolio-project-image"
            );

        projectImages.forEach(imageContainer => {

            imageContainer.style.cursor = "pointer";

            imageContainer.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    const image =
                        imageContainer.querySelector("img");

                    if (!image) return;

                    openPreview(image);
                }
            );

        });
    }

    initPortfolioPreview();


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            if (!submitButton) return;

            const originalText =
                submitButton.innerHTML;

            submitButton.innerHTML =
                "MESSAGE SENT ✓";

            submitButton.disabled = true;


            setTimeout(() => {

                contactForm.reset();

                submitButton.innerHTML =
                    originalText;

                submitButton.disabled = false;

            }, 2500);

        });
    }


    /* =====================================================
       PACKAGE MODAL
    ===================================================== */

    const packageModal =
        document.getElementById("packageModal");

    const packageButtons =
        document.querySelectorAll(
            "[data-package]"
        );


    if (packageModal) {

        const packageCloseButtons =
            packageModal.querySelectorAll(
                "[data-package-close]"
            );


        packageButtons.forEach(button => {

            button.addEventListener("click", () => {

                const packageName =
                    button.dataset.package;

                const packageInput =
                    packageModal.querySelector(
                        "[data-package-input]"
                    );

                if (packageInput) {
                    packageInput.value =
                        packageName || "";
                }

                packageModal.classList.add("active");

                document.body.classList.add(
                    "modal-open"
                );

            });

        });


        packageCloseButtons.forEach(button => {

            button.addEventListener("click", () => {

                packageModal.classList.remove("active");

                document.body.classList.remove(
                    "modal-open"
                );

            });

        });
    }


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "ANIL SHRESTHA — Portfolio loaded successfully."
    );

});
