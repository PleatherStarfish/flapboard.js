const flippity = new Flippity({
  parentNode: "flippity",
  numberOfFlipboards: 3,
  flipTime: "0.9",
  moduloOrNextUp: "modulo",
  synchronous: true,
  clickable: false,
  rollingOrStepThrough: "rolling",
  rollingDelay: "0.5",
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
flippity.render("123");

function run123() {
  flippity._rollDeck("234");
  // const card = document.querySelector(".card");
  // card.addEventListener("click", () => {
  //   // card.classList.toggle("is-flipped");
  //   flippity._rollDeck("123");
  // });
}

