// Yet to be finished 
// Fully maintaned by Simon | Diacetylmorphine
(function () {
  "use strict";

  function removeBlueBackground(imageUrl, callback) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (b > 150 && b > r && b > g) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      callback(canvas.toDataURL());
    };
    img.src = imageUrl;
  }

  function processImages() {
    document.querySelectorAll("image._3tYRU").forEach((imageElement) => {
      removeBlueBackground(imageElement.getAttribute("xlink:href"), (newImageUrl) => {
        imageElement.setAttribute("xlink:href", newImageUrl);
      });
    });
  }

  window.addEventListener("load", processImages);
})();

