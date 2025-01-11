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
document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery-container");

  let images = [
    { src: "./img/cewekpink1.jpg", alt: "Image 1" },
    { src: "./img/cewekpink2.jpg", alt: "Image 2" },
    { src: "./img/cewekpink3.jpg", alt: "Image 3" },
    { src: "./img/cewekpink4.jpg", alt: "Image 4" },
    { src: "./img/cewekpink5.jpg", alt: "Image 5" },
    { src: "./img/cewekpink6.jpg", alt: "Image 6" },
    { src: "./img/cewekpink7.jpg", alt: "Image 7" },
    { src: "./img/cewekputih1.jpg", alt: "Image 8" },
    { src: "./img/cewekputih2.jpg", alt: "Image 9" },
    { src: "./img/cewekputih3.jpg", alt: "Image 10" },
    { src: "./img/cewekputih4.jpg", alt: "Image 11" },
    { src: "./img/cewekputih5.jpg", alt: "Image 12" },
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function checkImageOrientation(img) {
    return new Promise((resolve) => {
      if (img.complete) {
        resolve(img.naturalWidth > img.naturalHeight);
      } else {
        img.onload = () => resolve(img.naturalWidth > img.naturalHeight);
      }
    });
  }

  function createPhotoElement(image) {
    const photoDiv = document.createElement("div");
    photoDiv.className = "photo";
    photoDiv.innerHTML = `
            <div class="photo-wrapper">
                <img src="${image.src}" alt="${image.alt}">
            </div>
        `;
    return photoDiv;
  }

  async function renderGallery() {
    const shuffledImages = shuffleArray([...images]);
    gallery.innerHTML = "";
    let row = [];
    let colCount = 0;

    for (const image of shuffledImages) {
      const photoDiv = createPhotoElement(image);
      const img = photoDiv.querySelector("img");
      const isLandscape = await checkImageOrientation(img);

      if (isLandscape) {
        photoDiv.classList.add("landscape");
        colCount += 2;
      } else {
        colCount += 1;
      }

      row.push(photoDiv);
      gallery.appendChild(photoDiv);

      if (colCount >= 3) {
        if (colCount > 3) {
          const lastPhoto = row[row.length - 1];
          lastPhoto.classList.remove("landscape");
          colCount--;
        }
        row = [];
        colCount = 0;
      }
    }

    // Fill empty spaces
    if (colCount > 0 && colCount < 3) {
      const needed = 3 - colCount;
      for (let i = 0; i < needed; i++) {
        const randomImg = images[Math.floor(Math.random() * images.length)];
        const fillDiv = createPhotoElement(randomImg);
        gallery.appendChild(fillDiv);
      }
    }
  }

  renderGallery();
});

document.querySelectorAll(".photo").forEach((photo) => {
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
    const clickedImage = e.target.closest(".photo img");
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

// Tambahkan console log
images.forEach((img) => {
  console.log("Loading image:", img.src);
});
