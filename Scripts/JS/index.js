let resultText = document.getElementById("resultText");
let calcButton = document.getElementById("calculateButton");
let textArea = document.getElementById("textarea");
let measurementDropdown = document.getElementById("measurementDropdown");
let measurementTypeDropdown = document.getElementById("measure-type");

const calculationMeasures = {
    "snail": { weight: 0.003028, height: 0.045 },
    "water bear": { weight: 0.00001, height: 0.0012 },
    "axolotl": { weight: 2.5, height: 0.3 },
    "star nosed mole": { weight: 0.049, height: 0.019 },
    "lowland streaked ternec": { weight: 2.25, height: 0.14 },
    "dumbo octopus": { weight: 5.9, height: 0.25 },
    "pink fairy armadillo": { weight: 0.120, height: 0.115 },
    "red lipped batfish": { weight: 0.9, height: 0.4 },
    "hedgehog": { weight: 0.8, height: 0.3 },
    "three year-old": { weight: 13.5, height: 1.016 },
    "blobfish": { weight: 9, height: 0.3 },
    "tomato": { weight: 0.455, height: 0.07 },
    "bamba": { weight: 0.00189, height: 0.03 },
    "stanley even-heat pot": { weight: 1.238307, height: 0.213106 }
};

function calc(value, measure, measureType) {
    const { weight, height } = calculationMeasures[measure];

    const suffix = toTitleCase(measure);
    const newValue = (measureType === "height") ? value / height : value / weight;

    if (newValue !== 1) {
        resultText.innerText = `${newValue.toFixed(2)} ${suffix}s`;
    } else {
        resultText.innerText = `${newValue.toFixed(2)} ${suffix}`;
    }
}

function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }

                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

setInputFilter(textArea, function (value) {
    return /^\d*\.?\d*$/.test(value);
}, "Only digits and '.' are allowed");

calcButton.addEventListener("click", function () {
    calc(parseFloat(textArea.value), measurementDropdown.value, measurementTypeDropdown.value);
});

function toTitleCase(str) {
    if (str != undefined) {
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
}

var options = Array.from(measurementDropdown.options);
options.sort(function (a, b) {
    return a.text.localeCompare(b.text);
});
measurementDropdown.innerHTML = "";
options.forEach(function (option) {
    measurementDropdown.appendChild(option);
});

function sortTable(table) {
    var rows = Array.from(table.querySelectorAll("tr"));
    rows.shift();
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
