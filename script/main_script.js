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
  const photos = Array.from(gallery.children);

  // Fungsi untuk mengacak gambar
  function shuffleGallery() {
    photos.forEach((photo) => {
      photo.style.order = Math.floor(Math.random() * photos.length);
    });
  }

  // Deteksi orientasi gambar
  photos.forEach((photo) => {
    const img = photo.querySelector("img");
    img.onload = function () {
      if (this.naturalHeight > this.naturalWidth) {
        photo.classList.remove("landscape");
        photo.classList.add("portrait");
      } else {
        photo.classList.remove("portrait");
        photo.classList.add("landscape");
      }

      // Atur ukuran grid berdasarkan rasio
      if (this.naturalWidth / this.naturalHeight > 1.5) {
        photo.classList.add("large");
      } else if (this.naturalWidth / this.naturalHeight > 1.2) {
        photo.classList.add("medium");
      }
    };
  });

  // Jalankan pengacakan
  shuffleGallery();
});
