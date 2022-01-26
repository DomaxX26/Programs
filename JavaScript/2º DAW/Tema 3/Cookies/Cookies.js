window.onload = main;

function main() {
	var miColor = document.getElementById("titulo");
	var elcolor = document.cookie.split("=");
	miColor.style.color = elcolor[1];
	

	document.getElementById("enviar").addEventListener("click", cambiar_color);
	document.getElementById("borrar").addEventListener("click", borrarCookies);
}




function cambiar_color() {
	var elemento = document.getElementById('radio_button');
	elemento.style.display = "none";
	
	var miColor = document.getElementById("titulo");
	
	var colors = document.getElementsByName("drone");
	colors.forEach(elem => {
		 if (elem.checked){
			 console.log(elem.value)
			 miColor.style.color = elem.value;
		document.cookie = "color=" + elem.value;
		 }

	})
}


function borrarCookies() {
	document.cookie = "color=; max-age=0;";
	alert("Cookies eliminadas correctamente");
}