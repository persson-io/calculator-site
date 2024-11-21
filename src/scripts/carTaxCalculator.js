function calculateCarTax(purchasePrice, taxRate) {
    return purchasePrice * (taxRate / 100);
}

// Remove old event listeners and consolidate into one form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('carTaxForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const carPrice = parseFloat(document.getElementById('carPrice').value);
            const taxRate = parseFloat(document.getElementById('taxRate').value);
            const resultContent = document.getElementById('resultContent');
            
            const tax = calculateCarTax(carPrice, taxRate);
            
            resultContent.innerHTML = `
                <p class="text-gray-600">Car Price: $${carPrice.toLocaleString()}</p>
                <p class="text-gray-600">Tax Rate: ${taxRate}%</p>
                <p class="text-xl font-semibold text-blue-600 mt-2">Tax Amount: $${tax.toLocaleString()}</p>
            `;
        });
    }
});