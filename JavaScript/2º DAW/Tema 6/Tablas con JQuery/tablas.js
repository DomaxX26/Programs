window.onload = main;
var cont1 = 1;
var cont2 = 1;

function main() {
	tablaMultiplicar();
	pintar();
}

function tablasMultiplicar() {
	for (let i = 1; i <= 10; i += 1) {
		tablaMultiplicar(i);
	}
}

function tablaMultiplicar() {
	for (var i = 1; i <= 100; i++) {
		if (cont2 > 10) {
			cont2 = 1;
			cont1++;
		}
		let mult = cont1 * cont2;
		$("#table").append("<tr id='multi" + i + "'>");
		$("#multi" + i + "").append("<td>" + cont1 + "</td>");

		$("#multi" + i + "").append("<td>" + cont2 + "</td>");

		$("#multi" + i + "").append("<td>" + mult + "</td>");

		$("#table").append("</tr>");
		cont2++;
	}

}

function pintar() {
	$("tr:even").css("background-color", "black"); // filas pares
	$("tr:even").css("color", "white"); //Color de la letra
	$("tr:odd").css("background-color", "white"); // filas impares
}

