"use strict";

const btnAgregarPersona = document.getElementById('btnAgregarPersona')
const btnAgregarItem = document.getElementById('btnAgregarItem')

const formPersonas = document.getElementById('formPersonas')
const nombrePersona = formPersonas.querySelector('.nombre');

const formItems = document.getElementById('formItems')
const nombreItem = formItems.querySelector('.nombre');
const precioItem = formItems.querySelector('.precio');

const listadoPersonas = document.getElementById('tablaPersonas').querySelector('tbody');
const listadoItems = document.getElementById('tablaItems').querySelector('tbody');

var modalWarning = new bootstrap.Modal('#modalWarning')
var msgModal = document.querySelector('#modalmsg')

btnAgregarItem.addEventListener('click', () => {
    if (nombreItem.value == '' || precioItem.value == '') {
        showModalMsg('Faltan datos');
        return 0;
    }
    const tr = document.createElement('tr');
    tr.classList.add('align-middle');
    tr.innerHTML = `
        <td>${nombreItem.value}</td>
        <td>${precioItem.value}</td>
    `;
    const td = document.createElement('td');
    td.classList.add('d-flex', 'justify-content-end');
    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn-outline-danger btn-delete';
    btnDelete.innerHTML = '<i class="bi bi-trash"></i>';
    btnDelete.addEventListener('click', () => {
        const item = btnDelete.parentElement.parentElement;
        listadoItems.removeChild(item);
    });
    td.appendChild(btnDelete);
    tr.appendChild(td);
    listadoItems.appendChild(tr);
    nombreItem.value = precioItem.value = "";
})

btnAgregarPersona.addEventListener('click', () => {
    if (nombrePersona.value == ''){
        showModalMsg('Faltan datos');
        return 0;
    } 

    const tr = document.createElement('tr');
    tr.classList.add('align-middle');
    tr.innerHTML = `
        <td>${nombrePersona.value}</td>
    `;
    const td = document.createElement('td');
    td.classList.add('d-flex', 'justify-content-end');
    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn-outline-danger btn-delete';
    btnDelete.innerHTML = '<i class="bi bi-trash"></i>';
    btnDelete.addEventListener('click', () => {
        const item = btnDelete.parentElement.parentElement;
        listadoPersonas.removeChild(item);
    });
    td.appendChild(btnDelete);
    tr.appendChild(td);
    listadoPersonas.appendChild(tr);
    nombrePersona.value = "";
})

function showModalMsg(message){
    msgModal.textContent = message;
    modalWarning.show();
}