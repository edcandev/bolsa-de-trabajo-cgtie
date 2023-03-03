const vacantesOptions =  document.querySelectorAll(".vacantes_options");

const vacantesContainer = document.querySelector("#vacantes_container");

let vacantesTable = document.querySelector(".vacantes_table");

const descargaContainer = document.querySelector(".descarga_container");

let fetchedData;

let sendVacantesArray = [];


(async function () {
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
    const vacantes = await fetchData("/api/vacantes");
    //console.log(candidatos);
    printData(vacantes);

    vacantesContainer.firstElementChild.innerHTML = 'Listado de Vacantes';

    vacantesContainer.classList.remove("display-none");

    // Habilitando contenedor de descarga de informe
    // descargaContainer.classList.remove("display-none");

    

    //descargaContainer.firstElementChild.innerHTML = "Acceso al informe completo";
    // document.querySelector(".descarga_container > a").innerHTML = "Informe Vacantes";
    // document.querySelector(".descarga_container > a").href = enlaceVacantes;
})();

async function fetchData(apiURL) {

    let vacantes = {};

    //console.log(apiURL);    

    await fetch(apiURL) // Pide datos de la API
    .then(response => response.json())
    .then(data => {
        vacantes = data;
    })
    .catch(er => console.log('Error en: ' + er));

    return vacantes;
}

async function printData(data) {

    // console.log(data);

    const internosData = await fetchData("/api/can-internos");
    const externosData = await fetchData("/api/can-externos");

    const headerRow = data[0];
    
    const headerMainData = [
        "Nombre de la Unidad Económica:","Puesto de la Vacante:","Actividades a Desarrollar:","Ubicación del Empleo:","Tipo de empleo:","Carrera:","Semestre:","Conocimientos adicionales requeridos:","Nivel de Dominio del Idioma Inglés Requerido:","Edad mínima requerida:"
    ]; // Datos principales

    const headerMainDataIndex = [];

    headerRow.forEach((element, index)=> {


        //console.log(element);

        if(headerMainData.includes(element)) { 
            headerMainDataIndex.push(index);

            const headerCell = document.createElement('th');
            headerCell.classList.add('vacantes_table_header_row_cell');
            document.querySelector('#vacantes_table_header_row').appendChild(headerCell).innerHTML = element;
        }
            
    });
    
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
            const rowCell = document.createElement('td');
            const sendVacantesCell = document.createElement('td');
            sendVacantesCell.classList.add('vacantes_table_row_cell');

            const sendVacantesLink = document.createElement('a');
            contentRow.appendChild(rowCell).appendChild(sendVacantesLink);
            sendVacantesLink.innerHTML ="Consultar candidatos";
            sendVacantesLink.href = "/app/enviar";
            sendVacantesLink.classList.add("consultar_button");

            fetchedData = data;

            sendVacantesArray.push({
                "vacante":element,
                "element":sendVacantesLink
            });
        }

    }
    var consultarButtons = sendVacantesArray.map(e=> e.element);
    // console.log(consultarButtons);
    
    consultarButtons.forEach((button,index)=> {

        button.addEventListener("click",(e)=> {
            e.preventDefault();

            let numeroDeVacante = consultarButtons.indexOf(button) + 1;

            const vacanteLowed = arrayToLowerCase(data[numeroDeVacante]);
            const internosLowed = objectToLowerCase(internosData);
            const externosLowed = objectToLowerCase(externosData);


            //console.log(vacanteLowed);
            //console.log(internosLowed);
            //console.log(externosLowed);

            const vacantePalabras = splitVacante(vacanteLowed);

            const internosPalabras = internosLowed.map(e => splitVacante(e));
            const externosPalabras = externosLowed.map(e => splitVacante(e));

            //internosLowed.forEach(e => console.log(e));

            //internosLowed.forEach(e => console.log(e[1]));
            //console.log(vacantePalabras);
            //console.log(internosPalabras);
            //console.log(externosPalabras);
            //console.log(arrayToLowerCase(externosData));

            const  ocurrencesInternos = findOcurrences(vacantePalabras, internosPalabras);
            const  ocurrencesExternos = findOcurrences(vacantePalabras, externosPalabras);

            const internosDataArray = Object.entries(internosData);
            const externosDataArray = Object.entries(externosData);


            // AGREGA EL FACTOR DE COINCIDENCIAS
            internosDataArray.forEach( (interno, index) => interno.push(ocurrencesInternos[index].ocurrences));
            externosDataArray.forEach( (externo, index) => externo.push(ocurrencesExternos[index].ocurrences));

            // ORDENA POR EL FACTOR DE COINCIDENCIAS

            //console.log(internosDataArray);

            //internosDataArray.forEach(e => console.log(e[2]))

            const sortedInternosResult = internosDataArray.sort(sortOcurrences);
            const sortedExternosResult = externosDataArray.sort(sortOcurrences);

            //console.log(sortedExternosResult);

            

            let resultTable = document.querySelector(".result_table");
                if(resultTable.childElementCount != 0) {
                    resultTable.remove();
                    resultTable = document.createElement("table");
                    resultTable.classList.add("result_table");
                    document.querySelector(".result_container").appendChild(resultTable);
                } 
                    
                    sortedInternosResult.forEach( e => {
                        
                        const resultRow = document.createElement("tr");

                        
                        const resultCell1 = document.createElement("td");
                        resultCell1.innerHTML = e[1][1];
                        const resultCell2 = document.createElement("td");
                        resultCell2.innerHTML = e[1][2];
                        const resultCell3 = document.createElement("td");
                        resultCell3.innerHTML = e[1][3];
                        const resultCell4 = document.createElement("td");
                        resultCell4.innerHTML = e[1][4];
                        const resultCell5 = document.createElement("td");
                        resultCell5.innerHTML = e[1][11];
                        
                        resultRow.appendChild(resultCell1);
                        resultRow.appendChild(resultCell2);
                        resultRow.appendChild(resultCell3);
                        resultRow.appendChild(resultCell4);
                        resultRow.appendChild(resultCell5);
                        
                        if(e[0] != "0"){
                            document.querySelector(".result_table").appendChild(resultRow);
                        }
                    });
                    sortedExternosResult.forEach( e => {
                        
                        const resultRow = document.createElement("tr");                        
                        
                        const resultCell1 = document.createElement("td");
                        resultCell1.innerHTML = e[1][1];
                        const resultCell2 = document.createElement("td");
                        resultCell2.innerHTML = e[1][2];
                        const resultCell3 = document.createElement("td");
                        resultCell3.innerHTML = e[1][3];
                        const resultCell4 = document.createElement("td");
                        resultCell4.innerHTML = e[1][4];
                        const resultCell5 = document.createElement("td");
                        resultCell5.innerHTML = e[1][11];
                        
                        resultRow.appendChild(resultCell1);
                        resultRow.appendChild(resultCell2);
                        resultRow.appendChild(resultCell3);
                        resultRow.appendChild(resultCell4);
                        resultRow.appendChild(resultCell5);
                        
                        if(e[0] != "0"){
                            document.querySelector(".result_table").appendChild(resultRow);
                        }
                    });
                    
                


        
            })
    });
}

