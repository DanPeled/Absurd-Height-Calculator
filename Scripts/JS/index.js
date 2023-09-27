let resultText = document.getElementById("resultText")
let calcButton = document.getElementById("calculateButton")
let textArea = document.getElementById("textarea")
let measurementDropdown = document.getElementById("measurementDropdown")
let measurementTypeDropdown = document.getElementById("measure-type")


const calculationHeightMeasures = {
    "snail": 0.045,
    "water bear": 0.0012,
    "axolotl": 0.3,
    "star nosed mole": 0.019,
    "lowland streaked ternec": 0.14,
    "dumbo octopus": 0.25,
    "pink fairy armadillo": 0.115,
    "red lipped batfish": 0.4,
    "hedgehog": 0.3,
    "three year-old": 1.016,
    "blobfish": 0.3,
    "tomato": 0.07,
    "bamba": 0.03
}
const calculationWeightMeasures = {
    "snail": 0.003028,
    "water bear": 0.00001,
    "axolotl": 2.5,
    "star nosed mole": 0.049,
    "lowland streaked ternec": 2.25,
    "dumbo octopus": 5.9,
    "pink fairy armadillo": 0.120,
    "red lipped batfish": 0.9,
    "hedgehog": 0.8,
    "three year-old": 13.5,
    "blobfish": 9,
    "tomato": 0.455,
    "bamba": 0.00189
}

function calc(height, measure, measureType) {
    const measurement = (measureType == "height") ?
        calculationHeightMeasures[measure] : calculationWeightMeasures[measure];

    const suffix = toTitleCase(measure);
    const newHeight = height / measurement;
    if (newHeight !== 1) {
        resultText.innerText = `${newHeight.toFixed(2)} ${suffix}s`
    } else {
        resultText.innerText = `${newHeight.toFixed(2)} ${suffix}`
    }
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
    calc(textArea.value, measurementDropdown.value, measurementTypeDropdown.value)
})

function toTitleCase(str) {
    if (str != undefined) {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1))
        }).join(' ')
    }
}

var options = Array.from(measurementDropdown.options)
options.sort(function (a, b) {
    return a.text.localeCompare(b.text)
})
measurementDropdown.innerHTML = ""
options.forEach(function (option) {
    measurementDropdown.appendChild(option)
})

function sortTable(table) {
    var rows = Array.from(table.querySelectorAll("tr"));
    rows.shift(); // Remove the header row
    rows.sort(function (a, b) {
        var measurementA = a.cells[0].textContent.toLowerCase();
        var measurementB = b.cells[0].textContent.toLowerCase();
        return measurementA.localeCompare(measurementB);
    });
    rows.forEach(function (row) {
        table.appendChild(row);
    });
}
var tables = document.querySelectorAll("table");

tables.forEach(function (table) {
    sortTable(table);
});