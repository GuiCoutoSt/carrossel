// Selecionar botões
const previewButton = document.getElementById("preview");
const nextButton = document.getElementById("next");

const carouselContent = document.querySelector(".carousel__content");

nextButton.addEventListener("click", () => {
  scrollAmount = 0;

  let slideTimer = setInterval(() => {
    carouselContent.scrollLeft += 10;
    scrollAmount += 10;

    if (scrollAmount >= 300) {
      clearInterval(slideTimer);
    }
  }, 5);
});

previewButton.addEventListener("click", () => {
  scrollAmount = 0;

  let slideTimer = setInterval(() => {
    carouselContent.scrollLeft -= 10;
    scrollAmount += 10;

    if (scrollAmount >= 300) {
      clearInterval(slideTimer);
    }
  }, 10);
});
