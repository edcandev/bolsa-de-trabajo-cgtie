const vacantesOptions =  document.querySelectorAll(".vacantes_options");

const vacantesContainer = document.querySelector("#vacantes_container");

let vacantesTable = document.querySelector(".vacantes_table");

const descargaContainer = document.querySelector(".descarga_container");


vacantesOptions.forEach((option)=> {
    option.addEventListener('click',async (e)=> {
        e.preventDefault();

        if(vacantesTable.childElementCount > 1 ) {
            console.log("jeje");
            vacantesTable.remove();

            const newTable = document.createElement("table");
            const newHeaderRoW = document.createElement("tr");
            newHeaderRoW.id = "vacantes_table_header_row";
            newTable.appendChild(newHeaderRoW);
            newTable.classList.add("vacantes_table");

            document.querySelector(".flex_container-table").appendChild(newTable);

            vacantesTable = newTable;
        }
        const unidadesEco = await getUnidadesEco(option.getAttribute('href'));
        //console.log(candidatos);
        printData(unidadesEco);

        vacantesContainer.firstElementChild.innerHTML = 'Listado de Vacantes';

        vacantesContainer.classList.remove("display-none");

        // Habilitando contenedor de descarga de informe
        descargaContainer.classList.remove("display-none");

        const enlaceVacantes = "https://docs.google.com/spreadsheets/d/1jWtWT8FqSZCOkhYJckZB8Rimx0P0j9FqbVOdazhY6CQ/edit?usp=sharing";
        

        descargaContainer.firstElementChild.innerHTML = "Acceso al informe completo";
        document.querySelector(".descarga_container > a").innerHTML = "Informe Vacantes";
        document.querySelector(".descarga_container > a").href = enlaceVacantes;
        
    });
});

async function getUnidadesEco(anchorHREF) {

    let vacantes = {};

    const apiURL = '/api/vacantes';
    //console.log(apiURL);    

    await fetch(apiURL) // Pide datos de la API
    .then(response => response.json())
    .then(data => {
        vacantes = data;
    })
    .catch(er => console.log('Error en: ' + er));

    return vacantes;
}

function printData(data){

    console.log(data);

    const headerRow = data[0];
    
    const headerMainData = [
        "Nombre de la Unidad Económica:","Puesto de la Vacante:","Actividades a Desarrollar:","Ubicación del Empleo:","Tipo de empleo:","Carrera:","Semestre:","Conocimientos adicionales requeridos:","Nivel de Dominio del Idioma Inglés Requerido:","Edad mínima requerida:"
    ]; // Datos principales

    const headerMainDataIndex = [];

    headerRow.forEach((element, index)=> {


        console.log(element);

        if(headerMainData.includes(element)) { 
            headerMainDataIndex.push(index);

            const headerCell = document.createElement('th');
            headerCell.classList.add('vacantes_table_header_row_cell');
            document.querySelector('#vacantes_table_header_row').appendChild(headerCell).innerHTML = element;
        }
            
    });

    console.log(headerMainDataIndex);

      for (const element in data) {
        if(element != 0) {
            //console.log(data[element]);
            const contentRow = document.createElement('tr');
            document.querySelector('.vacantes_table').appendChild(contentRow);

            data[element].forEach((cell, index) => {
                if(headerMainDataIndex.includes(index)){
                    const rowCell = document.createElement('td');
                    rowCell.classList.add('vacantes_table_row_cell');  
                    contentRow.appendChild(rowCell).innerHTML = cell;
                }
            });

        }
        
    }
    
}  