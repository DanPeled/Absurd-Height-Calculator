let resultText = document.getElementById("resultText")
let calcButton = document.getElementById("calculateButton")
let textArea = document.getElementById("textarea")
let dropdown = document.getElementById("dropdown")
function calc(height, type) {
    let func = calcBamba
    let suffix = "Bamba"
    switch (type) {
        case ("snail"):
            func = calcSnail
            break
        case ("water bear"):
            func = calcWaterBear
            break
        case ("axolotl"):
            func = calcAxolotl
            break
        case ("star nosed mole"):
            func = calcStarNosedMole
            break
        case ("lowland streaked ternec"):
            func = calcLowlandStreakedTernec
            break
        case ("dumbo octopus"):
            func = calcDumboOctopus
            break
        case ("pink fairy armadillo"):
            func = calcPinkFairyArmadillo
            break
        case ("red lipped batfish"):
            func = calcRedLippedBatfish
            break
        case ("hedgehog"):
            func = calcHedgehog
            break
    }
    suffix = toTitleCase(type)
    if (func(height) != 1) {
        suffix += "s"
    }

    resultText.innerText = func(height).toFixed(2) + " " + suffix
}
function calcBamba(height) {
    return height / 0.03
}

function calcSnail(height) {
    return height / 0.045
}

function calcWaterBear(height) {
    return height / 0.0012
}

function calcAxolotl(height) {
    return height / 0.3
}

function calcStarNosedMole(height) {
    return height / 0.019
}

function calcLowlandStreakedTernec(height) {
    return height / 0.14
}

function calcDumboOctopus(height) {
    return height / 1.8
}

function calcPinkFairyArmadillo(height) {
    return height / 0.115
}

function calcRedLippedBatfish(height) {
    return height / 0.4
}

function calcHedgehog(height) {
    return height / 0.3
}

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value.
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }

                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            }
            else if (this.hasOwnProperty("oldValue")) {
                // Rejected value: restore the previous one.
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
            else {
                // Rejected value: nothing to restore.
                this.value = "";
            }
        });
    });
}

setInputFilter(textArea, function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only
}, "Only digits and '.' are allowed");

calcButton.addEventListener("click", function () {
    calc(textArea.value, dropdown.value)
})

function toTitleCase(str) {
    if (str != undefined) {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
}