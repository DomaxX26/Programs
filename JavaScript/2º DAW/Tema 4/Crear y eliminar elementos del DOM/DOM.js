window.onload = main;

function main(){
	document.getElementById("añadir").addEventListener("click", añadir);
    document.getElementById("eliminar").addEventListener("click", eliminar);
}

function añadir(){
	let tarea = prompt("Añade una tarea");

	if(tarea != null){
	var ol = document.getElementById("ol");
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(tarea));
	ol.appendChild(li);
	}
}

function eliminar(){
	var ol = document.getElementById("ol");
	if(ol.childElementCount != 0){
		ol.lastChild.remove(ol);
	}
}