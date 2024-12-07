function calculateTrueTax(taxTable, haveStateTax) {
    const AGI = 1.3142;
    let stateTax;
    if (haveStateTax) {
        stateTax = 0.2
    }
    else {
        stateTax = 0  
    };
    const totalIncomeTax = taxTable + stateTax;
    const trueTax = (1 - (1 - totalIncomeTax) / AGI);
    return { trueTax };
}

function calculateAlternativeCost(VAT, priceIncVAT, trueTax) {
    const priceExVAT = priceIncVAT / (1+VAT);
    const afterTaxPct = 1 - trueTax;
    const corporateCostBuyPrivate = Math.round(priceIncVAT / afterTaxPct);
    const extraSalary = Math.round(priceExVAT * afterTaxPct);
    return { corporateCostBuyPrivate, extraSalary };
}

// Remove old event listeners and consolidate into one form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expensesForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const prIcVAT = parseInt(document.getElementById('priceIncVAT').value);
            const V = parseInt(document.getElementById('VAT').value) / 100;
            const taxTbl = parseFloat(document.getElementById('taxTable').value) / 100;;
            const StateTax = (document.getElementById('haveStateTax').checked);
            const resultContent = document.getElementById('resultContent');
            
            const { trueTax } = calculateTrueTax(taxTbl, StateTax);
            const { corporateCostBuyPrivate, extraSalary } = calculateAlternativeCost(V, prIcVAT ,trueTax);
            
            resultContent.innerHTML = `
                <p class="text-gray-600">Salary that can be paid if the ware is not bought: ${extraSalary.toLocaleString()} kr</p>
                <p class="text-gray-600">Cost for the company to pay out ${prIcVAT.toLocaleString()} kr in salary: ${corporateCostBuyPrivate.toLocaleString()} kr</p>
            `;
        });
    }
});