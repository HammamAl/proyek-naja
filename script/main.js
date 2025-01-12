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
