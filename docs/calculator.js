const MINIMUM_WAGE = 1518;

const petCosts = {
    small: {
        initial: {
            'Casinha': 60,
            'Coleira': 40,
            'Consulta inicial': 175,
            'Vacinas iniciais': 460,
        },
        monthly: {
            'Ração (15kg)': 125.5,
            'Banho': 40,
        },
        yearly: {
            'Castração': 120,
            'Hemograma': 33,
            'Vermífugo': 33,
            'Vacinas anuais': 270
        }
    },
    large: {
        initial: {
            'Casinha': 357,
            'Coleira': 121,
            'Consulta inicial': 250,
            'Vacinas iniciais': 270,
        },
        monthly: {
            'Ração (15kg)': 150,
            'Banho': 80,
        },
        yearly: {
            'Castração': 1400,
            'Hemograma': 33,
            'Vermífugo': 33,
            'Vacinas anuais': 270
        }
    },
    cat: {
        initial: {
            'Casinha': 200,
            'Coleira': 5,
            'Consulta inicial': 150,
            'Vacinas iniciais': 100,
        },
        monthly: {
            'Ração': 15,
            'Areia': 25,
        },
        yearly: {
            'Castração': 180,
            'Hemograma': 85,
            'Vermífugo': 15,
            'Vacinas anuais': 100
        }
    }
};

function calculateCosts(costs) {
    return Object.values(costs).reduce((sum, cost) => sum + cost, 0);
}

function displayCostsList(costs, elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    for (const [item, cost] of Object.entries(costs)) {
        element.innerHTML += `<div class="cost-item">${item}: R$ ${cost.toFixed(2)}</div>`;
    }
}

function selectPetType(type) {
    const pet = petCosts[type];
    
    displayCostsList(pet.initial, 'initialCostsList');
    displayCostsList(pet.monthly, 'monthlyCostsList');
    displayCostsList(pet.yearly, 'yearCostsList');
    
    const initialTotal = calculateCosts(pet.initial);
    const monthlyTotal = calculateCosts(pet.monthly);
    const yearlyTotal = calculateCosts(pet.yearly);
    
    document.getElementById('initialTotal').textContent = initialTotal.toFixed(2);
    document.getElementById('monthlyTotal').textContent = monthlyTotal.toFixed(2);
    
    const firstYearTotal = initialTotal + (monthlyTotal * 12) + yearlyTotal;
    document.getElementById('yearTotal').textContent = firstYearTotal.toFixed(2);
    
    const monthlyPercentage = (monthlyTotal / MINIMUM_WAGE * 100).toFixed(2);
    document.getElementById('salaryPercentage').textContent = monthlyPercentage;
}
