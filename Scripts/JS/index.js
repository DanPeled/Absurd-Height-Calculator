let resultText = document.getElementById("resultText")
let calcButton = document.getElementById("calculateButton")
let textArea = document.getElementById("textarea")
let dropdown = document.getElementById("dropdown")

const calculationFunctions = {
    "snail": calcSnail,
    "water bear": calcWaterBear,
    "axolotl": calcAxolotl,
    "star nosed mole": calcStarNosedMole,
    "lowland streaked ternec": calcLowlandStreakedTernec,
    "dumbo octopus": calcDumboOctopus,
    "pink fairy armadillo": calcPinkFairyArmadillo,
    "red lipped batfish": calcRedLippedBatfish,
    "hedgehog": calcHedgehog,
    "three year-old": calcThreeYearOld,
    "blobfish": calcBlobfish,
    "tomato": calcTomato
}
function calc(height, type) {
    const func = calculationFunctions[type] || calcBamba
    const suffix = toTitleCase(type)

    if (func(height) !== 1) {
        resultText.innerText = `${func(height).toFixed(2)} ${suffix}s`
    } else {
        resultText.innerText = `${func(height).toFixed(2)} ${suffix}`
    }
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
    return height / 0.25
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
function calcThreeYearOld(height) {
    return height / 1.016
}
function calcBlobfish(height) {
    return height / 0.3
}
function calcTomato(height){
    return height / 0.07
}
// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value.
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error")
                    this.setCustomValidity("")
                }

                this.oldValue = this.value
                this.oldSelectionStart = this.selectionStart
                this.oldSelectionEnd = this.selectionEnd
            }
            else if (this.hasOwnProperty("oldValue")) {
                // Rejected value: restore the previous one.
                this.classList.add("input-error")
                this.setCustomValidity(errMsg)
                this.reportValidity()
                this.value = this.oldValue
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd)
            }
            else {
                // Rejected value: nothing to restore.
                this.value = ""
            }
        })
    })
}

setInputFilter(textArea, function (value) {
    return /^\d*\.?\d*$/.test(value) // Allow digits and '.' only
}, "Only digits and '.' are allowed")

calcButton.addEventListener("click", function () {
    calc(textArea.value, dropdown.value)
})

function toTitleCase(str) {
    if (str != undefined) {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1))
        }).join(' ')
    }
}

var options = Array.from(dropdown.options)
options.sort(function (a, b) {
    return a.text.localeCompare(b.text)
})
dropdown.innerHTML = ""
options.forEach(function (option) {
    dropdown.appendChild(option)
})

// Sort the table rows alphabetically (excluding the header)
var table = document.querySelector("table")
var rows = Array.from(table.querySelectorAll("tr"))
rows.shift() // Remove the header row
rows.sort(function (a, b) {
    var measurementA = a.cells[0].textContent.toLowerCase()
    var measurementB = b.cells[0].textContent.toLowerCase()
    return measurementA.localeCompare(measurementB)
})
rows.forEach(function (row) {
    table.appendChild(row)
})