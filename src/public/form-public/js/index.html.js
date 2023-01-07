// Fichero JS de views/index.html

// URL de nuestra API

// URL en localhost

console.log(document.referrer)

if(document.referrer.includes('/')) {
    alert("Por favor, no utilice comas y seleccione todas las opciones!")
}

// Hace la petición sin la dirección porque es Mono
const URL = '/api/unidades-eco/'; 

const listaUnidades = document.querySelector('#nombre_unidad_eco');
const listaUbicacion = document.querySelector('#ubicacion_vacante');
const listaSituacion = document.querySelector('#situacion_escolar');
const listaCarrera = document.querySelector('#carrera');
const listaTipo = document.querySelector('#tipo_empleo');
const botonSubmit = document.querySelector('#boton_submit');

let unidadesRegistradas = {};

window.addEventListener('load',async ()=> {

    await fetch(URL) // Pide datos de la API
    .then(response => response.json())
        .then(data => {
            //console.log('***DATOS PEDIDOS***');
            unidadesRegistradas = data;
        })
    .catch(er => console.log('Error en: ' + er));

    const noFilas = Object.keys(unidadesRegistradas).length; // Propiedad que nos da el numero de Filas
    const noColumnas = Object.keys(unidadesRegistradas[0]).length; // Propiedad que nos da el numero de Columnas
    //Inserta los datos en la lista de unidades economicas

    for (const reg in unidadesRegistradas) { 
        if (reg != 0) {
            //console.log(reg)// reg: registro - numero 1: nombre
            const opcion = document.createElement('option');
            opcion.innerHTML = unidadesRegistradas[reg][1];
            listaUnidades.appendChild(opcion).value = unidadesRegistradas[reg][1];
        }
    }
});

/*
Para el manejo del JSON hay que recordar que:
    - El primer indice indica las filas, el segundo, las columas

Donde:
    - La fila 0 es el encabezado
    - Las columnas son:
        0 - Marca Temp
        1 - Nombre
        2 - Giro
        3 - RFC
        4 - Direccion
        5 - Tel
        6 - Extension
        7 - Sitio Web
        8 - Nom Contacto
        9 - Cargo
        10 - Correo
*/

listaSituacion.addEventListener('click',()=> {
    listaSituacion.firstElementChild.disabled = true; 
});

listaUbicacion.addEventListener('click',()=> {
    listaUbicacion.firstElementChild.disabled = true;
});

listaCarrera.addEventListener('click',()=> {
    listaCarrera.firstElementChild.disabled = true;
});

listaSituacion.addEventListener('click',()=> {
    listaSituacion.firstElementChild.disabled = true;
});

listaUnidades.addEventListener('click', ()=> {
    unidadesPlaceholder = listaUnidades.firstElementChild.disabled = true;
    console.log(listaUnidades.value);
});

listaTipo.addEventListener('click',()=> {
    listaSituacion.firstElementChild.disabled = true; 
});

botonSubmit.addEventListener('click',(e)=> {

    //e.preventDefault();
    if(e.defaultPrevented) {
        console.log("test2")

    }else {
        console.log("test");
        // HASTAS AQUÍ HAY QUE MODIFICAR LA VALIDACIÓN DEL LADO DE LA APP
    
    }
})

// GH TOKEN = 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