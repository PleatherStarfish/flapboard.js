import "./styles.css";

const element = document.getElementById("splitflap");

const upNow = element.getAttribute("data-upnow");
const upNext = element.getAttribute("data-upnext");

let flipcard = document.createElement("div");
flipcard.innerHTML = `<div class="scene scene--card">

  <div class="background">
    <div class="number__top">${upNext}</div>
  </div>

  <div class="card">

    <div class="card__face card__face--front-top">
      <div class="number__top">${upNow}</div>
    </div>
    
    <div class="card__face card__face--back">
      <div class="number__top--flipped">${upNext}</div>
    </div>

  </div>

  <div class="card__face card__face--front-bottom">
    <div class="number__bottom">${upNow}</div>
  </div>

  <div class="gap"></div>

</div>`;

element.appendChild(flipcard);

const card = document.querySelector(".card");
card.addEventListener("click", () => {
  card.classList.toggle("is-flipped");
});
