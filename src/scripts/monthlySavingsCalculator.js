document.addEventListener('DOMContentLoaded', function() {
    const startingAmountInput = document.getElementById('startingAmount');
    const monthlySavingInput = document.getElementById('monthlySaving');
    const yearlyGrowthInput = document.getElementById('yearlyGrowth');
    const savingYearsInput = document.getElementById('savingYears');
    
    const startingAmountValue = document.getElementById('startingAmountValue');
    const monthlySavingValue = document.getElementById('monthlySavingValue');
    const yearlyGrowthValue = document.getElementById('yearlyGrowthValue');
    const savingYearsValue = document.getElementById('savingYearsValue');
    const totalSavingsValue = document.getElementById('totalSavingsValue');

    function updateDisplayValues() {
        startingAmountValue.textContent = `${parseFloat(startingAmountInput.value).toLocaleString()}`;
        monthlySavingValue.textContent = `${parseFloat(monthlySavingInput.value).toLocaleString()}`;
        yearlyGrowthValue.textContent = `${parseFloat(yearlyGrowthInput.value)}%`;
        savingYearsValue.textContent = `${savingYearsInput.value}`;
        totalSavingsValue.textContent = `${calculateTotalSavings().toLocaleString()}`;
    }

    function calculateTotalSavings() {
        const startingAmount = parseFloat(startingAmountInput.value);
        const monthlySaving = parseFloat(monthlySavingInput.value);
        const yearlyGrowth = parseFloat(yearlyGrowthInput.value) / 100;
        const years = parseInt(savingYearsInput.value);

        let totalAmount = startingAmount;
        for (let year = 1; year <= years; year++) {
            for (let month = 1; month <= 12; month++) {
                totalAmount += monthlySaving;
                totalAmount *= Math.pow(1 + yearlyGrowth, 1/12);
            }
        }
        return Math.round(totalAmount);
    }

    function calculateAndDisplayTotal() {
        updateDisplayValues();
    }

    // Add event listeners to inputs to recalculate on change
    startingAmountInput.addEventListener('input', calculateAndDisplayTotal);
    monthlySavingInput.addEventListener('input', calculateAndDisplayTotal);
    yearlyGrowthInput.addEventListener('input', calculateAndDisplayTotal);
    savingYearsInput.addEventListener('input', calculateAndDisplayTotal);

    // Initial calculation
    calculateAndDisplayTotal();
});

// Removed chart-related functions