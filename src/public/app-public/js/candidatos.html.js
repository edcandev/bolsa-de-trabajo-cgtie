const candidatosOptions =  document.querySelectorAll(".candidatos-options");

const candidatosContainer = document.querySelector("#candidatos_container");

candidatosOptions.forEach((option)=> {
    option.addEventListener('click',async (e)=> {
        e.preventDefault();

        const candidatos = await getCandidatos(option.getAttribute('href'));
        console.log(candidatos);
        printData(candidatos);

        if(option.innerHTML.includes('INTERNOS')) {
            candidatosContainer.firstElementChild.innerHTML = ' Candidatos Internos';
        } else {
            candidatosContainer.firstElementChild.innerHTML = 'Candidatos Externos';
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
    console.log(apiURL);    

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

    headerRow.forEach((element)=> {
        const headerCell = document.createElement('th');
        headerCell.classList.add('candidatos_table_header_row_cell');
        document.querySelector('#candidatos_table_header_row').appendChild(headerCell).innerHTML = element;
    });

     for (const element in data) {
        if(element != 0) {
            console.log(data[element]);
            const contentRow = document.createElement('tr');
            document.querySelector('.candidatos_table').appendChild(contentRow);

            data[element].forEach((cell) => {
                const rowCell = document.createElement('td');
                rowCell.classList.add('candidatos_table_row_cell');  
                contentRow.appendChild(rowCell).innerHTML = cell;
            });

        }
        
    }
}   





/*

*/