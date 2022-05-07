const previewButton = document.getElementById("preview");
const nextButton = document.getElementById("next");

const carouselContent = document.querySelector(".carousel__content");

previewButton.addEventListener("click", () => {
  scrollMeasure = 0;

  let slideTimer = setInterval(() => {
    carouselContent.scrollLeft -= 10;
    scrollMeasure += 10;

    if (scrollMeasure >= 325) {
      clearInterval(slideTimer);
    }
  }, 10);
});

nextButton.addEventListener("click", () => {
  scrollMeasure = 0;

  let slideTimer = setInterval(() => {
    carouselContent.scrollLeft += 10;
    scrollMeasure += 10;

    if (scrollMeasure >= 325) {
      clearInterval(slideTimer);
    }
  }, 10);
});
