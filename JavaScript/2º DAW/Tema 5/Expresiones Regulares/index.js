window.onload = main;

function main() {
    document.getElementById("enviar").addEventListener("click", validar ,false);
}

function validarDNI() {
    let dni = document.getElementById("dni");
    let pattern = new RegExp(/^\d{8}[A-Z]{1}$/);

    if(pattern.test(dni.value)){
        return true;
    }else{
        error2(dni, "Error: camp DNI incorrecte");
        return false;
    }
    
}

function validarTelefono() {
    let tel = document.getElementById("tel");
    let pattern = new RegExp(/^\d{3}\s\d{3}\s\d{3}$/);

    if(pattern.test(tel.value)){
        return true;
    }else{
        error2(tel, "Error: camp telèfon incorrecte");
        return false;
    }
}

function validarFecha() {
    let data = document.getElementById("fecha");
    let pattern = new RegExp(/^(19[7-9][0-9]||20[0-1][0-9]||202[0-1])\/([0][1-9]||[1][0-2])\/([0][1-9]||[1-2][0-9]||[3][0-1])$/);

    if(pattern.test(data.value)){
        return true;
    }else{
        error2(data, "Error: camp data incorrecte");
        return false;
    }
}

function validarMatricula() {
    let mat = document.getElementById("matricula");
    let pattern = new RegExp(/^\d{4}\s[A-Z]{3}$/);

    if(pattern.test(mat.value)){
        return true;
    }else{
        error2(mat, "Error: camp matrìcula incorrecte");  
        return false;
    }
}

function validarEmail() {
    let email = document.getElementById("email");
    let pattern = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);

    if(pattern.test(email.value)){
        return true;
    }else{
        error2(email, "Error: camp email incorrecte");  
        return false;
    }
}

function validarURL() {
    let url = document.getElementById("url");
    let pattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

    if(pattern.test(url.value)){
        return true;
    }else{
        error2(url, "Error: camp URL incorrecte");  
        return false;
    }

}


function esborrarError() {
    let formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }
}

function error2(element, missatge) {
    let error = document.getElementById("capaError");
    

    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

function validar(e) {
    esborrarError();
    if (validarDNI() && validarTelefono() && validarFecha() && validarMatricula() && validarEmail() && validarURL() && confirm("Confirma si vols enviar el formulari")) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}