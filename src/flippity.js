(function() {
    const Flippity = class {
        constructor(options) {
            this.options = options;
            this.childNodeArray = [];
            this.root = document.documentElement;
            this.upNow = undefined;

            if (!this.options.hasOwnProperty("parentNode")) {
                this.options.parentNode = "flippity";
            }
            if (!this.options.hasOwnProperty("numberOfFlipboards")) {
                this.options.numberOfFlipboards = 1;
            } else if (this.options.numberOfFlipboards < 1) {
                this.options.numberOfFlipboards = 1;
                console.log("Flippity numberOfFlipboards property set to less than 1.");
            }
            if (!this.options.hasOwnProperty("flipTime")) {
                this.options.flipTime = `${0.2}s`;
            } else {
                this.root.style.setProperty("--flippity-fliptime", `${this.options.flipTime}s`);
            }
            if (!this.options.hasOwnProperty("moduloOrNextUp")) {
                this.options.flipTime = "modulo";
            }
            if (!this.options.hasOwnProperty("synchronous")) {
                this.options.synchronous = true;
            }
            if (!this.options.hasOwnProperty("clickable")) {
                this.options.clickable = false;
            }
            if (!this.options.hasOwnProperty("rollingOrStepThrough")) {
                this.options.rollingOrStepThrough = "rolling";
            }
            if (!this.options.hasOwnProperty("rollingDelay")) {
                this.options.rollingDelay = "0.5s";
            }
            if (!this.options.hasOwnProperty("updateDirection")) {
                this.options.updateDirection = "left to right";
            }
            if (!this.options.hasOwnProperty("fontSize")) {
                this.options.fontSize = "100pt";
            } else {
                this.root.style.setProperty("--flippity-font-size", this.options.fontSize);
            }
            if (!this.options.hasOwnProperty("color")) {
                this.options.color = "white";
            } else {
                this.root.style.setProperty("--flippity-color", this.options.color);
            }
            if (!this.options.hasOwnProperty("backgroundColor")) {
                this.options.backgroundColor = "black";
            } else {
                this.root.style.setProperty(
                    "--flippity-background-color",
                    this.options.backgroundColor
                );
            }
            if (!this.options.hasOwnProperty("gapWidth")) {
                this.options.gapWidth = "4px";
            } else {
                this.root.style.setProperty("--flippity-gap-width", this.options.gapWidth);
            }
            if (!this.options.hasOwnProperty("gapColor")) {
                this.options.gapColor = "white";
            } else {
                this.root.style.setProperty("--flippity-gap-color", this.options.gapColor);
            }
            if (!this.options.hasOwnProperty("height")) {
                this.options.height = "260px";
            } else {
                this.root.style.setProperty("--flippity-height", this.options.height);
            }
            if (!this.options.hasOwnProperty("width")) {
                this.options.width = "200px";
            } else {
                this.root.style.setProperty("--flippity-width", this.options.width);
            }
            if (!this.options.hasOwnProperty("margin")) {
                this.options.margin = "40px 5px";
            } else {
                this.root.style.setProperty("--flippity-margin", this.options.margin);
            }
            if (!this.options.hasOwnProperty("font")) {
                this.options.font = "sans-serif";
            } else {
                this.root.style.setProperty("--flippity-font", this.options.font);
            }
            if (!this.options.hasOwnProperty("fontWeight")) {
                this.options.fontWeight = "bold";
            } else {
                this.root.style.setProperty(
                    "--flippity-fontWeight",
                    this.options.fontWeight
                );
            }
            if (!this.options.hasOwnProperty("perspective")) {
                this.options.perspective = "1000px";
            } else {
                this.root.style.setProperty(
                    "--flippity-perspective",
                    this.options.perspective
                );
            }
        }

        _drawInnerHtml(node, upNow, upNext) {
            node.innerHTML = `<div class="scene scene--card">

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
        }

        // Flip a whole deck of flippers (once)
        _rollDeck(upNext) {

            if (this.options.rollingOrStepThrough !== "rolling") {
                throw "Flippity's _rollDeck method requires rollingOrStepThrough to be set to \"rolling\""
            }
            if (typeof upNext !== 'string' || (!(upNext instanceof String))) {
                upNext = String(upNext)
            }

            const upNextArray = upNext.split("");
            this.root.style.setProperty("--flippity-fliptime", `${0}s`);

            this.childNodeArray.forEach((parentNode, index) => {
                let card = parentNode.querySelector('.card');
                card.classList.remove("is-flipped");
                // this._drawInnerHtml(parentNode, this.upNow[index], upNextArray[index]);

                let background = parentNode.querySelector('.background');
                let backgroundTop = background.querySelector('.number__top');
                console.log(backgroundTop);
                backgroundTop.innerHTML = String(upNextArray[index]);

                let frontTop = card.querySelector('.card__face--front-top');
                let numberTop = frontTop.querySelector('.number__top');
                console.log(numberTop);
                numberTop.innerHTML = String(this.upNow[index]);

                let back = card.querySelector('.card__face--back');
                let numberflipped = back.querySelector('.number__top--flipped');
                numberflipped.innerHTML = String(upNextArray[index]);

                let frontBack = parentNode.querySelector('.card__face--front-bottom');
                let numberBottom = frontBack.querySelector('.number__bottom');
                numberBottom.innerHTML = String(this.upNow[index]);
            });

            this.root.style.setProperty("--flippity-fliptime", `${this.options.flipTime}s`);


            // short delay time to wait for innerHTML to be set
            setTimeout(() => {
                this.childNodeArray.forEach((parentNode, index) => {
                    let card = parentNode.querySelector('.card');
                    card.classList.add("is-flipped");
                });
            }, 0);

        }

        render(upNow) {

            if (typeof upNow !== 'string' || (!(upNow instanceof String))) {
                upNow = String(upNow)
            }
            if (!this.upNow) {
                this.upNow = upNow.split("");
            }

            const element = document.getElementById(this.options.parentNode);

            // create div for each letter, number, etc.
            let counter = 0;
            do {
                const div = document.createElement("div");
                div.classList.add("flippity-container");
                element.appendChild(div);
                counter += 1;
            } while (counter < this.options.numberOfFlipboards);

            // Get nodeList and convert to list
            const nodeList = element.childNodes;
            this.childNodeArray = [...nodeList];

            this.childNodeArray.forEach((v, i) => {
                this._drawInnerHtml(v, this.upNow[i], this.upNow[i]);
            });
        }
    };

    // browser global
    if (typeof window != "undefined") {
        window.Flippity = Flippity;
    } else {
        throw "No window found."
    }

})();
