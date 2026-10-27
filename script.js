/* =========================================================
   ANIL SHRESTHA — PORTFOLIO JAVASCRIPT
   Complete Replacement
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT REFERENCES
    ===================================================== */

    const preloader = document.getElementById("preloader");
    const siteHeader = document.getElementById("siteHeader");
    const mobileMenuButton = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileNav");
    const navLinks = document.querySelectorAll('a[href^="#"]');


    /* =====================================================
       MOBILE MENU — FIXED
    ===================================================== */

    if (mobileMenuButton && mobileMenu) {

        mobileMenuButton.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.contains("hidden");

            mobileMenu.classList.toggle("hidden", !isOpen);
            mobileMenu.classList.toggle("active", isOpen);
            mobileMenuButton.classList.toggle("active", isOpen);

            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            mobileMenuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            document.body.classList.toggle("menu-open", isOpen);

        });

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("active");
                mobileMenuButton.classList.remove("active");

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                document.body.classList.remove("menu-open");

            });

        });

    }


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
       SMOOTH SCROLL
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                !targetId.startsWith("#")
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = siteHeader
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

    const sections = document.querySelectorAll("section[id]");

    const navItems = document.querySelectorAll(
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

            const sectionTop = section.offsetTop;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener("scroll", updateActiveNav, {
        passive: true
    });

    updateActiveNav();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-up, .fade-in, .section-heading, " +
        ".skill-card, .software-card, .package-card, " +
        ".recommendation-card, .experience-item"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);

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

        const container = document.querySelector(selector);

        if (!container) return;

        Array.from(container.children).forEach((child, index) => {

            child.style.setProperty(
                "--animation-delay",
                `${index * 70}ms`
            );

        });

    });
       /* =====================================================
       PORTFOLIO CATEGORY FILTER
    ===================================================== */

    const portfolioFilters = document.querySelectorAll(
        "[data-filter]"
    );

    const portfolioItems = document.querySelectorAll(
        "[data-category]"
    );

    portfolioFilters.forEach(filterButton => {

        filterButton.addEventListener("click", () => {

            const selectedCategory =
                filterButton.getAttribute("data-filter");

            portfolioFilters.forEach(button => {
                button.classList.remove("active");
            });

            filterButton.classList.add("active");

            portfolioItems.forEach(item => {

                const itemCategory =
                    item.getAttribute("data-category");

                const shouldShow =
                    selectedCategory === "all" ||
                    selectedCategory === itemCategory;

                item.style.display = shouldShow ? "" : "none";

            });

        });

    });


    /* =====================================================
       PORTFOLIO IMAGE PREVIEW
    ===================================================== */

    let previewOverlay =
        document.getElementById("previewOverlay");

    let previewImage = null;
    let previewClose = null;
    let previewPrevious = null;
    let previewNext = null;
    let previewPlayPause = null;

    let previewImages = [];
    let previewIndex = 0;
    let previewAutoplay = null;
    let previewIsPlaying = false;


    const stopPreviewAutoplay = () => {

        if (previewAutoplay) {
            clearInterval(previewAutoplay);
            previewAutoplay = null;
        }

        previewIsPlaying = false;

    };


    const updatePreviewImage = () => {

        if (!previewImage || !previewImages.length) {
            return;
        }

        previewIndex =
            (previewIndex + previewImages.length) %
            previewImages.length;

        const currentImage = previewImages[previewIndex];

        previewImage.src =
            currentImage.currentSrc ||
            currentImage.src;

        previewImage.alt =
            currentImage.alt || "Portfolio artwork";

    };


    const startPreviewAutoplay = () => {

        stopPreviewAutoplay();

        if (previewImages.length < 2) {
            return;
        }

        previewIsPlaying = true;

        previewAutoplay = setInterval(() => {

            previewIndex =
                (previewIndex + 1) %
                previewImages.length;

            updatePreviewImage();

        }, 3500);

    };


    const closePortfolioPreview = () => {

        stopPreviewAutoplay();

        if (previewOverlay) {
            previewOverlay.classList.remove("active");
            previewOverlay.setAttribute("aria-hidden", "true");
        }

        document.body.classList.remove("preview-open");

    };


    const openPortfolioPreview = (clickedImage, imageGroup) => {

        previewImages = imageGroup.filter(image => {
            return image && image.src;
        });

        previewIndex = previewImages.indexOf(clickedImage);

        if (previewIndex < 0) {
            previewIndex = 0;
        }

        if (!previewOverlay) {

            previewOverlay = document.createElement("div");

            previewOverlay.id = "previewOverlay";
            previewOverlay.className = "preview-overlay";

            previewOverlay.innerHTML = `
                <div class="preview-box" role="dialog"
                     aria-modal="true"
                     aria-label="Portfolio artwork preview">

                    <button type="button"
                            id="previewClose"
                            class="preview-close"
                            aria-label="Close preview">
                        &times;
                    </button>

                    <button type="button"
                            id="previewPrevious"
                            class="preview-nav preview-previous"
                            aria-label="Previous artwork">
                        &#10094;
                    </button>

                    <img id="previewImage"
                         class="preview-image"
                         alt="Portfolio artwork">

                    <button type="button"
                            id="previewNext"
                            class="preview-nav preview-next"
                            aria-label="Next artwork">
                        &#10095;
                    </button>

                    <button type="button"
                            id="previewPlayPause"
                            class="preview-play-pause"
                            aria-label="Pause slideshow">
                        &#10074;&#10074;
                    </button>

                </div>
            `;

            document.body.appendChild(previewOverlay);

        }

        previewImage =
            previewOverlay.querySelector("#previewImage");

        previewClose =
            previewOverlay.querySelector("#previewClose");

        previewPrevious =
            previewOverlay.querySelector("#previewPrevious");

        previewNext =
            previewOverlay.querySelector("#previewNext");

        previewPlayPause =
            previewOverlay.querySelector("#previewPlayPause");


        updatePreviewImage();

        previewOverlay.classList.add("active");
        previewOverlay.setAttribute("aria-hidden", "false");

        document.body.classList.add("preview-open");


        if (previewClose) {
            previewClose.onclick = closePortfolioPreview;
        }

        if (previewPrevious) {

            previewPrevious.onclick = () => {

                stopPreviewAutoplay();

                previewIndex =
                    (previewIndex - 1 + previewImages.length) %
                    previewImages.length;

                updatePreviewImage();

            };

        }

        if (previewNext) {

            previewNext.onclick = () => {

                stopPreviewAutoplay();

                previewIndex =
                    (previewIndex + 1) %
                    previewImages.length;

                updatePreviewImage();

            };

        }

        if (previewPlayPause) {

            previewPlayPause.onclick = () => {

                if (previewIsPlaying) {

                    stopPreviewAutoplay();

                    previewPlayPause.innerHTML =
                        "&#9654;";

                    previewPlayPause.setAttribute(
                        "aria-label",
                        "Play slideshow"
                    );

                } else {

                    startPreviewAutoplay();

                    previewPlayPause.innerHTML =
                        "&#10074;&#10074;";

                    previewPlayPause.setAttribute(
                        "aria-label",
                        "Pause slideshow"
                    );

                }

            };

        }


        previewOverlay.onclick = event => {

            if (event.target === previewOverlay) {
                closePortfolioPreview();
            }

        };


        startPreviewAutoplay();

        if (previewPlayPause) {

            previewPlayPause.innerHTML =
                "&#10074;&#10074;";

            previewPlayPause.setAttribute(
                "aria-label",
                "Pause slideshow"
            );

        }

    };


    /* =====================================================
       CONNECT PORTFOLIO IMAGES TO PREVIEW
    ===================================================== */

    const portfolioGalleryImages = document.querySelectorAll(
    ".portfolio-project-card img, " +
    ".work-card img, " +
    ".portfolio-item img, " +
    ".work-item img, " +
    "[data-portfolio-image]"
);

    portfolioGalleryImages.forEach(image => {

        image.style.cursor = "pointer";

        image.addEventListener("click", event => {

            event.preventDefault();

            const galleryContainer =
    image.closest(
        ".portfolio-work-grid, " +
        ".work-grid, " +
        ".portfolio-grid, " +
        ".work-gallery, " +
        "[data-gallery]"
    );

            const groupImages = galleryContainer
                ? Array.from(
                    galleryContainer.querySelectorAll(
                        "img"
                    )
                )
                : [image];

            openPortfolioPreview(image, groupImages);

        });

    });


    /* =====================================================
       CLOSE PREVIEW WITH ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            previewOverlay &&
            previewOverlay.classList.contains("active")
        ) {
            closePortfolioPreview();
        }

    });
       /* =====================================================
       PACKAGE BUTTONS — SCROLL TO CONTACT
    ===================================================== */

    const packageButtons = document.querySelectorAll(
        "[data-package]"
    );

    packageButtons.forEach(button => {

        button.addEventListener("click", () => {

            const packageName =
                button.getAttribute("data-package");

            const contactSection =
                document.getElementById("contact");

            const messageField =
                document.getElementById("packageMessage");

            if (messageField) {
                messageField.value =
                    `Hello Anil, I am interested in the ${packageName} package.`;
            }

            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =====================================================
       PACKAGE PAYMENT ELEMENTS
    ===================================================== */

    const packagePaymentPanel =
        document.getElementById("packagePaymentPanel");

    const selectedPackageName =
        document.getElementById("selectedPackageName");

    const selectedPackagePrice =
        document.getElementById("selectedPackagePrice");

    const closePackagePayment =
        document.getElementById("closePackagePayment");

    const transactionProof =
        document.getElementById("transactionProof");

    const transactionFileName =
        document.getElementById("transactionFileName");

    const contactAfterTransaction =
        document.getElementById("contactAfterTransaction");


    /* =====================================================
       PACKAGE PRICES
    ===================================================== */

    const packagePrices = {
        BRONZE: "NPR 8,000",
        SILVER: "NPR 18,000",
        GOLD: "NPR 30,000",
        PLATINUM: "NPR 65,000 / Month"
    };


    /* =====================================================
       SELECT PACKAGE — OPEN PAYMENT PANEL
    ===================================================== */

    const selectPackageButtons =
        document.querySelectorAll(".package-select-btn");

    selectPackageButtons.forEach(button => {

        button.addEventListener("click", () => {

            const packageName =
                button.getAttribute("data-package-select");

            if (!packageName) return;

            const packagePrice =
                packagePrices[packageName] || "";

            if (selectedPackageName) {
                selectedPackageName.textContent = packageName;
            }

            if (selectedPackagePrice) {
                selectedPackagePrice.textContent = packagePrice;
            }

            if (!packagePaymentPanel) {
                console.warn(
                    "Package payment panel not found. Check #packagePaymentPanel in your HTML."
                );
                return;
            }

            packagePaymentPanel.classList.add("is-visible");

            packagePaymentPanel.setAttribute(
                "aria-hidden",
                "false"
            );

            if (transactionProof) {
                transactionProof.value = "";
            }

            if (transactionFileName) {
                transactionFileName.textContent =
                    "No file selected";
            }

            packagePaymentPanel.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       CLOSE PACKAGE PAYMENT PANEL
    ===================================================== */

    if (closePackagePayment) {

        closePackagePayment.addEventListener("click", () => {

            if (!packagePaymentPanel) return;

            packagePaymentPanel.classList.remove("is-visible");

            packagePaymentPanel.setAttribute(
                "aria-hidden",
                "true"
            );

        });

    }


    /* =====================================================
       TRANSACTION PROOF — DISPLAY FILE NAME
    ===================================================== */

    if (transactionProof) {

        transactionProof.addEventListener("change", () => {

            if (
                transactionProof.files &&
                transactionProof.files.length > 0
            ) {

                if (transactionFileName) {
                    transactionFileName.textContent =
                        transactionProof.files[0].name;
                }

            } else if (transactionFileName) {

                transactionFileName.textContent =
                    "No file selected";

            }

        });

    }


    /* =====================================================
       CONTACT ME AFTER TRANSACTION
    ===================================================== */

    if (contactAfterTransaction) {

        contactAfterTransaction.addEventListener("click", () => {

            const packageName = selectedPackageName
                ? selectedPackageName.textContent.trim()
                : "";

            const packagePrice = selectedPackagePrice
                ? selectedPackagePrice.textContent.trim()
                : "";

            if (!packageName) {
                alert("Please select a package first.");
                return;
            }

            let message =
                `Hello Anil,\n\n` +
                `I would like to confirm my ${packageName} package ` +
                `(${packagePrice}).\n\n`;

            if (
                transactionProof &&
                transactionProof.files &&
                transactionProof.files.length > 0
            ) {
                message +=
                    `Transaction proof selected: ` +
                    `${transactionProof.files[0].name}\n\n` +
                    `I will attach the transaction proof to this email.\n\n`;
            } else {
                message +=
                    `I will provide my transaction proof separately.\n\n`;
            }

            message += "Thank you.";

            const emailSubject =
                `Package Payment Confirmation - ${packageName}`;

            window.location.href =
                "mailto:babal6anil@gmail.com" +
                `?subject=${encodeURIComponent(emailSubject)}` +
                `&body=${encodeURIComponent(message)}`;

        });

    }
       /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const nameField =
                contactForm.querySelector(
                    '[name="name"], #name'
                );

            const emailField =
                contactForm.querySelector(
                    '[name="email"], #email'
                );

            const subjectField =
                contactForm.querySelector(
                    '[name="subject"], #subject'
                );

            const messageField =
                contactForm.querySelector(
                    '[name="message"], #message'
                );

            const name = nameField
                ? nameField.value.trim()
                : "";

            const email = emailField
                ? emailField.value.trim()
                : "";

            const subject = subjectField
                ? subjectField.value.trim()
                : "Portfolio Contact";

            const message = messageField
                ? messageField.value.trim()
                : "";

            if (!name || !email || !message) {

                alert(
                    "Please fill in your name, email, and message."
                );

                return;

            }

            const emailSubject =
                `${subject} — Message from ${name}`;

            const emailBody =
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`;

            window.location.href =
                "mailto:babal6anil@gmail.com" +
                `?subject=${encodeURIComponent(emailSubject)}` +
                `&body=${encodeURIComponent(emailBody)}`;

        });

    }


    /* =====================================================
       BACK TO TOP BUTTON
    ===================================================== */

    const backToTopButton =
        document.getElementById("backToTop");

    if (backToTopButton) {

        const updateBackToTop = () => {

            if (window.scrollY > 400) {

                backToTopButton.classList.add("visible");
                backToTopButton.classList.add("show");

            } else {

                backToTopButton.classList.remove("visible");
                backToTopButton.classList.remove("show");

            }

        };

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        updateBackToTop();

        backToTopButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       LAZY-LOAD IMAGES
    ===================================================== */

    const lazyImages = document.querySelectorAll(
        'img[loading="lazy"]'
    );

    lazyImages.forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-load-error");

        });

    });


    /* =====================================================
       CURRENT YEAR — COPYRIGHT
    ===================================================== */

    const currentYearElements =
        document.querySelectorAll(
            "#currentYear, [data-current-year]"
        );

    currentYearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       EXTERNAL LINKS — SECURITY
    ===================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(link => {

        link.setAttribute("rel", "noopener noreferrer");

    });


    /* =====================================================
       PREVENT EMPTY PLACEHOLDER LINKS
    ===================================================== */

    document.querySelectorAll('a[href="#"]').forEach(link => {

        link.addEventListener("click", event => {
            event.preventDefault();
        });

    });
       /* =====================================================
       FINAL INITIALIZATION
    ===================================================== */

    console.log(
        "Anil Shrestha Portfolio — JavaScript initialized successfully."
    );

});
