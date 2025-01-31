function addField() {
    const fieldNameInput = document.getElementById('fieldName');
    const fieldName = fieldNameInput.value.trim();
    if (fieldName) {
        const container = document.getElementById('fieldsContainer');
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = fieldName;
        input.className = "border p-2 w-full"; 
        container.appendChild(input);
        container.appendChild(document.createElement('br'));
        fieldNameInput.value = '';  
    } else {
        alert('Please enter a field name.');
    }
}

function saveTemplate() {
    const fields = Array.from(document.querySelectorAll('#fieldsContainer input')).map(input => ({
        placeholder: input.placeholder,
        value: input.value
    }));
    localStorage.setItem('template', JSON.stringify(fields));
    alert('Template saved!');
}

function loadTemplate() {
    const fields = JSON.parse(localStorage.getItem('template'));
    if (fields) {
        const container = document.getElementById('fieldsContainer');
        container.innerHTML = '';  
        fields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = field.placeholder;
            input.value = field.value;
            input.className = "border p-2 w-full";
            container.appendChild(input);
            container.appendChild(document.createElement('br'));
        });
    }
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let y = 20;
    const fields = document.querySelectorAll('#fieldsContainer input');
    doc.text("Generated Template", 10, 10);
    
    fields.forEach((input) => {
        doc.text(`${input.placeholder}: ${input.value}`, 10, y);
        y += 10;
    });

    doc.save("temp
        