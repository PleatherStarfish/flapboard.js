(function() {
    const Flipboard = function(options) {
        let root = document.documentElement;
        if (!options.hasOwnProperty("parentNode")) {
            options.parentNode = "splitflap";
        }
        if (!options.hasOwnProperty("numberOfFlipboards")) {
            options.parentNode = 1;
        }
        if (!options.hasOwnProperty("flipTime")) {
            options.flipTime = "0.2s";
        } else {
            root.style.setProperty("--flipboard-fliptime", options.flipTime);
        }
        if (!options.hasOwnProperty("moduloOrNextUp")) {
            options.flipTime = "modulo";
        }
        if (!options.hasOwnProperty("initialString")) {
            options.initialString = "Flip";
        }
        if (!options.hasOwnProperty("synchronous")) {
            options.synchronous = true;
        }
        if (!options.hasOwnProperty("clickable")) {
            options.clickable = false;
        }
        if (!options.hasOwnProperty("rollingOrStepThrough")) {
            options.rollingOrStepThrough = "rolling";
        }
        if (!options.hasOwnProperty("rollingDelay")) {
            options.rollingDelay = "0.5s";
        }
        if (!options.hasOwnProperty("updateDirection")) {
            options.updateDirection = "left to right";
        }
        if (!options.hasOwnProperty("fontSize")) {
            options.fontSize = "100pt";
        } else {
            root.style.setProperty("--flipboard-font-size", options.fontSize);
        }
        if (!options.hasOwnProperty("color")) {
            options.color = "white";
        } else {
            root.style.setProperty("--flipboard-color", options.color);
        }
        if (!options.hasOwnProperty("backgroundColor")) {
            options.backgroundColor = "black";
        } else {
            root.style.setProperty(
                "--flipboard-background-color",
                options.backgroundColor
            );
        }
        if (!options.hasOwnProperty("gapWidth")) {
            options.gapWidth = "4px";
        } else {
            root.style.setProperty("--flipboard-gap-width", options.gapWidth);
        }
        if (!options.hasOwnProperty("gapColor")) {
            options.gapColor = "white";
        } else {
            root.style.setProperty("--flipboard-gap-color", options.gapColor);
        }
        if (!options.hasOwnProperty("height")) {
            options.height = "260px";
        } else {
            root.style.setProperty("--flipboard-height", options.height);
        }
        if (!options.hasOwnProperty("width")) {
            options.width = "200px";
        } else {
            root.style.setProperty("--flipboard-width", options.width);
        }
        if (!options.hasOwnProperty("margin")) {
            options.margin = "40px 5px";
        } else {
            root.style.setProperty("--flipboard-margin", options.margin);
        }
        if (!options.hasOwnProperty("font")) {
            options.font = "sans-serif";
        } else {
            root.style.setProperty("--flipboard-font", options.font);
        }
        if (!options.hasOwnProperty("fontWeight")) {
            options.fontWeight = "bold";
        } else {
            root.style.setProperty("--flipboard-fontWeight", options.fontWeight);
        }
        if (!options.hasOwnProperty("perspective")) {
            options.perspective = "1000px";
        } else {
            root.style.setProperty("--flipboard-perspective", options.perspective);
        }

        const element = document.getElementById(options.parentNode);

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
    };

    //exports
    // node module
    if (typeof module != "undefined") {
        module.exports = Flipboard;
    }

    // browser global
    if (typeof window != "undefined") {
        window.Flipboard = Flipboard;
    }
})();
