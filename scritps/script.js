"use strict";
var input = document.getElementById('monto');
const btnAgregar = document.getElementById('btnAgregarPersona')
const btnCalcular = document.getElementById('btnCalcular')
const formulario = document.getElementById('formulario')
const listado = document.getElementById('listado').querySelector('tbody');

const nombre = formulario.querySelector('.nombre');
const categoria = formulario.querySelector('.categoria');
const monto = formulario.querySelector('.monto');

var modalWarning = new bootstrap.Modal('#modalWarning')

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
    let total = parseFloat(document.getElementById('total').textContent);
    if (nombre.value || categoria.value || monto.value) {
        modalWarning.show()
    }else if(total != 0){
        
        let gastos = getGastos().sort((a, b) => b.monto - a.monto);
        let cantPersonas = gastos.length;
        let maxGasto = gastos[0].monto;
        const div = document.getElementById('resultados');
        div.querySelector('#cu').textContent = (total / cantPersonas).toFixed(2)
        gastos.forEach(gasto => {
            gasto.montoPPersona = (gasto.monto / cantPersonas);
        })
        let pagos = []
        for (let i = 0; i < gastos.length; i++) {
            if (gastos[i].monto == maxGasto) {
                pagos.push({
                    nombre: gastos[i].nombre,
                    debe: [{
                        nombre: 'nadie',
                        monto: 'nada'
                    }]
                })
            } else {
                let debe = [];
                for (let j = 0; j < i; j++) { 
                    if (gastos[j].montoPPersona > gastos[i].montoPPersona){
                        let pago = {
                            nombre: gastos[j].nombre,
                            monto: gastos[j].montoPPersona - gastos[i].montoPPersona
                        }
                        debe.push(pago)
                    }
                }
                pagos.push({
                    nombre: gastos[i].nombre,
                    debe: debe
                });
            }
            
        }
    
        renderGastos(pagos.reverse())

    }
    
});

function getGastos() {
    let gastos = [];
    document.querySelectorAll('.persona').forEach(persona => {
        let gasto = {
            nombre: persona.querySelector('.nombre').textContent,
            monto: parseFloat(persona.querySelector('.monto').textContent)
        }
        gastos.push(gasto);
    });
    return gastos;
}

function renderGastos(gastos){
    document.getElementById('resultados').classList.remove('visually-hidden');

    const tabla = document.getElementById('gastos').querySelector('tbody');
    tabla.innerHTML = '';
    gastos.forEach(gasto => {
        let htmlNombreDebe = '';
        let htmlMontoDebe = '';
        gasto.debe.forEach(persona => {
            htmlNombreDebe += persona.nombre + '<br>';
            htmlMontoDebe += (persona.monto == 'nada') ? persona.monto + '<br>' : persona.monto.toFixed(2) + '<br>';
        })

        tabla.innerHTML += `
            <tr>
                <td>${gasto.nombre}</td>
                <td>${htmlNombreDebe}</td>
                <td>${htmlMontoDebe}</td>
            <tr>
        `
    })
}

function actualizarTotal(monto) {
    let total = parseFloat(document.getElementById('total').textContent);
    monto = parseFloat(monto);
    total += monto
    document.getElementById('total').textContent = total.toFixed(2);
}