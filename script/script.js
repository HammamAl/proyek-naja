$(document).ready(function () {
  $("#navbar").load("../navbar.html", function () {
    $(".hamburger").click(function () {
      // Toggle sidebar
      $("#sidebar").toggleClass("active");
      $("#overlay").toggleClass("active");

      // Toggle hamburger icon
      $(this).toggleClass("active");
    });

    // Close sidebar if overlay is clicked
    $("#overlay").click(function () {
      $("#sidebar").removeClass("active");
      $("#overlay").removeClass("active");

      // Reset hamburger icon
      $(".hamburger").removeClass("active");
    });

    // Toggle the dropdown menu
    window.toggleMenu = function () {
      $("#galleryMenu").toggleClass("hidden");
      $("#arrow").toggleClass("fa-chevron-down fa-chevron-up");
    };
  });
});

function toggleMenu() {
  const menu = document.getElementById("galleryMenu");
  const arrow = document.getElementById("arrow");

  menu.classList.toggle("hidden");

  // Toggle arah panah
  if (menu.classList.contains("hidden")) {
    arrow.classList.remove("fa-chevron-down");
    arrow.classList.add("fa-chevron-up");
  } else {
    arrow.classList.remove("fa-chevron-up");
    arrow.classList.add("fa-chevron-down");
  }
}

document.querySelectorAll(".photo-wrapper").forEach((photo) => {
  photo.addEventListener("click", () => {
    // Efek ripple saat diklik
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    photo.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery-container");

  // Tambahkan modal container ke body
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal";
  modalContainer.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="" alt="" class="modal-image">
        </div>
    `;
  document.body.appendChild(modalContainer);

  // Event untuk membuka modal
  gallery.addEventListener("click", function (e) {
    const clickedImage = e.target.closest(".photo-wrapper img");
    if (clickedImage) {
      const modal = document.querySelector(".modal");
      const modalImg = modal.querySelector(".modal-image");
      modalImg.src = clickedImage.src;
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }
  });

  // Event untuk menutup modal
  const closeBtn = document.querySelector(".modal .close");
  closeBtn.addEventListener("click", closeModal);
  modalContainer.addEventListener("click", function (e) {
    if (e.target === modalContainer) {
      closeModal();
    }
  });

  // Close dengan ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  function closeModal() {
    const modal = document.querySelector(".modal");
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");

  // Toggle menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : "auto";
  });

  // Close menu when clicking overlay
  overlay.addEventListener("click", function () {
    hamburger.classList.remove("active");
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close menu when window is resized
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("active");
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
      hamburger.classList.remove("active");
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});
