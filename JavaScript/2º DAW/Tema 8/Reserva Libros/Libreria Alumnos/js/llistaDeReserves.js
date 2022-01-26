window.onload = main;

function main(){
	mostrarUsuaris();
}

var infoUsuari = [];
var infoLlibre = [];
var infoReserva = [];

function mostrarUsuaris(){
	fetch("https://serverred.es/api/usuarios")
    .then(response => response.json())
    .then(data => {
        data.resultado.forEach(element => {
            infoUsuari.push(element);
        })
        mostrarLlibres();
    })
}

function mostrarLlibres(){
	fetch("https://serverred.es/api/libros")
    .then(response => response.json())
    .then(data => {
        data.resultado.forEach(element => {
            infoLlibre.push(element);
        })
    })
    mostrarReserves();
}

function mostrarReserves(){
	var tabla = document.getElementById("files");

    fetch("https://serverred.es/api/reservas")
    .then(response => response.json())
    .then(data => {
        data.resultado.forEach(element => {
            
            var dataRes = new Date(element.fecha)
            var anyReserva = dataRes.getFullYear();
            var mesReserva = dataRes.getMonth() + 1;
            var diaReserva = dataRes.getDate();

            if(mesReserva < 10) {
                mesReserva = "0" + mesReserva;
            }

            if(diaReserva < 10) {
                diaReserva = "0" + diaReserva;
            }

            var dataDev = new Date(element.fechaDevolucion);
            var anyDevolucio = dataDev.getFullYear();
            var mesDevolucio = dataDev.getMonth() + 1;
            var diaDevolucio = dataDev.getDate();

            if(mesDevolucio < 10) {
                mesDevolucio = "0" + mesDevolucio;
            }

            if(diaDevolucio < 10) {
                diaDevolucio = "0" + diaDevolucio;
            }

            var usuario = document.createTextNode(buscarUsuario(element.usuario));
            var libro = document.createTextNode(buscarLibro(element.libro));
            var fechaRes = document.createTextNode(anyReserva+"-"+mesReserva+"-"+diaReserva);
            var fechaDev = document.createTextNode(anyDevolucio+"-"+mesDevolucio+"-"+diaDevolucio);

            var tr = document.createElement("tr");
            var td_1 = document.createElement("td");
            var td_2 = document.createElement("td");
            var td_3 = document.createElement("td");
            var td_4 = document.createElement("td");

            td_1.appendChild(usuario);
            td_2.appendChild(libro);
            td_3.appendChild(fechaRes);
            td_4.appendChild(fechaDev);

            tr.appendChild(td_1);
            tr.appendChild(td_2);
            tr.appendChild(td_3);
            tr.appendChild(td_4);

            tabla.appendChild(tr);
        })
    })
}

function buscarUsuario(idUsuario) {
    infoUsuari.forEach(element => {
        if(idUsuario == element._id) {
            idUsuario = element.nombre;
        }
    })
    return idUsuario;
}

function buscarLibro(idLibro) {
    infoLlibre.forEach(element => {
        if(idLibro == element._id) {
            idLibro = element.titulo;
        }
    })
    return idLibro;
}