```javascript
/* ============================================================
   ANIL SHRESTHA — PORTFOLIO
   COMPLETE JAVASCRIPT
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =========================================================
       PRELOADER
    ========================================================= */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {
                preloader.classList.add("loaded");
            }

            document.body.classList.add("page-loaded");

        }, 700);

    });


    /* =========================================================
       HEADER SCROLL EFFECT
    ========================================================= */

    const siteHeader = document.getElementById("siteHeader");

    const handleHeaderScroll = () => {

        if (!siteHeader) return;

        if (window.scrollY > 50) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }

    };

    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    /* =========================================================
       MOBILE MENU
    ========================================================= */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileMenuLinks =
        mobileMenu
            ? mobileMenu.querySelectorAll("a")
            : [];

    const closeMobileMenu = () => {

        if (!mobileMenuButton || !mobileMenu) return;

        mobileMenuButton.classList.remove("open");

        mobileMenu.classList.remove("open");

        document.body.classList.remove("menu-open");

    };

    const openMobileMenu = () => {

        if (!mobileMenuButton || !mobileMenu) return;

        mobileMenuButton.classList.add("open");

        mobileMenu.classList.add("open");

        document.body.classList.add("menu-open");

    };

    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenuButton.classList.contains("open");

                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }

            }
        );

    }

    mobileMenuLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    /* =========================================================
       ESCAPE KEY
    ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMobileMenu();

                closePackageModal();

            }

        }
    );


    /* =========================================================
       SMOOTH ANCHOR SCROLLING
    ========================================================= */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
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
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =========================================================
       SCROLL REVEAL
    ========================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

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


    /* =========================================================
       STAGGERED REVEAL FOR SERVICES
    ========================================================= */

    const serviceCards =
        document.querySelectorAll(".service-card");

    if ("IntersectionObserver" in window) {

        const serviceObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity = "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            serviceObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );

        serviceCards.forEach((card, index) => {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(25px)";

            card.style.transition =
                `opacity .7s cubic-bezier(.2,.75,.25,1) ${index * 80}ms,
                 transform .7s cubic-bezier(.2,.75,.25,1) ${index * 80}ms`;

            serviceObserver.observe(card);

        });

    }


    /* =========================================================
       PORTFOLIO CARD REVEAL
    ========================================================= */

    const portfolioCards =
        document.querySelectorAll(".portfolio-card");

    if ("IntersectionObserver" in window) {

        const portfolioObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "portfolio-visible"
                            );

                            portfolioObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );

        portfolioCards.forEach((card, index) => {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(30px)";

            card.style.transition =
                `opacity .8s ease ${index * 100}ms,
                 transform .8s cubic-bezier(.2,.75,.25,1) ${index * 100}ms`;

            portfolioObserver.observe(card);

        });

    }


    /* =========================================================
       PORTFOLIO VISIBLE STYLE
    ========================================================= */

    const portfolioVisibleStyle =
        document.createElement("style");

    portfolioVisibleStyle.textContent = `
        .portfolio-card.portfolio-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

    document.head.appendChild(
        portfolioVisibleStyle
    );


    /* =========================================================
       PACKAGE MODAL
    ========================================================= */

    const packageModal =
        document.getElementById("packageModal");

    const modalOverlay =
        document.getElementById("modalOverlay");

    const modalClose =
        document.getElementById("modalClose");

    const selectedPackage =
        document.getElementById("selectedPackage");

    const modalContact =
        document.getElementById("modalContact");

    const packageButtons =
        document.querySelectorAll(
            ".package-button"
        );


    const openPackageModal = packageName => {

        if (!packageModal) return;

        if (selectedPackage) {

            selectedPackage.textContent =
                `${packageName} Package`;

        }

        packageModal.classList.add("open");

        packageModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );

    };


    function closePackageModal() {

        if (!packageModal) return;

        packageModal.classList.remove("open");

        packageModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    packageButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const packageName =
                    button.dataset.package ||
                    "Creative";

                openPackageModal(
                    packageName
                );

            }
        );

    });


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closePackageModal
        );

    }

    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closePackageModal
        );

    }


    /* =========================================================
       MODAL → CONTACT
    ========================================================= */

    if (modalContact) {

        modalContact.addEventListener(
            "click",
            event => {

                event.preventDefault();

                closePackageModal();

                const contactSection =
                    document.getElementById(
                        "contact"
                    );

                if (!contactSection) return;

                setTimeout(() => {

                    const headerHeight =
                        siteHeader
                            ? siteHeader.offsetHeight
                            : 0;

                    const position =
                        contactSection
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                }, 150);

            }
        );

    }


    /* =========================================================
       PACKAGE → CONTACT FORM
       PRESELECT PACKAGE
    ========================================================= */

    const serviceSelect =
        document.getElementById("service");

    packageButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const packageName =
                    button.dataset.package;

                setTimeout(() => {

                    if (!serviceSelect) return;

                    serviceSelect.value =
                        "package";

                    const message =
                        document.getElementById(
                            "message"
                        );

                    if (message) {

                        message.value =
                            `Hi Anil, I am interested in the ${packageName} Package. I would like to discuss my project with you.`;

                    }

                }, 300);

            }
        );

    });


    /* =========================================================
       CONTACT FORM
    ========================================================= */

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document.getElementById(
                        "name"
                    )?.value.trim();

                const email =
                    document.getElementById(
                        "email"
                    )?.value.trim();

                const service =
                    document.getElementById(
                        "service"
                    )?.value;

                const message =
                    document.getElementById(
                        "message"
                    )?.value.trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please fill in all required fields.";

                    }

                    return;

                }


                /*
                    This form does not send email directly.

                    Instead, it prepares a WhatsApp message
                    so the client can contact Anil without
                    needing a backend server.
                */

                const serviceText =
                    service
                        ? service
                            .replace(
                                /-/g,
                                " "
                            )
                            .replace(
                                /\b\w/g,
                                letter =>
                                    letter.toUpperCase()
                            )
                        : "Not specified";


                const whatsappText =
                    `Hello Anil,

My name is ${name}.

Email: ${email}

Service: ${serviceText}

Project Details:
${message}

I would like to discuss this project with you.`;


                const whatsappURL =
                    "https://wa.me/9779815150233?text=" +
                    encodeURIComponent(
                        whatsappText
                    );


                if (formMessage) {

                    formMessage.textContent =
                        "Opening WhatsApp...";

                }
```
