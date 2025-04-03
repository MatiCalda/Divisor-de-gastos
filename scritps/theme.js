"use strict";

const btnTheme = document.getElementById('themeIcon')
btnTheme.addEventListener('click', () => {
    let theme
    if (btnTheme.className.includes('btn-dark')) { // estoy en modo dark y quiero pasar a light
        document.querySelector('body').setAttribute('data-bs-theme', 'light')
        changeButtonsToLight();
        theme = 'light'
    } else if (btnTheme.className.includes('btn-light')) { // estoy en modo dark y quiero pasar a light
        document.querySelector('body').setAttribute('data-bs-theme', 'dark')
        changeButtonsToDark();
        theme = 'dark'
    }
    localStorage.setItem('theme', theme);
})

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

function changeButtonsToDark() {
    btnTheme.className = 'btn btn-dark'
    btnTheme.innerHTML = '<i class="bi bi-moon"></i>'
    document.querySelectorAll('.btn').forEach(button => {
        let classes = [...button.classList]
        if(classes.includes('btn-success')){
            button.classList.replace('btn-success', 'btn-outline-success');            
        }
        else if(classes.includes('btn-primary')){
            button.classList.replace('btn-primary', 'btn-outline-primary');            
        }
        else if(classes.includes('btn-warning')){
            button.classList.replace('btn-warning', 'btn-outline-warning');            
        }
        else if(classes.includes('btn-info')){
            button.classList.replace('btn-info', 'btn-outline-info');            
        }
        
    })
}

function changeButtonsToLight() {
    btnTheme.className = 'btn btn-light'
    btnTheme.innerHTML = '<i class="bi bi-sun"></i>'
    document.querySelectorAll('.btn').forEach(button => {
        let classes = [...button.classList]
        
        if (classes.includes('btn-outline-success')) {
            button.classList.replace('btn-outline-success', 'btn-success');
        }
        else if (classes.includes('btn-outline-primary')) {
            button.classList.replace('btn-outline-primary', 'btn-primary');
        }
        else if (classes.includes('btn-outline-warning')) {
            button.classList.replace('btn-outline-warning', 'btn-warning');
        }
        else if (classes.includes('btn-outline-info')) {
            button.classList.replace('btn-outline-info', 'btn-info');
        }

    })
}