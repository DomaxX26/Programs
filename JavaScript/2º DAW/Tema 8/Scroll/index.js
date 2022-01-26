let arrPoke = new Array;
window.onload = main;

let pokemons = 10;
let pagina = 0;

function main() {
	
	// cridar al api 
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1100&offset=0')
	.then(response => response.json())
	.then(data => {
		arrPoke = data.results;
		cargarLista();
	});
	document.addEventListener("scroll", ()=>{
		console.log("Conttol Scrool",document.body.scrollHeight - window.innerHeight, window.scrollY);
		if(document.body.scrollHeight - window.innerHeight == window.scrollY){
		  cargarLista();
		}
	  });
}



function cargarLista() {
    for (let i = pagina; i < pokemons; i++) {
        cargarPagina(arrPoke[i], i);
    };
	pagina = pokemons;
	pokemons += pokemons;
}


function cargarPagina(element, ind) {

    fetch(element.url)
        .then(response => response.json())
        .then(data => {
            
            // Afegir dades
            document.getElementById("listado").innerHTML += '<div class="card mb-4">' +
                '<a href="#!"><img class="card-img-top" src="' + data.sprites.front_default + '" alt="..." /></a>' +
                '<div class="card-body">' +
                '<h2 class="card-title">' + data.name + '</h2>' +
                '<div class="row">' +
                '<div class="col p-3 text-center"><strong>Peso: ' + data.weight + ' </strong></div>' +
                '<div class="col p-3 text-center"><strong>Altura: ' + data.height + ' </strong></div>' +
                '</div>' +
                '</div>' +
                '</div>';


        });
};