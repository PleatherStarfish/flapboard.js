(function() {
    const Flippity = class {
        constructor(options) {
            this.options = options;
            this.childNodeArray = [];

            let root = document.documentElement;

            if (!this.options.hasOwnProperty("parentNode")) {
                this.options.parentNode = "flippity";
            }
            if (!this.options.hasOwnProperty("numberOfFlipboards")) {
                this.options.parentNode = 1;
            } else if (this.options.numberOfFlipboards < 1) {
                this.options.parentNode = 1;
                console.log("flippity numberOfFlipboards property set to less than 1.");
            }
            if (!this.options.hasOwnProperty("flipTime")) {
                this.options.flipTime = "0.2s";
            } else {
                root.style.setProperty("--flippity-fliptime", this.options.flipTime);
            }
            if (!this.options.hasOwnProperty("moduloOrNextUp")) {
                this.options.flipTime = "modulo";
            }
            if (!this.options.hasOwnProperty("initialString")) {
                this.options.initialString = "Flip";
            } else {
                if (this.options.initialString.length < this.options.numberOfFlipboards) {
                    console.log("Initial string length is less than the number of flipboards.")
                }
                if (this.options.initialString.length > this.options.numberOfFlipboards) {
                    console.log("Initial string length is greater than the number of flipboards.")
                }
                this.options.initialString = this.options.initialString.split("");
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
                root.style.setProperty("--flippity-font-size", this.options.fontSize);
            }
            if (!this.options.hasOwnProperty("color")) {
                this.options.color = "white";
            } else {
                root.style.setProperty("--flippity-color", this.options.color);
            }
            if (!this.options.hasOwnProperty("backgroundColor")) {
                this.options.backgroundColor = "black";
            } else {
                root.style.setProperty(
                    "--flippity-background-color",
                    this.options.backgroundColor
                );
            }
            if (!this.options.hasOwnProperty("gapWidth")) {
                this.options.gapWidth = "4px";
            } else {
                root.style.setProperty("--flippity-gap-width", this.options.gapWidth);
            }
            if (!this.options.hasOwnProperty("gapColor")) {
                this.options.gapColor = "white";
            } else {
                root.style.setProperty("--flippity-gap-color", this.options.gapColor);
            }
            if (!this.options.hasOwnProperty("height")) {
                this.options.height = "260px";
            } else {
                root.style.setProperty("--flippity-height", this.options.height);
            }
            if (!this.options.hasOwnProperty("width")) {
                this.options.width = "200px";
            } else {
                root.style.setProperty("--flippity-width", this.options.width);
            }
            if (!this.options.hasOwnProperty("margin")) {
                this.options.margin = "40px 5px";
            } else {
                root.style.setProperty("--flippity-margin", this.options.margin);
            }
            if (!this.options.hasOwnProperty("font")) {
                this.options.font = "sans-serif";
            } else {
                root.style.setProperty("--flippity-font", this.options.font);
            }
            if (!this.options.hasOwnProperty("fontWeight")) {
                this.options.fontWeight = "bold";
            } else {
                root.style.setProperty(
                    "--flippity-fontWeight",
                    this.options.fontWeight
                );
            }
            if (!this.options.hasOwnProperty("perspective")) {
                this.options.perspective = "1000px";
            } else {
                root.style.setProperty(
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

        flip(node) {
            const nodes = document.getElementsByClassName("flippity-container");
            const nthNode = nodes[node];
            const nthNodeCard = nthNode.querySelector('.card');
            nthNodeCard.classList.toggle("is-flipped");
        }

        // roll(arrayOfStringsToRoll) {
        //     if (rollingOrStepThrough === "rolling") {
        //         if (arrayOfStringsToRoll < 2) {
        //             throw "Flippity's Roll method requires an array of at least two strings as a property"
        //         }
        //         for (let i = 0; i < arrayOfStringsToRoll.length; i++) {
        //
        //         }
        //     } else {
        //         throw "Flippity's Roll method requires rollingOrStepThrough to be set to \"rolling\""
        //     }
        // }

        render() {
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

            this.childNodeArray.forEach(item => {
                this._drawInnerHtml(item, upNow, upNext);
            });
        }
    };

    //exports
    // node module
    if (typeof module != "undefined") {
        module.exports = Flippity;
    }

    // browser global
    if (typeof window != "undefined") {
        window.Flippity = Flippity;
    }
})();
