"use strict";
var input = document.getElementById('monto');
const btnAgregar = document.getElementById('btnAgregarPersona')
const btnCalcular = document.getElementById('btnCalcular')
const formulario = document.getElementById('formulario')
const listado = document.getElementById('listado').querySelector('tbody');


input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        btnAgregar.click();
    }
});

btnAgregar.addEventListener('click', () => {
    let nombre = formulario.querySelector('.nombre');
    let categoria = formulario.querySelector('.categoria');
    let monto = formulario.querySelector('.monto');

    const tr = document.createElement('tr');
    tr.classList.add('align-middle');
    tr.classList.add('persona');

    tr.innerHTML = `
        <td class=\"nombre\">${nombre.value}</td>
        <td>${categoria.value}</td>
        <td>
            <span>$ </span>
            <span class=\"monto\">${monto.value}</span>
        </td>
    `;

    const td = document.createElement('td');
    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn-outline-danger btn-delete';
    btnDelete.innerHTML = '<i class="bi bi-trash"></i>';
    btnDelete.addEventListener('click', () => {
        const item = btnDelete.parentElement.parentElement;
        let monto = item.querySelector('.monto').textContent;

        actualizarTotal(-monto);
        listado.removeChild(item);
    });
    
    td.appendChild(btnDelete);
    tr.appendChild(td);
    
    if (nombre.value && categoria.value && monto.value) {
        listado.appendChild(tr);
        actualizarTotal(monto.value);
        nombre.value = categoria.value = monto.value = '';
        nombre.focus();
    }
});

btnCalcular.addEventListener('click', () => {
    console.log(getGastos());
    
});

function getGastos(){
    let gastos = [];
    document.querySelectorAll('.persona').forEach(persona => {
        let gasto = {
            nombre: persona.querySelector('.nombre').textContent,
            monto: persona.querySelector('.monto').textContent
        }
        gastos.push(gasto);
    });
    return gastos;
}

function actualizarTotal(monto){
//accion (1 = agregar ; 0 = restar)
    let total = parseFloat(document.getElementById('total').textContent); 
    monto = parseFloat(monto);
    
    total += monto
    
    document.getElementById('total').textContent = total.toFixed(2);
}