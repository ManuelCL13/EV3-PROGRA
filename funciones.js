import { eliminar, getData, obtener, save, update } from "./firebase.js"

let id = 0

document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    if (document.querySelectorAll('.is-invalid').length == 0) {
        let mensaje, titulo;
        if (document.getElementById('btnGuardar').value == 'Guardar'){
            mensaje = "¿Estás seguro que quiere registrar el personaje?";
            titulo = "Resgistado";
            
        } else{
            mensaje = "¿Estás seguro quiere modificar el personaje?";
            titulo = "Modificado";
        }
        Swal.fire({
            title: mensaje,
            text: "Verifique que todos sus datos sean correctos",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#14c156",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Si"
        }).then((result) => {
            if (result.isConfirmed) {
                const personajes = {
                    'nombre': document.getElementById('nombre').value.trim(),
                    'genero': document.getElementById('genero').value,
                    'fruta': document.getElementById('fruta').value,
                    'fecha': document.getElementById('fecha').value,
                    'haki': document.getElementById('haki').value,
                    'altura': document.getElementById('altura').value,
                    'recompensa': document.getElementById('recompensa').value
                };

                if (document.getElementById('btnGuardar').value == 'Guardar') {
                    save(personajes);
                } else {
                    update(id, personajes);
                    id = 0;
                    document.getElementById('btnGuardar').value = 'Guardar';
                }
                limpiar();
                    Swal.fire({
                        title: titulo,
                        text: `El Personaje se ha ${titulo}`,
                        icon: "success"
                    });
            }
        });
    }
});



window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.nombre}</td>
            <td>${item.genero}</td>
            <td>${item.fruta}</td>
            <td>${item.fecha}</td>
            <td>${item.haki}</td>
            <td>${item.altura} <a><img class="iconoBerries" src="img/icono cm.png"></a></td>
            <td> <a><img class="iconoBerries" src="img/icono berries.png"></a> ${item.recompensa}</td>
            <td nowrap>
                <button class="btn botonOP" id="${doc.id}">Editar</button>
                <button class="btn botonOP2" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.botonOP2').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Desea eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#14c156",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "El personaje ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })


        document.querySelectorAll('.botonOP').forEach( btn => {
            btn.addEventListener('click',async() =>{
                const doc = await obtener(btn.id)
                const d = doc.data()
                document.getElementById('nombre').value = d.nombre
                document.getElementById('genero').value = d.genero
                document.getElementById('fruta').value = d.fruta
                document.getElementById('fecha').value = d.fecha
                document.getElementById('haki').value = d.haki
                document.getElementById('altura').value = d.altura
                document.getElementById('recompensa').value = d.recompensa
                document.getElementById('btnGuardar').value = 'Modificar'
                id = btn.id
            })
        })

    })
})