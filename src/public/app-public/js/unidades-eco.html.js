const unidadesEcoOptions =  document.querySelectorAll(".unidades-eco_options");

const unidadesEcoContainer = document.querySelector("#unidades-eco_container");

let unidadesEcoTable = document.querySelector(".unidades-eco_table");

const descargaContainer = document.querySelector(".descarga_container");


unidadesEcoOptions.forEach((option)=> {
    option.addEventListener('click',async (e)=> {
        e.preventDefault();

        if(unidadesEcoTable.childElementCount > 1 ) {
            console.log("jeje");
            unidadesEcoTable.remove();

            const newTable = document.createElement("table");
            const newHeaderRoW = document.createElement("tr");
            newHeaderRoW.id = "unidades-eco_table_header_row";
            newTable.appendChild(newHeaderRoW);
            newTable.classList.add("unidades-eco_table");

            document.querySelector(".flex_container-table").appendChild(newTable);

            unidadesEcoTable = newTable;
        }
        const unidadesEco = await getUnidadesEco(option.getAttribute('href'));
        //console.log(candidatos);
        printData(unidadesEco);

        unidadesEcoContainer.firstElementChild.innerHTML = 'Unidades Económicas';


        unidadesEcoContainer.classList.remove("display-none");


        // Habilitando contenedor de descarga de informe
        descargaContainer.classList.remove("display-none");

        const enlaceVacantes = "https://docs.google.com/spreadsheets/d/1jWtWT8FqSZCOkhYJckZB8Rimx0P0j9FqbVOdazhY6CQ/edit?usp=sharing";
        const enlaceInformeUnidadesEconomicas = "https://docs.google.com/spreadsheets/d/1aHT-PS82AUyetqzNh8Q2Wt1BwG0fg1wYp_Jbok_DCSU/edit?usp=sharing";

        descargaContainer.firstElementChild.innerHTML = "Acceso al informe completo";
        document.querySelector(".descarga_container > a").innerHTML = "Informe Unidades Económicas";
        document.querySelector(".descarga_container > a").href = enlaceInformeUnidadesEconomicas;


        

    });
});

async function getUnidadesEco(anchorHREF) {

    let unidadesEco = {};

    const apiURL = '/api/unidades-eco';
    //console.log(apiURL);    

    await fetch(apiURL) // Pide datos de la API
    .then(response => response.json())
    .then(data => {
        unidadesEco = data;
    })
    .catch(er => console.log('Error en: ' + er));

    return unidadesEco;
}

function printData(data){

    console.log(data);
    const headerRow = data[0];
    
    const headerMainData = [
        "Nombre de la Unidad Económica:","Giro de la Unidad Económica:","Dirección:","Sitio Web: ","Nombre del contacto:","Correo electrónico:"
    ]; // Datos principales

    const headerMainDataIndex = [];

    headerRow.forEach((element, index)=> {


        console.log(element);

        if(headerMainData.includes(element)) { 
            headerMainDataIndex.push(index);

            const headerCell = document.createElement('th');
            headerCell.classList.add('unidades-eco_table_header_row_cell');
            document.querySelector('#unidades-eco_table_header_row').appendChild(headerCell).innerHTML = element;
        }
            
    });

    console.log(headerMainDataIndex);

      for (const element in data) {
        if(element != 0) {
            //console.log(data[element]);
            const contentRow = document.createElement('tr');
            document.querySelector('.unidades-eco_table').appendChild(contentRow);

            data[element].forEach((cell, index) => {
                if(headerMainDataIndex.includes(index)){
                    const rowCell = document.createElement('td');
                    rowCell.classList.add('unidades-eco_table_row_cell');  
                    contentRow.appendChild(rowCell).innerHTML = cell;
                }
            });

        }
        
    }
    
}   





/*

*/