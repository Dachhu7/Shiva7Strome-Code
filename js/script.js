document.addEventListener("DOMContentLoaded", function () {
  // ================== Carousel Functionality ====================
  const carousel = document.querySelector("#homeCarousel");
  if (carousel) {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-item");

    if (slides.length > 0 && !document.querySelector(".carousel-item.active")) {
      slides[0].classList.add("active");
    }

    function autoSlide() {
      slides[slideIndex].classList.remove("active");
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add("active");
    }

    setInterval(autoSlide, 5000);
  }

  // ================== jQuery Filter Functionality ====================
  if (typeof $ !== "undefined") {
    $(".filter-item").on("click", function () {
      const value = $(this).data("filter");
      $(".post").fadeOut(300, function () {
        if (value === "all") {
          $(".post").fadeIn(300);
        } else {
          $(".post").filter("." + value).fadeIn(300);
        }
      });
    });
  }

  // ================== Sticky Navbar ====================
  const navbar = document.getElementById("navbar-top");
  if (navbar) {
    let lastScrollY = 0;
    window.addEventListener("scroll", function () {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.classList.add("fixed-top");
          document.body.classList.add("fixed-navbar");
        } else {
          navbar.classList.remove("fixed-top");
          document.body.classList.remove("fixed-navbar");
        }
      });
    });
  }

  // ================== Back to Top Button ====================
  const backToTopButton = document.getElementById("btn-back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      backToTopButton.style.display = window.scrollY > 20 ? "block" : "none";
    });

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ================== About Section Scroll Animation ====================
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    aboutSection.style.opacity = "0";
    aboutSection.style.transform = "translateY(30px)";
    aboutSection.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          aboutSection.style.opacity = "1";
          aboutSection.style.transform = "translateY(0)";
          observer.unobserve(aboutSection);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(aboutSection);
  }

  // ================== Form Validation ====================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let isValid = true;

      const fields = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        mobile: document.getElementById("mobile"),
        message: document.getElementById("message"),
      };

      const errors = {
        name: document.getElementById("nameError"),
        email: document.getElementById("emailError"),
        mobile: document.getElementById("mobileError"),
        message: document.getElementById("messageError"),
      };

      // Validate inputs
      if (fields.name.value.trim() === "") isValid = showError("name");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) isValid = showError("email");
      if (!/^[0-9]{10}$/.test(fields.mobile.value.trim())) isValid = showError("mobile");
      if (fields.message.value.trim() === "") isValid = showError("message");

      function showError(field) {
        errors[field].classList.remove("d-none");
        return false;
      }

      function hideError(field) {
        errors[field].classList.add("d-none");
      }

      Object.keys(fields).forEach((field) => hideError(field));

      if (isValid) {
        alert("Form submitted successfully!");
        contactForm.reset();
      }
    });
  }

  // ================== Close Mobile Menu when clicking outside ====================
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector("#navbarNav");

  if (navbarToggler && navbarCollapse) {
    document.addEventListener("click", function (event) {
      if (!navbarToggler.contains(event.target) && !navbarCollapse.contains(event.target)) {
        navbarCollapse.classList.remove("show");
      }
    });
  }

  // ================== Read More Buttons ====================
  document.querySelectorAll(".read-more-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
      this.textContent = content.style.display === "block" ? "Read Less" : "Read More";
    });
  });

  // ================== Footer Logo Animation ====================
  const logo = document.querySelector(".footer-logo");
  if (logo) {
    logo.style.opacity = "0";
    logo.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
      logo.style.opacity = "1";
    }, 200);
  }
});
