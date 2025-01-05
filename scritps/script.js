"use strict";
var input = document.getElementById('monto');
const btnTheme = document.getElementById('themeIcon')
const btnAgregar = document.getElementById('btnAgregarPersona')
const btnCalcular = document.getElementById('btnCalcular')
const btnNuevoCalculo = document.getElementById('btnNewCalc')
const formulario = document.getElementById('formulario')
const listado = document.getElementById('listado').querySelector('tbody');

const nombre = formulario.querySelector('.nombre');
const categoria = formulario.querySelector('.categoria');
const monto = formulario.querySelector('.monto');

var modalWarning = new bootstrap.Modal('#modalWarning')
var msgMotal = document.querySelector('#modalmsg')

document.addEventListener('DOMContentLoaded', () => { 
    const savedTheme = localStorage.getItem('theme') || 'dark'; 
    switch (savedTheme) {
        case 'dark':
            changeButtonsToDark();
            break;
        case 'light':
            changeButtonsToLight();
            break;
        default:
            break;
    }
    document.querySelector('body').setAttribute('data-bs-theme', savedTheme) 
});

input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        btnAgregar.click();
    }
});

btnTheme.addEventListener('click', () => {
    let theme
    if (btnTheme.className.includes('btn-dark')){ // estoy en modo dark y quiero pasar a light
        document.querySelector('body').setAttribute('data-bs-theme', 'light')
        changeButtonsToLight();
        theme = 'light'
    } else if (btnTheme.className.includes('btn-light')){ // estoy en modo dark y quiero pasar a light
        document.querySelector('body').setAttribute('data-bs-theme', 'dark')
        changeButtonsToDark();
        theme = 'dark'
    }
    localStorage.setItem('theme', theme);
})

btnAgregar.addEventListener('click', () => {
    if (datosValidos()) {
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
        listado.appendChild(tr);
        actualizarTotal(monto.value);
        nombre.value = categoria.value = monto.value = '';
        nombre.focus();
    }else{
        modalWarning.show();
    }
});

btnCalcular.addEventListener('click', () => {
    let total = parseFloat(document.getElementById('total').textContent);
    if (nombre.value || categoria.value || monto.value) {
        msgMotal.textContent = 'Aun hay datos sin guardar'
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

btnNuevoCalculo.addEventListener('click', () =>{
    document.getElementById('total').textContent = '0';
    document.getElementById('resultados').classList.add('visually-hidden');
    listado.innerHTML = '';
})

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
            htmlNombreDebe += (persona.nombre == 'nadie') ? '-----<br>' : persona.nombre + '<br>';
            htmlMontoDebe += (persona.monto == 'nada') ? '-----<br>' : '$ ' + persona.monto.toFixed(2) + '<br>';
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

function changeButtonsToDark(){
    btnTheme.className = 'btn btn-dark'
    btnTheme.innerHTML = '<i class="bi bi-moon"></i>'
    btnAgregar.classList.remove('btn-success')
    btnCalcular.classList.remove('btn-warning')
    btnNuevoCalculo.classList.remove('btn-primary')
    btnAgregar.classList.add('btn-outline-success')
    btnCalcular.classList.add('btn-outline-warning')
    btnNuevoCalculo.classList.add('btn-outline-primary')
}

function changeButtonsToLight(){
    btnTheme.className = 'btn btn-light'
    btnTheme.innerHTML = '<i class="bi bi-sun"></i>'
    btnAgregar.classList.remove('btn-outline-success')
    btnCalcular.classList.remove('btn-outline-warning')
    btnNuevoCalculo.classList.remove('btn-outline-primary')
    btnAgregar.classList.add('btn-success')
    btnCalcular.classList.add('btn-warning')
    btnNuevoCalculo.classList.add('btn-primary')
}

function datosValidos(){
    let todoOk = false;
    let nombres = []
    document.querySelectorAll('.nombre').forEach(nombre => {
        nombres.push(nombre.textContent.toLowerCase())
    })
    if (!nombre.value || !monto.value) {
        msgMotal.textContent = 'Falta ingresar valores'
    }else if (nombres.includes(nombre.value.toLowerCase().trim())) {
        msgMotal.textContent = 'Este nombre ya fue ingresado'
    } else if (monto.value < 0) {
        msgMotal.textContent = 'El monto no puede ser negativo'
    }else{
        todoOk = true;
    }
    return todoOk;
}