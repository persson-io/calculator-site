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
    const priceIncVATInput = document.getElementById('priceIncVAT');
    const VATInput = document.getElementById('VAT');
    const taxTableInput = document.getElementById('taxTable');
    const haveStateTaxInput = document.getElementById('haveStateTax');
    const resultContent = document.getElementById('resultContent');

    function updateResults() {
        const prIcVAT = parseInt(priceIncVATInput.value);
        const V = parseInt(VATInput.value) / 100;
        const taxTbl = parseFloat(taxTableInput.value) / 100;
        const StateTax = haveStateTaxInput.checked;
        
        const { trueTax } = calculateTrueTax(taxTbl, StateTax);
        const { corporateCostBuyPrivate, extraSalary } = calculateAlternativeCost(V, prIcVAT ,trueTax);
        
        resultContent.innerHTML = `
            <p class="text-gray-600">Net salary that can be paid if the ware is not bought:</p>
            <p class="text-2xl font-bold text-gray-800"> ${extraSalary.toLocaleString()} kr</p>
            <p class="text-gray-600">Cost for the company to pay out ${prIcVAT.toLocaleString()} kr in net salary:</p>
            <p class="text-2xl font-bold text-gray-800"> ${corporateCostBuyPrivate.toLocaleString()} kr</p>
        `;
    }

    // Remove submit event listener

    // Add event listeners to input fields
    priceIncVATInput.addEventListener('input', updateResults);
    VATInput.addEventListener('input', updateResults);
    taxTableInput.addEventListener('input', updateResults);
    haveStateTaxInput.addEventListener('change', updateResults);

    // Initial calculation
    updateResults();
});