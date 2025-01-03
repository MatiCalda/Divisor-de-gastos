"use strict";
var input = document.getElementById('monto');
const btnAgregar = document.getElementById('btnAgregarPersona')
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
/* 
btnAgregar.addEventListener('click', () => {
    let nombre = formulario.querySelector('.nombre');
    let categoria = formulario.querySelector('.categoria');
    let monto = formulario.querySelector('.monto');

    const td = document.createElement('td');
    const btnDelete = document.createElement('button');
    td.appendChild(btnDelete);
    btnDelete.className = 'btn btn-outline-danger btn-delete';
    btnDelete.innerHTML = '<i class="bi bi-trash"></i>';
    btnDelete.addEventListener('click', () => {
        console.log('hola');
        
    })
    
    if (nombre.value && categoria.value && monto.value){
        
        listado.innerHTML += `
            <tr class=\"align-middle\">
                <td>${nombre.value}</td>
                <td>${categoria.value}</td>
                <td>$ ${monto.value}</td>
                ${td.outerHTML}
            </tr>
        `;
        nombre.value = categoria.value = monto.value = '';
        nombre.focus();
    }
}); */

btnAgregar.addEventListener('click', () => {
    let nombre = formulario.querySelector('.nombre');
    let categoria = formulario.querySelector('.categoria');
    let monto = formulario.querySelector('.monto');

    const tr = document.createElement('tr');
    tr.classList.add('align-middle');

    tr.innerHTML = `
        <td>${nombre.value}</td>
        <td>${categoria.value}</td>
        <td>$ ${monto.value}</td>
    `;

    const td = document.createElement('td');
    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn-outline-danger btn-delete';
    btnDelete.innerHTML = '<i class="bi bi-trash"></i>';
    btnDelete.addEventListener('click', () => {
        console.log(this.parentElement);
        // revisar como hacer el partentElement
        listado.removeChild(tr);
        actualizarTotal(monto.value, 0);
    });
    
    td.appendChild(btnDelete);
    tr.appendChild(td);
    
    if (nombre.value && categoria.value && monto.value) {
        listado.appendChild(tr);
        actualizarTotal(monto.value, 1);
        nombre.value = categoria.value = monto.value = '';
        nombre.focus();
    }
});

function actualizarTotal(monto, accion){
//accion (1 = agregar ; 0 = restar)
console.log(monto);

    let total = parseFloat(document.getElementById('total').textContent); 
    monto = parseFloat(monto);
    if(accion == 1){
        total += monto
    }else{
        total -= monto
    }
    console.log(total);
    
    document.getElementById('total').textContent = total.toFixed(2);
}