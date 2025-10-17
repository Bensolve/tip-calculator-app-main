// ================================
// Tip Calculator – Modern JS (Live Update)
// ================================

document.addEventListener("DOMContentLoaded", () => {
  // ====== Select key elements ======
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const tipRadios = document.querySelectorAll(".calculator__radio[name='tip']");
  const customTipInput = document.querySelector(".calculator__input--custom");
  const tipAmountOutput = document.getElementById("tip-amount");
  const totalAmountOutput = document.getElementById("total-amount");
  const resetButton = document.getElementById("reset-button");

  // ====== Core state ======
  let billValue = 0;
  let tipPercent = 0;
  let peopleCount = 1;

  // ====== Helper: Format currency ======
  const formatCurrency = (num) => `$${num.toFixed(2)}`;

  // ====== Helper: Calculate totals ======
  const calculate = () => {
    if (billValue > 0 && peopleCount > 0) {
      const tipTotal = (billValue * tipPercent) / 100;
      const tipPerPerson = tipTotal / peopleCount;
      const totalPerPerson = (billValue + tipTotal) / peopleCount;

      tipAmountOutput.textContent = formatCurrency(tipPerPerson);
      totalAmountOutput.textContent = formatCurrency(totalPerPerson);
    } else {
      tipAmountOutput.textContent = "$0.00";
      totalAmountOutput.textContent = "$0.00";
    }
  };

  // ====== Handle bill input ======
  billInput.addEventListener("input", () => {
    billValue = parseFloat(billInput.value) || 0;
    calculate();
  });

  // ====== Handle number of people input + validation ======
  peopleInput.addEventListener("input", () => {
    const fieldset = peopleInput.closest(".calculator__fieldset");
    const errorText = document.getElementById("people-error");
    const value = parseInt(peopleInput.value, 10);

    if (value === 0 || peopleInput.value.trim() === "") {
      fieldset.classList.add("calculator__fieldset--error");
      peopleInput.classList.add("calculator__input--error");
      errorText.style.display = "inline";
      peopleCount = 0;
    } else {
      fieldset.classList.remove("calculator__fieldset--error");
      peopleInput.classList.remove("calculator__input--error");
      errorText.style.display = "none";
      peopleCount = value;
    }
    calculate();
  });

  // ====== Handle tip button selection ======
  tipRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      tipPercent = parseFloat(radio.value);
      customTipInput.value = ""; // clear custom field if a preset tip is picked
      calculate();
    });
  });

  // ====== Handle custom tip input ======
  customTipInput.addEventListener("input", () => {
    tipPercent = parseFloat(customTipInput.value) || 0;
    tipRadios.forEach((radio) => (radio.checked = false)); // uncheck preset tips
    calculate();
  });

  // ====== Handle Reset ======
  resetButton.addEventListener("click", () => {
    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";
    tipRadios.forEach((radio) => (radio.checked = false));

    billValue = 0;
    tipPercent = 0;
    peopleCount = 1;

    // reset error state if visible
    const fieldset = peopleInput.closest(".calculator__fieldset");
    fieldset.classList.remove("calculator__fieldset--error");
    peopleInput.classList.remove("calculator__input--error");
    document.getElementById("people-error").style.display = "none";

    tipAmountOutput.textContent = "$0.00";
    totalAmountOutput.textContent = "$0.00";
  });
});
