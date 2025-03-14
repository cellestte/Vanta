// ⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆ | Snippet to allow copy-pasting on website.
(function () {
  "use strict";
  function allowPaste(event) {
    event.stopImmediatePropagation();
    return true;
  }
  document.addEventListener("paste", allowPaste, true);
})();


// ⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆ | Snippet to hide bloated navigation menu + gold icon in user panel.
(function () {
  "use strict";
  function hideMenuItems() {
    const menuItemsToHide = [
      "/news/",
      "/leaderboard/",
      "/subscription/subscribe/",
      "/purchase/",
    ];
    const menuLinks = document.querySelectorAll("a.MuiTypography-root");

    menuLinks.forEach((link) => {
      if (menuItemsToHide.includes(link.getAttribute("href"))) {
        const parentLi = link.closest("li");
        if (parentLi) {
          parentLi.style.display = "none";
        }
      }
    });
    const levelItem = Array.from(menuLinks).find((link) => {
      const href = link.getAttribute("href");
      return href && href.includes("/levels/");
    });
    if (levelItem) {
      const parentLi = levelItem.closest("li");
      if (parentLi) {
        parentLi.style.display = "none";
      }
    }
    const goldCubeItem = document.querySelector("li._3WhKY._18cmu");
    if (goldCubeItem) {
      goldCubeItem.style.display = "none";
    }
  }

  window.addEventListener("load", hideMenuItems);
})();
const injectCss = (id, css) => {
  const style = document.createElement("style");
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
};

// ⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆ | Snippet to process image RGB to make profile banner look cleaner.
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
