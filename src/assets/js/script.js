const previewButton = document.getElementById("preview");
const nextButton = document.getElementById("next");

const carouselContent = document.querySelector(".carousel__content");

previewButton.addEventListener(
  "click",
  () => {
    scrollMeasure = 0;

    let intervalID = setInterval(() => {
      carouselContent.scrollLeft -= 10;
      scrollMeasure += 10;

      if (scrollMeasure >= 325) {
        clearInterval(intervalID);
      }
    }, 10);
  },
  true
);

nextButton.addEventListener(
  "click",
  () => {
    scrollMeasure = 0;

    let intervalID = setInterval(() => {
      carouselContent.scrollLeft += 10;
      scrollMeasure += 10;

      if (scrollMeasure >= 325) {
        clearInterval(intervalID);
      }
    }, 10);
  },
  true
);
