window.onload = main;
let arrayAutores = new Array();

function main(){
    cargarAutor()
    document.getElementById("nouLlibre").addEventListener("click", nouLlibre);
}

function nouLlibre() {
    document.location.href = "altaLlibres.html";
}

function cargarAutor() {
    fetch("https://www.serverred.es/api/autores")
        .then(response => response.json())
        .then(data => {
            arrayAutores=data.resultado;
            carregarLlibres();
        });
    
}

function carregarLlibres(){
    fetch('https://www.serverred.es/api/libros')
	.then(response => response.json())
	.then(libros => {
        mostrarLlibres(libros);
	});
}

function mostrarLlibres(libros){
    var files = document.getElementById("files");   
    libros.resultado.forEach(element=> {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");

        let botonBorrar = document.createElement("button");
        let botonBorrarTexto = document.createTextNode("Esborrar");
        botonBorrar.setAttribute("class", "btn btn-primary btn-lg my-3");
        botonBorrar.setAttribute("onclick", "borrarLlibre(this)");
        botonBorrar.setAttribute("id",element._id);
        botonBorrar.appendChild(botonBorrarTexto);

        let botonModificar = document.createElement("button");
        let botonModificarTexto = document.createTextNode("Modificar");
        botonModificar.setAttribute("class", "btn btn-primary btn-lg my-3");
        botonModificar.setAttribute("onclick", "paginaModificar(this)");
        botonModificar.setAttribute("id",element._id);
        botonModificar.appendChild(botonModificarTexto);

        let titulo = document.createTextNode(element.titulo);
        let editorial = document.createTextNode(element.editorial);
        let precio = document.createTextNode(element.precio);
        let autor = document.createTextNode(traureNom(element.autor));       
        console.log(autor);
        td1.appendChild(botonBorrar);
        td2.appendChild(botonModificar);
        td3.appendChild(titulo);
        td4.appendChild(editorial);
        td5.appendChild(precio);
        td6.appendChild(autor);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        files.appendChild(tr);
    });
}

function borrarLlibre(element){
    fetch("https://www.serverred.es/api/libros/"+element.id,{
        method:'DELETE',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

function paginaModificar(elem){
    localStorage.setItem("idLlibre", JSON.stringify(elem.id));
    window.location.href = "modificarllibres.html";
}

function traureNom(id){
    let auxId="borrado";
    
    arrayAutores.forEach(element => {
        if(element._id==id){
            auxId= element.nombre;
        }
    });
    return auxId;
}