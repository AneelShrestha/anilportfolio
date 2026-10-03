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
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const backToTop =
        document.getElementById("backToTop");

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");

    const currentYear =
        document.getElementById("currentYear");

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


    /* =====================================================
       PRELOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {
                preloader.classList.add("loaded");
            }

        }, 500);

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function handleHeader() {

        if (!siteHeader) return;

        if (window.scrollY > 30) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenuButton && mobileMenu) {

        mobileMenuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("open");

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

            });

        });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (mobileMenu) {
                mobileMenu.classList.remove("open");
            }

            closeModal();

        }

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

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
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       PACKAGE MODAL
    ===================================================== */

    function openModal(packageName) {

        if (!packageModal) return;

        if (selectedPackage) {
            selectedPackage.textContent =
                packageName;
        }

        packageModal.classList.add("open");

        document.body.classList.add("modal-open");

    }


    function closeModal() {

        if (!packageModal) return;

        packageModal.classList.remove("open");

        document.body.classList.remove("modal-open");

    }


    document.querySelectorAll(".package-button").forEach(button => {

        button.addEventListener("click", () => {

            const packageName =
                button.dataset.package ||
                "Package";

            openModal(packageName);

        });

    });


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeModal
        );

    }


    /* =====================================================
       MODAL → CONTACT
    ===================================================== */

    if (modalContact) {

        modalContact.addEventListener("click", () => {

            closeModal();

            setTimeout(() => {

                const contact =
                    document.querySelector("#contact");

                if (contact) {

                    contact.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }, 100);

        });

    }


    /* =====================================================
       PACKAGE → CONTACT FORM
    ===================================================== */

    document.querySelectorAll(".package-button").forEach(button => {

        button.addEventListener("click", () => {

            const packageName =
                button.dataset.package;

            if (!packageName) return;

            const serviceSelect =
                document.getElementById("service");

            if (serviceSelect) {

                const optionExists =
                    [...serviceSelect.options]
                    .some(option =>
                        option.value === packageName
                    );

                if (optionExists) {
                    serviceSelect.value =
                        packageName;
                }

            }

        });

    });


    /* =====================================================
       CONTACT FORM → WHATSAPP
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                document.getElementById("name")?.value.trim() || "";

            const phone =
                document.getElementById("phone")?.value.trim() || "";

            const service =
                document.getElementById("service")?.value || "";

            const message =
                document.getElementById("message")?.value.trim() || "";


            if (!name || !phone || !message) {

                showFormMessage(
                    "Please fill in all required fields."
                );

                return;

            }


            const whatsappMessage =
`Hello Anil,

My name is ${name}.

Phone: ${phone}

I'm interested in:
${service || "Your creative services"}

Project details:
${message}

I would like to discuss this project with you.`;


            const whatsappURL =
                "https://wa.me/9779815150233?text=" +
                encodeURIComponent(whatsappMessage);


            window.open(
                whatsappURL,
                "_blank",
                "noopener"
            );


            showFormMessage(
                "Opening WhatsApp..."
            );

        });

    }


    function showFormMessage(message) {

        if (!formMessage) return;

        formMessage.textContent = message;

        formMessage.classList.add("show");

        setTimeout(() => {

            formMessage.classList.remove("show");

        }, 5000);

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(".desktop-nav .nav-link");


    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection =
                    section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 700) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop
    );


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       SERVICE CARD STAGGER
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");


    serviceCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.08}s`;

    });


    /* =====================================================
       PACKAGE CARD STAGGER
    ===================================================== */

    const packageCards =
        document.querySelectorAll(".package-card");


    packageCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.06}s`;

    });


    /* =====================================================
       PORTFOLIO HOVER EFFECT
    ===================================================== */

    const portfolioCards =
        document.querySelectorAll(".portfolio-card");


    portfolioCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -2;

            const rotateY =
                ((x / rect.width) - 0.5) * 2;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(800px) rotateX(0) rotateY(0)";

        });

    });


    /* =====================================================
       HERO VISUAL PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (heroVisual && window.innerWidth > 800) {

        heroVisual.addEventListener(
            "mousemove",
            event => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;


                const portrait =
                    heroVisual.querySelector(
                        ".portrait-frame"
                    );

                const cardOne =
                    heroVisual.querySelector(
                        ".card-one"
                    );

                const cardTwo =
                    heroVisual.querySelector(
                        ".card-two"
                    );


                if (portrait) {

                    portrait.style.transform =
                        `translate(${x * 8}px, ${y * 8}px)`;

                }

                if (cardOne) {

                    cardOne.style.transform =
                        `translate(${x * -12}px, ${y * -12}px)`;

                }

                if (cardTwo) {

                    cardTwo.style.transform =
                        `translate(${x * 12}px, ${y * 12}px)`;

                }

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                const portrait =
                    heroVisual.querySelector(
                        ".portrait-frame"
                    );

                const cardOne =
                    heroVisual.querySelector(
                        ".card-one"
                    );

                const cardTwo =
                    heroVisual.querySelector(
                        ".card-two"
                    );


                if (portrait) {
                    portrait.style.transform =
                        "translate(0,0)";
                }

                if (cardOne) {
                    cardOne.style.transform =
                        "translate(0,0)";
                }

                if (cardTwo) {
                    cardTwo.style.transform =
                        "translate(0,0)";
                }

            }
        );

    }


    /* =====================================================
       PREVENT FORM RESUBMISSION ON REFRESH
    ===================================================== */

    if (window.history.replaceState) {

        window.history.replaceState(
            null,
            null,
            window.location.href
        );

    }

});
