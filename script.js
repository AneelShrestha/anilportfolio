/* =========================================================
   ANIL SHRESTHA — PORTFOLIO INTERACTIONS
========================================================= */


/* =========================================================
   PORTFOLIO FILTERING
========================================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const filter = button.getAttribute("data-filter");

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    projects.forEach(project => {

      const category = project.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }

    });

  });

});


/* =========================================================
   PACKAGE VIEW MORE / VIEW LESS
========================================================= */

const packageMoreButtons = document.querySelectorAll(".package-more");

packageMoreButtons.forEach(button => {

  button.addEventListener("click", () => {

    const card = button.closest(".package-card");

    if (!card) return;

    const details = card.querySelector(".package-details");

    if (!details) return;

    const isOpen = card.classList.contains("expanded");

    // Close other open package cards
    document.querySelectorAll(".package-card.expanded").forEach(openCard => {

      if (openCard !== card) {

        openCard.classList.remove("expanded");

        const openDetails = openCard.querySelector(".package-details");

        if (openDetails) {
          openDetails.style.maxHeight = "0px";
        }

        const openButton = openCard.querySelector(".package-more");

        if (openButton) {
          openButton.innerHTML =
            'View More <i class="fa-solid fa-arrow-right"></i>';
        }

      }

    });


    if (!isOpen) {

      card.classList.add("expanded");

      details.style.maxHeight = details.scrollHeight + "px";

      button.innerHTML =
        'View Less <i class="fa-solid fa-chevron-up"></i>';

    } else {

      card.classList.remove("expanded");

      details.style.maxHeight = "0px";

      button.innerHTML =
        'View More <i class="fa-solid fa-arrow-right"></i>';

    }

  });

});


/* =========================================================
   PACKAGE SELECTION
========================================================= */

const packageSelectButtons =
  document.querySelectorAll(".package-select");

packageSelectButtons.forEach(button => {

  button.addEventListener("click", () => {

    const packageName =
      button.getAttribute("data-package");

    if (!packageName) return;

    // Store selected package
    sessionStorage.setItem(
      "selectedPackage",
      packageName
    );

    // Go to contact section
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


/* =========================================================
   SHOW SELECTED PACKAGE IN CONTACT
========================================================= */

window.addEventListener("DOMContentLoaded", () => {

  const selectedPackage =
    sessionStorage.getItem("selectedPackage");

  const packageNotice =
    document.querySelector("#selected-package");

  if (selectedPackage && packageNotice) {

    packageNotice.innerHTML =
      `Interested in: <strong>${selectedPackage}</strong>`;

    packageNotice.classList.add("show");

  }

});
