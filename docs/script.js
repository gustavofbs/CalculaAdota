const defaultPetCosts = {
    'small-dog': {
        'Ração (15kg)': { price: 125, quantity: 1 },
        'Casinha': { price: 60, quantity: 1 },
        'Coleira': { price: 40, quantity: 1 },
        'Consulta': { price: 175, quantity: 1 },
        'Vacina': { price: 460, quantity: 1 },
        'Castração': { price: 120, quantity: 1 },
        'Hemograma': { price: 33, quantity: 1 },
        'Vermífugo': { price: 33, quantity: 1 },
        'Banho': { price: 40, quantity: 1 },
        'Hospedagem em hotel (diária)': { price: 150, quantity: 1 }
    },
    'large-dog': {
        'Ração (15kg)': { price: 150, quantity: 1 },
        'Casinha': { price: 357, quantity: 1 },
        'Coleira': { price: 121, quantity: 1 },
        'Consulta': { price: 250, quantity: 1 },
        'Vacina': { price: 270, quantity: 1 },
        'Castração': { price: 1400, quantity: 1 },
        'Hemograma': { price: 33, quantity: 1 },
        'Vermífugo': { price: 33, quantity: 1 },
        'Banho': { price: 80, quantity: 1 },
        'Hospedagem em hotel (diária)': { price: 150, quantity: 1 }
    },
    'cat': {
        'Ração': { price: 15, quantity: 1 },
        'Casinha': { price: 200, quantity: 1 },
        'Coleira': { price: 5, quantity: 1 },
        'Consulta': { price: 150, quantity: 1 },
        'Vacina': { price: 100, quantity: 1 },
        'Castração': { price: 180, quantity: 1 },
        'Hemograma': { price: 85, quantity: 1 },
        'Vermífugo': { price: 15, quantity: 1 },
        'Hospedagem em hotel (diária)': { price: 145, quantity: 1 }
    }
};

let currentCosts = {};

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function createTableRow(item, data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <input type="text" value="${item}" class="item-name" />
        </td>
        <td>
            <input type="number" value="${data.price}" min="0" step="0.01" class="item-price" />
        </td>
        <td>
            <input type="number" value="${data.quantity}" min="1" class="item-quantity" />
        </td>
        <td class="item-total">${formatCurrency(data.price * data.quantity)}</td>
        <td class="actions">
            <button class="btn btn-remove">Remover</button>
        </td>
    `;

    // Add event listeners for input changes
    const priceInput = row.querySelector('.item-price');
    const quantityInput = row.querySelector('.item-quantity');
    const nameInput = row.querySelector('.item-name');
    const totalCell = row.querySelector('.item-total');

    function updateTotal() {
        const price = parseFloat(priceInput.value) || 0;
        const quantity = parseInt(quantityInput.value) || 1;
        totalCell.textContent = formatCurrency(price * quantity);
        updateGrandTotal();
    }

    priceInput.addEventListener('input', updateTotal);
    quantityInput.addEventListener('input', updateTotal);
    nameInput.addEventListener('input', updateTotal);

    // Add remove button event listener
    row.querySelector('.btn-remove').addEventListener('click', () => {
        row.remove();
        updateGrandTotal();
    });

    return row;
}

function updateGrandTotal() {
    const totalCostElement = document.getElementById('totalCost');
    let total = 0;

    document.querySelectorAll('#costsTableBody tr').forEach(row => {
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const quantity = parseInt(row.querySelector('.item-quantity').value) || 1;
        total += price * quantity;
    });

    totalCostElement.textContent = formatCurrency(total);
}

function updateCosts() {
    const petType = document.getElementById('petType').value;
    const costsTableBody = document.getElementById('costsTableBody');
    
    // Clear existing rows
    costsTableBody.innerHTML = '';
    
    // Load default costs for selected pet type
    currentCosts = JSON.parse(JSON.stringify(defaultPetCosts[petType]));
    
    // Create table rows for each cost
    Object.entries(currentCosts).forEach(([item, data]) => {
        costsTableBody.appendChild(createTableRow(item, data));
    });

    updateGrandTotal();
}

function addNewCost() {
    const costsTableBody = document.getElementById('costsTableBody');
    const newRow = createTableRow('Novo item', { price: 0, quantity: 1 });
    costsTableBody.appendChild(newRow);
    updateGrandTotal();
}

// Função para gerar e baixar o PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Configurações do documento
    doc.setFont("helvetica");
    doc.setFontSize(16);
    
    // Título
    doc.text("Relatório de Custos - Adoção Pet", 105, 20, { align: "center" });
    
    // Tipo do Pet
    const petType = document.getElementById('petType');
    const petTypeText = petType.options[petType.selectedIndex].text;
    doc.setFontSize(12);
    doc.text(`Tipo do Pet: ${petTypeText}`, 20, 30);
    
    // Data do relatório
    const currentDate = new Date().toLocaleDateString('pt-BR');
    doc.text(`Data do relatório: ${currentDate}`, 20, 40);

    // Tabela de custos
    const tableData = [];
    document.querySelectorAll('#costsTableBody tr').forEach(row => {
        const item = row.querySelector('.item-name').value;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const quantity = parseInt(row.querySelector('.item-quantity').value) || 1;
        const total = price * quantity;
        
        tableData.push([
            item,
            formatCurrency(price),
            quantity.toString(),
            formatCurrency(total)
        ]);
    });

    // Adicionar tabela ao PDF
    doc.autoTable({
        startY: 50,
        head: [['Item', 'Preço', 'Quantidade', 'Total']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [67, 97, 238] },
        styles: { fontSize: 10 }
    });

    // Custo Total
    const totalCost = document.getElementById('totalCost').textContent;
    const finalY = doc.lastAutoTable.finalY || 50;
    doc.text(`Custo Total: ${totalCost}`, 20, finalY + 10);
    
    // Referência salarial
    doc.setFontSize(10);
    doc.text("Referência: Salário Mínimo 2025 - R$ 1.518,00", 20, finalY + 20);

    // Salvar o PDF
    doc.save('relatorio-custos-pet.pdf');
}

// Event Listeners
document.getElementById('petType').addEventListener('change', updateCosts);
document.getElementById('addCost').addEventListener('click', addNewCost);
document.getElementById('downloadPDF').addEventListener('click', generatePDF);

// Initialize costs on page load
document.addEventListener('DOMContentLoaded', updateCosts);
