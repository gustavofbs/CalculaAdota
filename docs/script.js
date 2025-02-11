const petCosts = {
    'small-dog': {
        'Ração (15kg)': 125.5,
        'Casinha': 60,
        'Coleira': 40,
        'Consulta': 175,
        'Vacina': 460,
        'Castração': 120,
        'Hemograma': 33,
        'Vermífugo': 33,
        'Banho': 40,
        'Hospedagem em hotel (diária)': 150
    },
    'large-dog': {
        'Ração (15kg)': 150,
        'Casinha': 357,
        'Coleira': 121,
        'Consulta': 250,
        'Vacina': 270,
        'Castração': 1400,
        'Hemograma': 33,
        'Vermífugo': 33,
        'Banho': 80,
        'Hospedagem em hotel (diária)': 150
    },
    'cat': {
        'Ração': 15,
        'Casinha': 200,
        'Coleira': 5,
        'Consulta': 150,
        'Vacina': 100,
        'Castração': 180,
        'Hemograma': 85,
        'Vermífugo': 15,
        'Hospedagem em hotel (diária)': 145
    }
};

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function updateCosts() {
    const petType = document.getElementById('petType').value;
    const costs = petCosts[petType];
    const costBreakdown = document.getElementById('costBreakdown');
    const totalCostElement = document.getElementById('totalCost');
    
    costBreakdown.innerHTML = '';
    let total = 0;

    for (const [item, cost] of Object.entries(costs)) {
        total += cost;
        const costItem = document.createElement('div');
        costItem.className = 'cost-item';
        costItem.innerHTML = `
            <span>${item}</span>
            <span>${formatCurrency(cost)}</span>
        `;
        costBreakdown.appendChild(costItem);
    }

    totalCostElement.textContent = formatCurrency(total);
}

document.getElementById('petType').addEventListener('change', updateCosts);

// Initialize costs on page load
document.addEventListener('DOMContentLoaded', updateCosts);
