window.onload = main;

function main(){
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}

function validarNom(){
    let nombre = document.getElementById("nom");
    let valorNombre = nombre.value;
    
if (!nombre.checkValidity()) {
    if (nombre.validity.valueMissing) {
        error2(nombre, "Deus d'introduïr un nom.");
        return false;
    }
}
        if (valorNombre.length < 3) {
            error2(nombre, "Ha de tindre almenys 3 caracters el nom.");
            return false;
        }
return true;

}

function validarAnyNaixement(){
    let any = document.getElementById("anynaix");
    if(!any.checkValidity()){
        if(any.validity.valueMissing){
            error2(any, "Deus d'introduïr un any.");
            return false;
        }

        if(any.validity.rangeUnderflow){
            error2(any,"No pot ser inferior el any de 0 antes de Yisucrit");
            return false;
        }

        if(any.validity.rangeOverflow){
            error2(any, "No pot superar l'any 2000");
            return false
        }

    }
    return true;
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
    if (validarNom() && validarAnyNaixement()) {
        afegirAutor();
        setTimeout(function(){
            document.location.href = "llistatAutors.html";
        },200);
        
        return true;
    } else {
        return false;
    }
}


function afegirAutor(){
    var autor = {
        nombre: document.getElementById("nom").value,
        año_nacimiento: document.getElementById("anynaix").value
    }

    fetch("https://www.serverred.es/api/autores",{
        method:'POST',
        mode:'cors',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(autor)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}