const candidatosOptions =  document.querySelectorAll(".candidatos-options");

const candidatosContainer = document.querySelector("#candidatos_container");

let candidatosTable = document.querySelector(".candidatos_table");

const descargaContainer = document.querySelector(".descarga_container");

candidatosOptions.forEach((option)=> {
    option.addEventListener('click',async (e)=> {
        e.preventDefault();

        if(candidatosTable.childElementCount > 1 ) {
            console.log("jeje");
            candidatosTable.remove();

            const newTable = document.createElement("table");
            const newHeaderRoW = document.createElement("tr");
            newHeaderRoW.id = "candidatos_table_header_row";
            newTable.appendChild(newHeaderRoW);
            newTable.classList.add("candidatos_table");

            document.querySelector(".flex_container-table").appendChild(newTable);

            candidatosTable = newTable;
        }


        /*while(candidatosTable.hasChildNodes()) {
            candidatosTable.removeChild(candidatosTable.firstChild)
        }*/


        const candidatos = await getCandidatos(option.getAttribute('href'));
        //console.log(candidatos);
        printData(candidatos);

        descargaContainer.classList.remove("display-none");

        if(option.innerHTML.includes('INTERNOS')) {
            const enlaceInformeInternos = "https://docs.google.com/spreadsheets/d/1ttjwBiva_wNu_9MJPSrSwcP_M6l72KdN4jkIu2XHd6o/edit?usp=sharing"
            candidatosContainer.firstElementChild.innerHTML = ' Candidatos Internos';
            descargaContainer.firstElementChild.innerHTML = "Acceso al informe completo";
            document.querySelector(".descarga_container > a").innerHTML = "Informe candidatos internos";
            document.querySelector(".descarga_container > a").href = enlaceInformeInternos;

        } else {
            const enlaceInformeExternos = "https://docs.google.com/spreadsheets/d/1OKhgAGjH4Al4HFVimQ5hQnAzGVj0tW8MFkxAvwnLPEU/edit?usp=sharing";
            candidatosContainer.firstElementChild.innerHTML = 'Candidatos Externos';
            descargaContainer.firstElementChild.innerHTML = "Acceso al informe completo";
            document.querySelector(".descarga_container > a").innerHTML = "Informe candidatos externos";
            document.querySelector(".descarga_container > a").href = enlaceInformeExternos;


        }
        candidatosContainer.classList.remove("display-none");
        

    });
});

function getApiURL(anchorHREF) {
    if(anchorHREF == '/app/candidatos/internos') return '/api/can-internos';
    if(anchorHREF == '/app/candidatos/externos') return '/api/can-externos';
}

async function getCandidatos(anchorHREF) {

    let candidatos = {};

    const apiURL = getApiURL(anchorHREF)
    //console.log(apiURL);    

    await fetch(apiURL) // Pide datos de la API
    .then(response => response.json())
    .then(data => {
        candidatos = data;
    })
    .catch(er => console.log('Error en: ' + er));

    return candidatos;
}

function printData(data){

    const headerRow = data[0];
    
    const headerMainData = [
        'A. Paterno:', 'A. Materno:' , 'Nombre(s):','Teléfono Celular:','Edad (número de años):','Correo Electrónico:','Carrera:','Matrícula:','Semestre:'
    ]; // Datos principales de cada aspirante

    const headerMainDataIndex = [];

    headerRow.forEach((element, index)=> {


        console.log(element);

        if(headerMainData.includes(element)) { 
            headerMainDataIndex.push(index);

            const headerCell = document.createElement('th');
            headerCell.classList.add('candidatos_table_header_row_cell');
            document.querySelector('#candidatos_table_header_row').appendChild(headerCell).innerHTML = element;
        }
            
    });

    console.log(headerMainDataIndex);

      for (const element in data) {
        if(element != 0) {
            console.log(data[element]);
            const contentRow = document.createElement('tr');
            document.querySelector('.candidatos_table').appendChild(contentRow);

            data[element].forEach((cell, index) => {
                if(headerMainDataIndex.includes(index)){
                    const rowCell = document.createElement('td');
                    rowCell.classList.add('candidatos_table_row_cell');  
                    contentRow.appendChild(rowCell).innerHTML = cell;
                }
            });

        }
        
    }
    
}   





/*

*/