function sortOcurrences(a,b) {
    if(a[2]> b[2]) {
        return -1;
    } else {
        return 1;
    }
}

function findOcurrences(vacanteArray, candidatosArraysArray) {

    const result = [];


    candidatosArraysArray.forEach( (candidatoArray, index) =>{

        let ocurrences = 0;
        
        vacanteArray.forEach((vacanteWord, index)=> {
            
            candidatoArray.forEach((candidatoWord) => {

                if(candidatoWord == vacanteWord) ocurrences ++;
            });

        });

        result.push({index,ocurrences});
    })
    return result;
}

function splitVacante(array) {
    const vacantePalabras = [];
    array.forEach(e => {
        const splitedPalabra = e.split(" ");
        if(e != splitedPalabra) {
            //console.log(splitedPalabra);
            splitedPalabra.forEach(e => {
                if(e.includes('.')) {
                    var eCleared = e.replace('.','');
                } else {
                    eCleared = e;
                }
                if(eCleared != '') {
                    vacantePalabras.push(eCleared)
                }
            });
        } else {
            if(e != '') {   
                vacantePalabras.push(e);
            }
        }
    });
    return vacantePalabras;
}

function objectToLowerCase(object) {
    const array = Object.entries(object);
    
    const arrayLowed = array.map(e => arrayToLowerCase(e[1]));
    return arrayLowed
}

function arrayToLowerCase(array) {
    const arrayLowerCased = array.map( e => e.toLowerCase());
    return arrayLowerCased;
}

function goToVacantesDetails(array) {
    console.log(array);

}



