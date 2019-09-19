const flipboard = new Flipboard({
  parentNode: "splitflap",
  numberOfFlipboards: 6,
  flipTime: "0.2s",
  moduloOrNextUp: "modulo",
  initialString: "DANIEL",
  synchronous: true,
  clickable: false,
  rollingOrStepThrough: "rolling",
  rollingDelay: "0.5s",
  updateDirection: "random",
  fontSize: "200pt",
  color: "white",
  backgroundColor: "black",
  gapWidth: "4px",
  gapColor: "white",
  height: "260px",
  width: "200px",
  margin: "40px 5px",
  font: "sans-serif",
  fontWeight: "bold",
  perspective: "1000px"
});

const card = document.querySelector(".card");
card.addEventListener("click", () => {
  card.classList.toggle("is-flipped");
});
