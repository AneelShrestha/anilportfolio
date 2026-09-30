// Portfolio filtering

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const filter = button.getAttribute("data-filter");

    // Update active button
    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    // Filter projects
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
