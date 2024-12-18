

var contMatches = document.getElementById("body-table");
const loader = document.getElementById('loader');

const btnEng = document.getElementById('btn-eng');
const btnespana = document.getElementById('btn-espana');
const btnalemania = document.getElementById('btn-alemania');
const btnitalia = document.getElementById('btn-italia');
const btnfrancia = document.getElementById('btn-francia');
const btnholanda = document.getElementById('btn-holanda');
const btnportugal = document.getElementById('btn-portugal');
const btnturquia = document.getElementById('btn-turquia');
const btnchampions = document.getElementById('btn-champions');

function openMatch(partidoId) {
  window.open(`data.html?partido=${partidoId}`, '_blank');
}

function openMatchResult(partidoId) {
  window.open(`data_resultados.html?partido=${partidoId}`, '_blank');
}

async function getMatches(country, league, index, type) {


  btnSelector(index);
  loader.style.display = 'flex';


  fetch(`https://soccerapi-kaut.onrender.com/api/partidos?country=${country}&league=${league}&type=${type}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Variable para acumular las filas
      let rows = "";
      let contador = 0;

      // Itera sobre cada partido
      data.forEach(item => {
        contador += 1;

        // Agrega una fila para cada partido
        rows += `
            <tr onclick="openMatch('${item.partido_id}')" style="cursor: pointer;">
              <td class="td-table">${contador}</td>
              <td class="td-table">
                <img src="${item.logo_local}" alt="${item.equipo_local}" style="width: 30px; height: 30px;">
                ${item.equipo_local}
              </td>
              <td class="td-table">
                <img src="${item.logo_visitante}" alt="${item.equipo_visitante}" style="width: 30px; height: 30px;">
                ${item.equipo_visitante}
              </td>
              <td class="td-table">${item.fecha_y_hora}</td>
            </tr>
            `;

      });

      // Actualiza el contenido de la tabla con las filas generadas
      contMatches.innerHTML = rows;
    })
    .catch(error => console.error('Error al obtener los partidos:', error))
    .finally(() => {
      loader.style.display = 'none';
    });
}



function btnSelector(index) {
  if (index == 0) {
    btnEng.classList.add('active');
  } else {
    btnEng.classList.remove('active');
  }

  if (index == 1) {
    btnespana.classList.add('active');
  } else {
    btnespana.classList.remove('active');
  }

  if (index == 2) {
    btnalemania.classList.add('active');
  } else {
    btnalemania.classList.remove('active');
  }

  if (index == 3) {
    btnitalia.classList.add('active');
  } else {
    btnitalia.classList.remove('active');
  }

  if (index == 4) {
    btnfrancia.classList.add('active');
  } else {
    btnfrancia.classList.remove('active');
  }

  if (index == 5) {
    btnholanda.classList.add('active');
  } else {
    btnholanda.classList.remove('active');
  }

  if (index == 9) {
    btnportugal.classList.add('active');
  } else {
    btnportugal.classList.remove('active');
  }

  if (index == 10) {
    btnturquia.classList.add('active');
  } else {
    btnturquia.classList.remove('active');
  }

  if (index == 10) {
    btnchampions.classList.add('active');
  } else {
    btnchampions.classList.remove('active');
  }
}


async function getData() {
  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const partido = params.get("partido");
  const tablaActual = document.getElementById('body-table-actual');
  const contSuperior = document.getElementById('cont-sup');

  loader.style.display = 'flex';


  fetch('https://soccerapi-kaut.onrender.com/api/pronostics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Indica que el contenido es JSON
    },
    body: JSON.stringify({
      id_match: partido
    })
  })
    .then(response => response.json())
    .then(data => {
      row = `
            <tr>
                    <td>${data.date}</td>
                    <td>${data.jornada}</td>
                    <td>${data.home}</td>
                    <td>${(data.away )}</td>
                    <td>${(data.goles_home )}</td>
                    <td>${(data.goles_away )}</td>
                    <td>${(data.pronostico )}</td>
                  </tr>
            `;


      tablaActual.innerHTML = row;

      let fecha = new Date(data.match.date);
      let fechaSolo = fecha.toLocaleDateString('en-GB'); // '24/09/2021'


      content = `
           <div class="lados">
                    <img src="${data.logo_home}">
                    <span>${data.home}</span>
                </div>
                <div class="centro">
                    <h1>VS</h1>
                    <span>${fechaSolo}</span>
                </div>
                <div class="lados">
                    <img src="${data.logo_away}" alt="fdsf">
                    <span>${data.away}</span>
                </div>
      `;
      contSuperior.innerHTML = content;
    }).catch(error => console.error('Error al obtener los partidos:', error))
    .finally(() => {
      loader.style.display = 'none';
    });;
}

let table = new DataTable('#myTable', {
  "paginate": false
});



async function getPronostico(liga) {
  // Usar await para esperar a que la promesa se resuelva
  const response = await fetch(`https://soccerapi-kaut.onrender.com/api/pronosticos/lista?league=${liga}`);
  const item = await response.json(); // Obtener los datos de la API
  const contPorGoles = document.getElementById("porcentaje-goles")
  const contPortres = document.getElementById("porcentaje-tres")
  const contPoruno= document.getElementById("porcentaje-uno")
  // Crear una lista vacía para almacenar los datos formateados
  let listData = [];

  let acierto = 0
  let noIncluir = 0
  acertoUnoCinco = 0
  acertoTresCinco = 0
  cantUnocinco = 0
  cantTresCinco=0
  contadorPartidos= 0
  // Recorrer los datos y formatearlos para la tabla
  item.forEach(match => {
    contadorPartidos +=1
    let fecha = new Date(match.date);
    let fechaSolo = fecha.toLocaleDateString('en-GB'); //
    suma = Math.floor(match.res_home) + Math.floor(match.res_away)
    // Crear un arreglo con los datos de cada partido
    num_pron = match.pronostico.replace(/[<>]/g, "");
  
  
      
    clasebg = ''
    if(num_pron == 1.5){
      cantUnocinco+=1
    }
    if(num_pron == 3.5){
      cantTresCinco +=1
    }
    if(num_pron == 1.5 && suma >= 2 && match.res_home != null){
      clasebg = 'bg-success'
      acierto +=1
      acertoUnoCinco+=1
    }else if(match.res_home != null){
      clasebg = 'bg-danger'
      
    }
    
    if(num_pron == 3.5 && suma <= 3 && match.res_home != null){
      clasebg = 'bg-success'
      acierto +=1
      acertoTresCinco+=1
    }

    if(match.res_home == null){
      noIncluir+=1
    }
    const data = [
      contadorPartidos,
      fechaSolo,
      match.jornada,
      match.home,
      match.away,
      (match.goles_home).toFixed(2),
      (match.goles_away).toFixed(2),
      ((match.goles_home)+(match.goles_away)).toFixed(2),
      `<div class="${clasebg} text-center">${match.pronostico}</div>`,
      `<input id="${match.id}" type="text" class="w-50 inpRl_home" value="${match.res_home}" ></input>`,
      `<input id="${match.id}" type="text" class="w-50 inpRl_away" value="${match.res_away}" ></input>`,
      suma
    ];
    
    listData.push(data); // Agregar los datos a la lista
  });

  console.log(noIncluir)
  porcentajeAcierto = acierto/ (item.length-noIncluir)
  porcentajeUnoCinco = (acertoUnoCinco / cantUnocinco* 100).toFixed(2) + "%"
  porcentajeTresCinco = (acertoTresCinco/cantTresCinco* 100).toFixed(2) + "%"
  contPorGoles.innerText = (porcentajeAcierto * 100).toFixed(2) + "%"
  contPortres.innerText = porcentajeTresCinco
  contPoruno.innerText = porcentajeUnoCinco
 

  // Una vez que tenemos los datos, actualizamos el DataTable
  table.clear(); // Limpiar cualquier dato existente
  table.rows.add(listData); // Agregar las filas con los nuevos datos
  table.draw(); // Redibujar la tabla

  const inpRlaway= document.querySelectorAll(".inpRl_away")
  const inpRlHome = document.querySelectorAll('.inpRl_home')

  inpRlHome.forEach((input)=>{
    input.addEventListener('input', function (){
        //update en db
        updatePronostico(input.id, input.value, null)
        console.log("actualizado")
    })
  })

  inpRlaway.forEach((input)=>{
    input.addEventListener('input', function (){
        //update en db

        updatePronostico(input.id, null, input.value)
        console.log("actualizado")

    })
  })

  return listData; // Retornar los datos formateados
}


function inpColor(input) {
  if (input.value == 1) {
    input.classList.add('bg-success')
    input.classList.remove('bg-danger')

  } else if (input.value == 0) {
    input.classList.add('bg-danger')
    input.classList.remove('bg-success')

  } else if (input.value == "") {
    input.classList.add('bg-warning')
  }
}

async function updatePronostico(id,res_home = null, res_away= null) {

  fetch('https://soccerapi-kaut.onrender.com/api/pronostics', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', // Indica que el contenido es JSON
    },
    body: JSON.stringify(
      {
        "id_match": id,
        "res_home": res_home,
        "res_away": res_away
      }
    )
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
}


async function getResultados(country, league, index, type) {
  btnSelector(index);
  loader.style.display = 'flex';


  fetch(`https://soccerapi-kaut.onrender.com/api/partidos?country=${country}&league=${league}&type=${type}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Variable para acumular las filas
      let rows = "";
      let contador = 0;

      // Itera sobre cada partido
      data.forEach(item => {
        contador += 1;

        // Agrega una fila para cada partido
        rows += `
            <tr onclick="openMatchResult('${item.partido_id}')" class="tr-match" style="cursor: pointer;">
              <td class="td-table">${contador}</td>
              <td class="td-table">
                <img src="${item.logo_local}" alt="${item.equipo_local}" style="width: 30px; height: 30px;">
                ${item.equipo_local}
              </td>
              <td class="td-table">
                <img src="${item.logo_visitante}" alt="${item.equipo_visitante}" style="width: 30px; height: 30px;">
                ${item.equipo_visitante}
              </td>
              <td class="td-table">${item.fecha_y_hora}</td>
            </tr>
            `;

      });

      // Actualiza el contenido de la tabla con las filas generadas
      contMatches.innerHTML = rows;
    })
    .catch(error => console.error('Error al obtener los partidos:', error))
    .finally(() => {
      loader.style.display = 'none';
    });
}


async function getDataResult() {
  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const partido = params.get("partido");
  const tablaActual = document.getElementById('body-table-actual');
  const tablaHistory = document.getElementById('body-table-history');
  const tablaAPronostico = document.getElementById('body-table-pronostico');
  const contSuperior = document.getElementById('cont-sup');

  loader.style.display = 'flex';


  fetch('https://soccerapi-kaut.onrender.com/api/pronostics/old', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Indica que el contenido es JSON
    },
    body: JSON.stringify({
      id_match: partido,
    })
  })
    .then(response => response.json())
    .then(data => {
      row = `
            <tr>
                    <td>${data.actual_data.GL}</td>
                    <td>${data.actual_data.GV}</td>
                    <td>${data.actual_data.SG}</td>
                    <td>${(data.actual_data.por_L * 100).toFixed() + '%'}</td>
                    <td>${(data.actual_data.por_V * 100).toFixed() + '%'}</td>
                    <td>${(data.actual_data.Por_D * 100).toFixed() + '%'}</td>
                  </tr>
            `;


      tablaActual.innerHTML = row;

      rowH = `
      <tr>
              <td>${data.history_data.GL}</td>
              <td>${data.history_data.GV}</td>
              <td>${data.history_data.SG}</td>
              <td>${(data.history_data.por_L * 100).toFixed() + '%'}</td>
              <td>${(data.history_data.por_V * 100).toFixed() + '%'}</td>
              <td>${(data.history_data.Por_D * 100).toFixed() + '%'}</td>
            </tr>
      `;

      tablaHistory.innerHTML = rowH;

      rowP = `
      <tr>
              <td>${data.pronosticos.GL}</td>
              <td>${data.pronosticos.GV}</td>
              <td>${data.pronosticos.SG}</td>
              <td>${(data.pronosticos.por_L * 100).toFixed() + '%'}</td>
              <td>${(data.pronosticos.por_V * 100).toFixed() + '%'}</td>
              <td>${(data.pronosticos.Por_D * 100).toFixed() + '%'}</td>
              <td>${data.pronosticos.min_goles}</td>
              <td>${data.pronosticos.result_GL}</td>
              <td>${data.pronosticos.result_GV}</td>
              <td>${data.pronosticos.Ganador}</td>
              <td>${data.pronosticos.Acertado_Ganador}</td>
              <td>${data.pronosticos.Acertado_Goles}</td>
            </tr>
      `;
      tablaAPronostico.innerHTML = rowP;

      let fecha = new Date(data.match.date);
      let fechaSolo = fecha.toLocaleDateString('en-GB'); // '24/09/2021'


      content = `
           <div class="lados">
                    <img src="${data.match.logo_home}">
                    <span>${data.match.home}</span>
                </div>
                <div class="centro">
                    <h1>VS</h1>
                    <span>${fechaSolo}</span>
                </div>
                <div class="lados">
                    <img src="${data.match.logo_away}" alt="fdsf">
                    <span>${data.match.away}</span>
                </div>
      `;
      contSuperior.innerHTML = content;
    }).catch(error => console.error('Error al obtener los partidos:', error))
    .finally(() => {
      loader.style.display = 'none';
    });;
}

function getAll() {
  setTimeout(function () {
    var elementos = document.querySelectorAll('.tr-match'); // Asegúrate de usar la clase correcta
    console.log(elementos)
    console.log(elementos.length)
    elementos.forEach(function (elemento) {
      elemento.click();
    });
  }, 1000);
}