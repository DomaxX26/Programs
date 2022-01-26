window.onload = main;

function main() {
	document.getElementById("mostrar").addEventListener("click", mostrar);
	document.getElementById("ocultar").addEventListener("click", ocultar);
}

function mostrar() {
	let select = document.getElementById("select");

	if (select.value == "text1") {
		let texto1 = document.getElementById("texto1");
		texto1.style.display = 'block';
	}
	if (select.value == "text2") {
		let texto2 = document.getElementById("texto2");
		texto2.style.display = 'block';
	}
	if(select.value == "text3"){
		let texto1 = document.getElementById("texto1");
		texto1.style.display = 'block';
		let texto2 = document.getElementById("texto2");
		texto2.style.display = 'block';
	}
}

function ocultar() {
	let select = document.getElementById("select");

	if (select.value == "text1") {
		let texto1 = document.getElementById("texto1");
		texto1.style.display = 'none';
	}
	if (select.value == "text2") {
		let texto2 = document.getElementById("texto2");
		texto2.style.display = 'none';
	}
	if(select.value == "text3"){
		let texto1 = document.getElementById("texto1");
		texto1.style.display = 'none';
		let texto2 = document.getElementById("texto2");
		texto2.style.display = 'none';
	}

}