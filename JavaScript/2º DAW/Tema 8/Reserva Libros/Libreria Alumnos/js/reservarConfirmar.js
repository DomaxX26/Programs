window.onload = main;

function main(){
	usuariLlibre();
	establirData();
	document.getElementById("dataPrestec").addEventListener("change", getDataDevolucio);
    document.getElementById("btnReservar").addEventListener("click", validar, false);
}
//Dias de tiempo para la devolución
const dies = 20;

//Fecha actual
const data  = new Date();
const any = data.getFullYear();
var mes = data.getMonth() + 1;
var dia = data.getDate();

function usuariLlibre(){
	if(JSON.parse(localStorage.getItem("usuari")) != null) {
        var usuario = JSON.parse(localStorage.getItem("usuari"));
    }

	if(JSON.parse(localStorage.getItem("llibre")) != null) {
        var libro = JSON.parse(localStorage.getItem("llibre"));
    }
	let usuari = document.getElementById("usuari");
	let llibre = document.getElementById("llibre");

	usuari.setAttribute("value", usuario.nom);
    llibre.setAttribute("value", libro.titol);
}

function establirData() {
    var campData = document.getElementById("dataPrestec");    

    if(mes < 10) {
        mes = "0" + mes;
    }

    if(mes < 10) {
        dia = "0" + dia;
    }

    var fechaActual = any+"-"+mes+"-"+dia;
    campData.setAttribute("value", fechaActual);
    campData.setAttribute("max", fechaActual);
}

function getDataDevolucio() {
    //Transformación de la fecha seleccionada
    var dataVal = document.getElementById("dataPrestec").value;
    var data = new Date(dataVal);

    //Suma de los dias de devolución en función de la fecha seleccionada
    var dataDevolucio = new Date();
    dataDevolucio.setDate(data.getDate() + dies);

    //Conversión a string de la fecha de devolución
    var anyDevolucio = dataDevolucio.getFullYear();
    var mesDevolucio = dataDevolucio.getMonth() + 1;
    var diaDevolucio = dataDevolucio.getDate();

    var fechaDevolucio = diaDevolucio+"/"+mesDevolucio+"/"+anyDevolucio;
    var valFechaDevolucio = document.createTextNode(fechaDevolucio);
    var infoDataDevolucio = document.getElementById("dataDevolucio");

    infoDataDevolucio.replaceChildren(valFechaDevolucio);
}

function validaData() {
    let data = document.getElementById("dataPrestec");
    
    if(!data.checkValidity()) {
        if(data.validity.valueMissing) {
            error2(data, "S'ha de seleccionar una data!");
        } else if(data.validity.rangeOverflow) {
            error2(data, "La data no pot ser superior a la data actual!");
        }
        return false;
    }
    return true;
}

//Validación de la fecha seleccionada
//Error para avisar al usuario
function error2(element, missatge) {
    var error = document.getElementById("missatgeError");
    var errCont = document.createTextNode(missatge);

    error.appendChild(errCont);
    element.className = "form-control error";
    element.focus();
}

//Borrado de los errores del formulario
function esborrarError() {
    var formulari = document.forms[0];

    for(var i=0; i < formulari.elements.length-1; i++) {
        formulari.elements[i].className = "form-control";
    }

    var msgError = document.getElementById("missatgeError");
    var contMsgError = document.createTextNode("");

    msgError.replaceChildren(contMsgError);
}

function validar(e) {
    esborrarError();
    e.preventDefault();

    if(validaData()){
        reserva();
    } else {
        console.log("error");
    }
}

function reserva() {
  //Objeto obtenido del localStorage
if(JSON.parse(localStorage.getItem("usuari")) != null) {
    var usuari = JSON.parse(localStorage.getItem("usuari"));
}

if(JSON.parse(localStorage.getItem("llibre")) != null) {
    var llibre = JSON.parse(localStorage.getItem("llibre"));
}
console.log(usuari,llibre);
//Fecha de la reserva
var dateVal = document.getElementById("dataPrestec").value;
var dataRes = new Date(dateVal);

//Fecha de devolución
var dataDev = new Date();
dataDev.setDate(dataRes.getDate() + dies);

//Objeto a añadir a la API
var reserva = {
    usuario: usuari._id,
    libro: llibre._id,
    fecha: dataRes,
    fechaDevolucion: dataDev
}

//Subida del objeto a la API
fetch("https://www.serverred.es/api/reservas", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(reserva),
})
.then(response => response.json())
.then(data => location.assign("llistatReserves.html"))
.catch((error) => {
    console.log("Error => ", error)
})
}