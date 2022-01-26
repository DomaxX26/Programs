window.onload = main;
let arrayLlibres = [];
function main(){
	obtenerLocalStoratge();
	cargarAutor();
}

function obtenerLocalStoratge(){
	let usuari = document.getElementById("usuari");
	
	if(JSON.parse(localStorage.getItem("usuari")) != null){
		var dades = JSON.parse(localStorage.getItem("usuari"));
	}
	usuari.append(dades.nom + " - " + dades.email);
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
	})
	.then(filtro =>{
		filtroBusqueda()
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

		let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", element._id);
		checkbox.addEventListener("click", confirmarReserva);

        let titulo = document.createTextNode(element.titulo);
        let editorial = document.createTextNode(element.editorial);
        let precio = document.createTextNode(element.precio);
		let autor = document.createTextNode(traureNom(element.autor));  
        
        td1.appendChild(checkbox);
        td2.appendChild(titulo);
        td3.appendChild(editorial);
        td4.appendChild(precio);
		td5.appendChild(autor);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
		tr.appendChild(td4);
        tr.appendChild(td5);

        files.appendChild(tr);
		arrayLlibres.push(element);
    });
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

function filtroBusqueda(){
    let titols = [];

    arrayLlibres.forEach(elem =>{
        titols.push(elem.titulo);
    })

	$("#titol").autocomplete({
		source:titols
	});
}

function confirmarReserva(){
	arrayLlibres.forEach(element => {
	if(this.id == element._id){
		let llibre = {
			id: element._id,
			titol: element.titulo,
			editorial: element.editorial,
			preu: element.precio,
			autor: element.autor
		};

		localStorage.setItem("llibre", JSON.stringify(llibre));
	}
});
	window.location.href = "reservarConfirmar.html";
}