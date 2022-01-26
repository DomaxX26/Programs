window.onload = main;

function main() {
    if (JSON.parse(localStorage.getItem("token") != null)) {
        carregarDades();
        document.getElementById("enviar").addEventListener("click", validar, false);
        document.getElementById("enviarAvatar").addEventListener("click", canviarAvatar);
    } else {
        location.assign("login.html");
    }

}

function validarNom() {
    let nom = document.getElementById("nom");

    if (!nom.checkvalidity) {
        if (nom.validity.valueMissing) {
            error2(nom, "Nom Obligatori");
            return false;
        }
        if (nom.validity.patternMismatch) {
            error2(nom, "No es correcte el format del nom introduït");
            return false;
        }
    }
    return true;
}

function carregarDades() {
    
    fetch("https://userprofile.serverred.es/api/areaPersonal", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let user = document.getElementById("user");
            let input = document.getElementById("nom");
            let avatarAP = document.getElementById("avatarAP");
            let avatar = document.getElementById("avatar");
            
            let nombre  = document.createTextNode(data.data.user.name);

            avatarAP.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ data.data.user.avatar);
            avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ data.data.user.avatar);
            user.replaceChildren(nombre);
            input.setAttribute("value", data.data.user.name);
        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}

function novaContrasenya() {
    let contrasenya = document.getElementById("password");

    if (!contrasenya.checkValidity()) {
        if (contrasenya.validity.valueMissing) {
            error2(contrasenya, "Contrasenya obligatoria");
            return false;
        }
        if (contrasenya.validity.patternMismatch) {
            error2(contrasenya, "Contrasenya no te el format correcte");
            return false;
        }
    }
    return true;
}

function validarContrasenya() {
    let contrasenya1 = document.getElementById("password").value;
    let contrasenya2 = document.getElementById("passwordc").value;

    if (contrasenya2 != contrasenya1) {
        error2(contrasenya1, "Les contrasenyes no coincideixen");
        return false;
    }
    return true;
}

function canviarAvatar(e) {
    e.preventDefault();
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    formData.append("avatar", fileField.files[0]);
    var token = localStorage.getItem("token");
    fetch(" https://userprofile.serverred.es/api/areapersonal/avatar",{
        method: "PUT",
        headers : {
            "auth-token": `${token}` 
        },
        body: formData
    })
    .then(response => response.json())
    .then(result =>{
        console.log("Success:",result);
        
    })
    .then(carregarDades())
    .catch(error=>{
        console.log("Error:",error);
    })
    setTimeout(() => {
        window.location.reload();
    }, 150);
}

function esborrarError() {
    let formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length - 1; i++) {
        formulari.elements[i].className = "form-control";
    }
    document.getElementById("missatgeError").innerHTML = "";
}

function error2(element, missatge) {
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error form-control";
}

function validar(e) {
    esborrarError();
    e.preventDefault();
    if (validarNom() && novaContrasenya() && validarContrasenya()) {
        cambiarPassword();
        return true;
    } else {
        return false;
    }
}

function cambiarPassword() {
    var passwd = {
        "name": document.getElementById("nom").value,
        "password": document.getElementById("passworda").value,
        "newPassword": document.getElementById("password").value
    }

    fetch(" https://userprofile.serverred.es/api/areaPersonal", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify(passwd)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.error == null) {
                alert("S'ha actualitzat la contraseña correctament");
            }
            else{
                error2(document.getElementById("nom"), data.error);
            }
        })
        .catch(error => console.log(error));
        setTimeout(() => {
            window.location.reload();
        }, 150);
}