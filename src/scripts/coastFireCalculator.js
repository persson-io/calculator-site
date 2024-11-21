function calculateCoastFire(currentAge, retirementAge, annualExpenses) {
    const withdrawalRate = 0.04; // 4% rule
    const targetAmount = annualExpenses / withdrawalRate;
    const yearsToRetirement = retirementAge - currentAge;
    return { targetAmount, yearsToRetirement };
}

// Remove old event listeners and consolidate into one form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('coastfire-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const currentAge = parseInt(document.getElementById('current-age').value);
            const retirementAge = parseInt(document.getElementById('retirement-age').value);
            const annualExpenses = parseFloat(document.getElementById('annual-expenses').value);
            const resultContent = document.getElementById('resultContent');
            
            const { targetAmount, yearsToRetirement } = calculateCoastFire(currentAge, retirementAge, annualExpenses);
            
            resultContent.innerHTML = `
                <p class="text-gray-600">Years until retirement: ${yearsToRetirement}</p>
                <p class="text-gray-600">Annual Expenses: $${annualExpenses.toLocaleString()}</p>
                <p class="text-xl font-semibold text-blue-600 mt-2">Target Amount: $${targetAmount.toLocaleString()}</p>
            `;
        });
    }
});