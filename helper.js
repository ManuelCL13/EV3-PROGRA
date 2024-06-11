const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        if (id == 'fecha') {
            const dia = validarFecha(input.value)
            if (dia <= 0) {
                input.classList.add('is-invalid')
                div.innerHTML =
                    `<span class="badge bg-danger">Los personajes deben ser mayores</span>`
            }
        }
    }
}
const validaRadio = (name) => {
    const radio = document.querySelector(`input[name="${name}"]:checked`)
    const div = document.getElementById(`e-${name}`)
    const all = document.querySelectorAll(`input[name="${name}"]`)
    if (!radio) {
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
        all.forEach(item => {
            item.classList.add('is-invalid')
        })
    }
    else {
        div.innerHTML = ''
        all.forEach(item => {
            item.classList.remove('is-invalid')
            item.classList.add('is-valid')
        })
    }
}

const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control,.form-select,.form-check-input').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById(`e-${item.name}`).innerHTML = ''
    })  
    document.getElementById('nombre').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}

const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}

const validarFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}