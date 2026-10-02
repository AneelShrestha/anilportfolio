document.addEventListener("DOMContentLoaded", function () {
/*
* VIEW MORE / VIEW LESS
* Works with all four pricing packages.
*/
const packageButtons = document.querySelectorAll(
".pricing-package__view"
);
packageButtons.forEach(function (button) {
button.addEventListener("click", function () {
const card = button.closest(".pricing-package");
if (!card) return;
const isOpen = card.classList.toggle("show-details");
button.setAttribute(
"aria-expanded",
isOpen ? "true" : "false"
);
const icon = button.querySelector("i");
const text = button.querySelector("span");
if (isOpen) {
if (icon) {
icon.classList.remove("fa-plus");
icon.classList.add("fa-minus");
}
if (text) {
text.textContent = "View Less";
}
} else {
if (icon) {
icon.classList.remove("fa-minus");
icon.classList.add("fa-plus");
}
if (text) {
text.textContent = "View More";
}
}
});
});
/*
* PACKAGE SELECTION
*
* Saves the selected package name so it can be used
* later when we improve the contact section.
*/
const packageSelectButtons = document.querySelectorAll(
".pricing-package__select"
);
packageSelectButtons.forEach(function (button) {
button.addEventListener("click", function () {
const selectedPackage = button.dataset.package;
if (selectedPackage) {
localStorage.setItem(
"selectedPackage",
selectedPackage
);
}
});
});
/*
* PRICING BUTTONS
*
* Keep the top-right Pricing buttons connected
* to the contact section.
*/
const pricingButtons = document.querySelectorAll(
".pricing-package__top-button"
);
pricingButtons.forEach(function (button) {
button.addEventListener("click", function () {
const card = button.closest(".pricing-package");
if (!card) return;
const packageName =
card.querySelector(".pricing-package__name h3");
if (packageName) {
localStorage.setItem(
"selectedPackage",
packageName.textContent.trim()
);
}
});
});
});
