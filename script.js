/* =========================================================
   ANIL SHRESTHA — PORTFOLIO INTERACTIONS
   CLEAN MASTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     PORTFOLIO FILTERING
  ======================================================= */

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project");

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const filter = button.getAttribute("data-filter");

      /* Active button */
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");


      /* Filter projects */
      projects.forEach(project => {

        const category =
          project.getAttribute("data-category");

        const shouldShow =
          filter === "all" || category === filter;

        project.style.display =
          shouldShow ? "block" : "none";

      });

    });

  });


  /* =======================================================
     PACKAGE VIEW MORE / VIEW LESS
  ======================================================= */

  const packageMoreButtons =
    document.querySelectorAll(".package-more");


  packageMoreButtons.forEach(button => {

    button.addEventListener("click", () => {

      const card =
        button.closest(".package-card");

      if (!card) return;


      const details =
        card.querySelector(".package-details");

      if (!details) return;


      const isOpen =
        card.classList.contains("expanded");


      /* Close other cards */

      document
        .querySelectorAll(".package-card.expanded")
        .forEach(openCard => {

          if (openCard !== card) {

            openCard.classList.remove("expanded");

            const openDetails =
              openCard.querySelector(".package-details");

            if (openDetails) {
              openDetails.style.maxHeight = "0px";
            }

            const openButton =
              openCard.querySelector(".package-more");

            if (openButton) {

              openButton.innerHTML =
                'View More <i class="fa-solid fa-arrow-right"></i>';

            }

          }

        });


      /* Open current card */

      if (!isOpen) {

        card.classList.add("expanded");

        details.style.maxHeight =
          details.scrollHeight + "px";

        button.innerHTML =
          'View Less <i class="fa-solid fa-chevron-up"></i>';

      }

      /* Close current card */

      else {

        card.classList.remove("expanded");

        details.style.maxHeight = "0px";

        button.innerHTML =
          'View More <i class="fa-solid fa-arrow-right"></i>';

      }

    });

  });


  /* =======================================================
     PACKAGE SELECTION
  ======================================================= */

  const packageSelectButtons =
    document.querySelectorAll(".package-select");


  packageSelectButtons.forEach(button => {

    button.addEventListener("click", () => {

      const packageName =
        button.getAttribute("data-package");

      if (!packageName) return;


      /* Save selected package */

      sessionStorage.setItem(
        "selectedPackage",
        packageName
      );


      /* Update contact notice immediately */

      updateSelectedPackage(packageName);


      /* Scroll to contact */

      const contactSection =
        document.querySelector("#contact");

      if (contactSection) {

        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* =======================================================
     CUSTOM PACKAGE
  ======================================================= */

  const customButtons =
    document.querySelectorAll(".custom-button");


  customButtons.forEach(button => {

    button.addEventListener("click", () => {

      const packageName =
        "Custom Package";

      sessionStorage.setItem(
        "selectedPackage",
        packageName
      );


      updateSelectedPackage(packageName);


      const contactSection =
        document.querySelector("#contact");

      if (contactSection) {

        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* =======================================================
     SHOW SELECTED PACKAGE
  ======================================================= */

  const savedPackage =
    sessionStorage.getItem("selectedPackage");

  if (savedPackage) {

    updateSelectedPackage(savedPackage);

  }


  /* =======================================================
     SELECTED PACKAGE DISPLAY FUNCTION
  ======================================================= */

  function updateSelectedPackage(packageName) {

    const packageNotice =
      document.querySelector("#selected-package");

    if (!packageNotice) return;


    packageNotice.innerHTML =
      `Interested in: <strong>${packageName}</strong>`;


    packageNotice.classList.add("show");

  }

});
