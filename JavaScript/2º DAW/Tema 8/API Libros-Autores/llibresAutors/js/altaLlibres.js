window.onload = main;

function main(){
    document.getElementById("btnGravar").addEventListener("click", validar, false);
    validarAutor();
}

function validarTitulo(){
let titulo = document.getElementById("titol");
let valorTitulo = titulo.value;

if(!titulo.checkValidity()){
    if(titulo.validity.valueMissing){
        error2(titulo,"Es obligatori afegir un titol");
        return false;
    }
}
        if(valorTitulo < 3){
            error2(titulo, "El titol ha de contindre almenys 3 caràcters per a ser valid");
            return false;
        }
return true;

}

function validarPrecio(){
    let precio = document.getElementById("preu");

    if(!precio.checkValidity()){
        if(precio.validity.valueMissing){
            error2(precio, "No has posat ningun preu al llibre");
            return false;
        }
        if(precio.validity.rangeUnderflow){
            error2(precio, "No pot ser un preu negatiu");
            return false;
        }
    }
    return true;
}

function validarAutor(){
    fetch('https://www.serverred.es/api/autores')
	.then(response => response.json())
	.then((data) => {
        console.log(data);
        mostrarAutors(data);
	});
}

function mostrarAutors(data){
    let autor = document.getElementById("autor");

    data.resultado.forEach(element => {
        let option = document.createElement("option");
        let optionTxt = document.createTextNode(element.nombre);
        option.setAttribute("value", element._id);
        option.appendChild(optionTxt);
        autor.appendChild(option);
    });
}

function esborrarError() {
    let formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length-1; i++) {
        formulari.elements[i].className = "form-control ";
    }
    document.getElementById("missatgeError").innerHTML = "";    
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "form-control error";
    element.focus();
}

function validar(e) {
    esborrarError();
    e.preventDefault();
    if (validarTitulo() && validarPrecio()) {
        afegirLlibres();
        setTimeout(function(){
            document.location.href = "llistatLlibres.html";
        },1000);  
        return true;
    } else {
        return false;
    }
}


function afegirLlibres(){
    
    var llibre = {
        titulo: document.getElementById("titol").value,
        editorial: document.getElementById("editorial").value,
        precio: document.getElementById("preu").value,
        autor: document.getElementById("autor").value
    }

    console.log(llibre);

    fetch("https://www.serverred.es/api/libros",{
        method:'POST',
        mode:'cors',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(llibre)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

