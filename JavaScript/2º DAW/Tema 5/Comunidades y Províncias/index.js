window.onload = main;
var comunitats = [
  {
    comunitat: "Andalucía",
    provincies: [
      "Almería",
      "Cádiz",
      "Córdoba",
      "Granada",
      "Jaén",
      "Huelva",
      "Málaga",
      "Sevilla"
    ]
  },
  {
    comunitat: "Aragón",
    provincies: ["Huesca", "Teruel", "Zaragoza"]
  },
  {
    comunitat: "Canarias",
    provincies: ["Las Palmas", "Santa Cruz de Tenerife"]
  },
  {
    comunitat: "Cantabria",
    provincies: ["Cantabria"]
  },
  {
    comunitat: "Castilla y León",
    provincies: [
      "Ávila",
      "Burgos",
      "León",
      "Palencia",
      "Salamanca",
      "Segovia",
      "Soria",
      "Toledo",
      "Zamora"
    ]
  },
  {
    comunitat: "Castilla-La Mancha",
    provincies: [
      "Albacete",
      "Ciudad Real",
      "Cuenca",
      "Guadalajara",
      "Valladolid"
    ]
  },
  {
    comunitat: "Cataluña",
    provincies: ["Barcelona", "Girona", "Lleida", "Tarragona"]
  },
  {
    comunitat: "Ceuta",
    provincies: ["Ceuta"]
  },
  {
    comunitat: "Comunidad Valenciana",
    provincies: ["Alicante", "Castellón", "Valencia"]
  },
  {
    comunitat: "Comunidad de Madrid",
    provincies: ["Madrid"]
  },
  {
    comunitat: "Extremadura",
    provincies: ["Badajoz", "Cáceres"]
  },
  {
    comunitat: "Galicia",
    provincies: ["La Coruña", "Lugo", "Orense", "Pontevedra"]
  },
  {
    comunitat: "Islas Baleares",
    provincies: ["Islas Baleares"]
  },
  {
    comunitat: "La Rioja",
    provincies: ["La Rioja"]
  },
  {
    comunitat: "País Vasco",
    provincies: ["Álava", "Guipúzcoa", "Vizcaya"]
  },
  {
    comunitat: "Navarra",
    provincies: ["Navarra"]
  },
  {
    comunitat: "Melilla",
    provincies: ["Melilla"]
  },
  {
    comunitat: "Principado de Asturias",
    provincies: ["Asturias"]
  },
  {
    comunitat: "Región de Murcia",
    provincies: ["Murcia"]
  }
];

function main() {
  cargarComunidades();
  document.getElementById("comunidades").addEventListener("change", mostrarProvincias);
}

//Crear elemento <option> para mostrarlos
function mostrarComunidades(comunidad, ind) {
  let select = document.getElementById("comunidades");
  let option = document.createElement("option");
  let txt = document.createTextNode(comunidad.comunitat);
  option.setAttribute("value", ind);
  option.appendChild(txt);
  select.appendChild(option);
}

//Recorrer el array de de comunidades
function cargarComunidades() {
  comunitats.forEach((comunidad, ind) => {
    mostrarComunidades(comunidad, ind);
  });
}

function mostrarProvincias() {
  let numeroProvincia = document.getElementById("comunidades").value;
  borrarOptions();
  let select_provincias = document.getElementById("provincias");
  
  var option;
  comunitats[numeroProvincia].provincies.forEach(element=>{
    option = document.createElement("option");
     let txt = document.createTextNode(element);
     option.appendChild(txt);
     select_provincias.appendChild(option);
     select_provincias.replaceChild(option,option);

  });
}

function borrarOptions(){
  let select_provincias = document.getElementById("provincias");
  for(let i = select_provincias.options.length; i >=0; i--){
    select_provincias.remove(i);
  }
}