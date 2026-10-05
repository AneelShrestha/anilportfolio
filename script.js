/* =========================================================
   ANIL SHRESTHA — PORTFOLIO JAVASCRIPT
   Complete Replacement
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const preloader = document.getElementById("preloader");
    const siteHeader = document.getElementById("siteHeader");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton") ||
        document.querySelector(".mobile-menu-button") ||
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.getElementById("mobileMenu") ||
        document.querySelector(".mobile-menu") ||
        document.querySelector(".nav-menu");

    const navLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    /* =====================================================
       PRELOADER
    ===================================================== */

    const hidePreloader = () => {
        if (!preloader) return;

        preloader.classList.add("loaded");

        setTimeout(() => {
            preloader.style.display = "none";
        }, 700);
    };

    window.addEventListener("load", () => {
        setTimeout(hidePreloader, 500);
    });

    /* Safety fallback */
    setTimeout(hidePreloader, 4000);


    /* =====================================================
       HEADER — SCROLL STATE
    ===================================================== */

    const updateHeader = () => {
        if (!siteHeader) return;

        if (window.scrollY > 40) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenuButton && mobileMenu) {

        mobileMenuButton.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("active");

            mobileMenuButton.classList.toggle(
                "active",
                isOpen
            );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );
        });

        /* Close mobile menu when a link is clicked */

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");
                mobileMenuButton.classList.remove("active");

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );
            });

        });
    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                !targetId.startsWith("#")
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navItems =
        document.querySelectorAll(
            '.site-nav a[href^="#"], .nav-links a[href^="#"]'
        );

    const updateActiveNav = () => {

        if (!sections.length || !navItems.length) {
            return;
        }

        const scrollPosition =
            window.scrollY +
            (siteHeader ? siteHeader.offsetHeight : 80) +
            100;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });
    };

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-up, .fade-in, .section-heading, .skill-card, .software-card, .package-card, .recommendation-card, .experience-item"
        );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       STAGGERED CARD ANIMATION
    ===================================================== */

    const animatedGroups = [
        ".skills-grid",
        ".software-grid",
        ".packages-grid",
        ".recommendations-grid",
        ".work-grid",
        ".experience-list"
    ];

    animatedGroups.forEach(selector => {

        const container =
            document.querySelector(selector);

        if (!container) return;

        const children =
            Array.from(container.children);

        children.forEach((child, index) => {

            child.style.setProperty(
                "--animation-delay",
                `${index * 70}ms`
            );

        });

    });


    /* =====================================================
       WORK / PORTFOLIO PREVIEW
       
       Clicking artwork opens preview directly.
       No visible PREVIEW button required.
       Preview contains artwork only.
       Automatic slideshow starts.
       Mouse click toggles play / pause.
       ===================================================== */

    const workItems = Array.from(
        document.querySelectorAll(
            ".work-card, .project-card, .portfolio-item, [data-preview]"
        )
    );

    let previewImages = [];
    let currentPreviewIndex = 0;
    let previewTimer = null;
    let previewPlaying = false;

    let previewOverlay =
        document.getElementById("previewOverlay");

    let previewImage =
        document.getElementById("previewImage");

    let previewPrev =
        document.getElementById("previewPrev");

    let previewNext =
        document.getElementById("previewNext");

    let previewClose =
        document.getElementById("previewClose");


    /* =====================================================
       CREATE PREVIEW IF HTML DOES NOT EXIST
    ===================================================== */

    if (!previewOverlay) {

        previewOverlay =
            document.createElement("div");

        previewOverlay.id =
            "previewOverlay";

        previewOverlay.className =
            "preview-overlay";

        previewOverlay.innerHTML = `
            <div class="preview-box">

                <button
                    type="button"
                    id="previewClose"
                    class="preview-close"
                    aria-label="Close preview"
                >
                    ×
                </button>

                <button
                    type="button"
                    id="previewPrev"
                    class="preview-control preview-prev"
                    aria-label="Previous"
                >
                    ‹
                </button>

                <div class="preview-image-wrap">
                    <img
                        id="previewImage"
                        class="preview-image"
                        src=""
                        alt=""
                    >
                </div>

                <button
                    type="button"
                    id="previewNext"
                    class="preview-control preview-next"
                    aria-label="Next"
                >
                    ›
                </button>

            </div>
        `;

        document.body.appendChild(
            previewOverlay
        );

        previewImage =
            document.getElementById(
                "previewImage"
            );

        previewPrev =
            document.getElementById(
                "previewPrev"
            );

        previewNext =
            document.getElementById(
                "previewNext"
            );

        previewClose =
            document.getElementById(
                "previewClose"
            );
    }


    /* =====================================================
       COLLECT WORK IMAGES
    ===================================================== */

    workItems.forEach(item => {

        const image =
            item.querySelector("img");

        if (!image) return;

        const source =
            image.currentSrc ||
            image.src ||
            image.getAttribute("src");

        if (!source) return;

        const existing =
            previewImages.find(
                imageItem =>
                    imageItem.src === source
            );

        if (!existing) {

            previewImages.push({
                src: source,
                alt:
                    image.getAttribute("alt") ||
                    "Portfolio artwork"
            });

        }

    });


    /* =====================================================
       PREVIEW FUNCTIONS
    ===================================================== */

    const renderPreview = () => {

        if (
            !previewImage ||
            !previewImages.length
        ) {
            return;
        }

        const item =
            previewImages[
                currentPreviewIndex
            ];

        previewImage.classList.remove(
            "preview-image-show"
        );

        previewImage.src = item.src;
        previewImage.alt = item.alt;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                previewImage.classList.add(
                    "preview-image-show"
                );
            });
        });

    };


    const stopPreviewTimer = () => {

        if (previewTimer) {

            clearInterval(
                previewTimer
            );

            previewTimer = null;
        }

    };


    const startPreviewTimer = () => {

        stopPreviewTimer();

        if (
            !previewPlaying ||
            previewImages.length < 2
        ) {
            return;
        }

        previewTimer =
            setInterval(() => {

                currentPreviewIndex =
                    (
                        currentPreviewIndex + 1
                    ) %
                    previewImages.length;

                renderPreview();

            }, 3500);

    };


    const openPreview = index => {

        if (!previewImages.length) {
            return;
        }

        currentPreviewIndex =
            Math.max(
                0,
                Math.min(
                    index,
                    previewImages.length - 1
                )
            );

        previewPlaying = true;

        renderPreview();

        previewOverlay.classList.add(
            "active"
        );

        document.body.classList.add(
            "preview-open"
        );

        startPreviewTimer();

    };


    const closePreview = () => {

        stopPreviewTimer();

        previewPlaying = false;

        previewOverlay.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "preview-open"
        );

    };


    const nextPreview = () => {

        if (!previewImages.length) return;

        currentPreviewIndex =
            (
                currentPreviewIndex + 1
            ) %
            previewImages.length;

        renderPreview();

        if (previewPlaying) {
            startPreviewTimer();
        }

    };


    const previousPreview = () => {

        if (!previewImages.length) return;

        currentPreviewIndex =
            (
                currentPreviewIndex -
                1 +
                previewImages.length
            ) %
            previewImages.length;

        renderPreview();

        if (previewPlaying) {
            startPreviewTimer();
        }

    };


    /* =====================================================
       OPEN PREVIEW BY CLICKING WORK
    ===================================================== */

    workItems.forEach((item, index) => {

        item.addEventListener(
            "click",
            event => {

                /*
                 * Don't interfere with ordinary links,
                 * buttons or explicit controls.
                 */

                if (
                    event.target.closest("a") &&
                    !event.target.closest("img")
                ) {
                    return;
                }

                event.preventDefault();

                openPreview(index);

            }
        );

        item.style.cursor = "pointer";

    });


    /* =====================================================
       PREVIEW CONTROLS
    ===================================================== */

    if (previewNext) {

        previewNext.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                nextPreview();

            }
        );

    }


    if (previewPrev) {

        previewPrev.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                previousPreview();

            }
        );

    }


    if (previewClose) {

        previewClose.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                closePreview();

            }
        );

    }


    /* =====================================================
       CLICK IMAGE = PLAY / PAUSE
    ===================================================== */

    if (previewImage) {

        previewImage.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                previewPlaying =
                    !previewPlaying;

                if (previewPlaying) {
                    startPreviewTimer();
                } else {
                    stopPreviewTimer();
                }

            }
        );

    }


    /* =====================================================
       CLICK OUTSIDE PREVIEW = CLOSE
    ===================================================== */

    if (previewOverlay) {

        previewOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    previewOverlay
                ) {
                    closePreview();
                }

            }
        );

    }


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !previewOverlay ||
                !previewOverlay.classList.contains(
                    "active"
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
                nextPreview();
            }

            if (
                event.key === "ArrowLeft"
            ) {
                previousPreview();
            }

            if (event.key === " ") {

                event.preventDefault();

                previewPlaying =
                    !previewPlaying;

                if (previewPlaying) {
                    startPreviewTimer();
                } else {
                    stopPreviewTimer();
                }

            }

        }
    );


    /* =====================================================
       PACKAGE BUTTONS
    ===================================================== */

    const packageButtons =
        document.querySelectorAll(
            "[data-package]"
        );

    packageButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const packageName =
                    button.getAttribute(
                        "data-package"
                    );

                const contact =
                    document.querySelector(
                        "#contact"
                    );

                if (!contact) return;

                const messageField =
                    document.querySelector(
                        "#packageMessage"
                    );

                if (messageField) {

                    messageField.value =
                        `Hello Anil, I am interested in the ${packageName} package.`;

                }

                contact.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector(
            "#contactForm"
        );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                /*
                 * Prevent accidental page reload.
                 * If the form later receives a backend
                 * action, this section can be replaced.
                 */

                const action =
                    contactForm.getAttribute(
                        "action"
                    );

                if (!action) {

                    event.preventDefault();

                    const name =
                        contactForm.querySelector(
                            '[name="name"]'
                        )?.value.trim();

                    const email =
                        contactForm.querySelector(
                            '[name="email"]'
                        )?.value.trim();

                    const message =
                        contactForm.querySelector(
                            '[name="message"]'
                        )?.value.trim();

                    if (
                        !name ||
                        !email ||
                        !message
                    ) {
                        return;
                    }

                    const subject =
                        encodeURIComponent(
                            `Portfolio Inquiry from ${name}`
                        );

                    const body =
                        encodeURIComponent(
                            message +
                            "\n\nName: " +
                            name +
                            "\nEmail: " +
                            email
                        );

                    window.location.href =
                        `mailto:babal6anil@gmail.com?subject=${subject}&body=${body}`;

                }

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(
            "#backToTop"
        );

    if (backToTop) {

        const updateBackToTop = () => {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        };

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        updateBackToTop();

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       IMAGE LAZY LOADING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            if (
                !image.hasAttribute("loading")
            ) {
                image.setAttribute(
                    "loading",
                    "lazy"
                );
            }

            image.addEventListener(
                "error",
                () => {
                    image.classList.add(
                        "image-error"
                    );
                }
            );

        });


    /* =====================================================
       DISABLE RIGHT CLICK ON PREVIEW IMAGE
       (Keeps preview clean; does not affect the
        rest of the website.)
    ===================================================== */

    if (previewImage) {

        previewImage.addEventListener(
            "contextmenu",
            event => {
                event.preventDefault();
            }
        );

    }


    /* =====================================================
       YEAR — AUTOMATIC COPYRIGHT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "js-ready"
    );

});
