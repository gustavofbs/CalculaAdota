const MINIMUM_WAGE = 1518;

const petCosts = {
    small: {
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
    large: {
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
    cat: {
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

function selectPetType(type) {
    const costs = petCosts[type];
    const costsList = document.getElementById('costsList');
    costsList.innerHTML = '';
    
    let total = 0;
    
    for (const [item, cost] of Object.entries(costs)) {
        total += cost;
        costsList.innerHTML += `<div>${item}: R$ ${cost.toFixed(2)}</div>`;
    }
    
    document.getElementById('totalCost').textContent = total.toFixed(2);
    const percentage = (total / MINIMUM_WAGE * 100).toFixed(2);
    document.getElementById('salaryPercentage').textContent = percentage;
}
