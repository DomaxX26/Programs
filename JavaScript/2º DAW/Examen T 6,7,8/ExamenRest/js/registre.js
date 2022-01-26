window.onload = main;

function main() {
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function validarNombre() {
  let nom = document.getElementById("nom");

  if (!nom.checkValidity()) {
    if (nom.validity.valueMissing) {
      error2(nom, "Nom obligatori");
      return false;
    }
    if (nom.validity.patternMismatch) {
      error2(nom, "El nom no esta dins del rang (6 - 255) caràcters");
      return false;
    }
  }
  return true;
}

function validarCorreo() {
  let correu = document.getElementById("email");

  if (!correu.checkValidity()) {
    if (correu.validity.valueMissing) {
      error2(correu, "Correu obligatori");
      return false;
    }
    if (correu.validity.patternMismatch) {
      error2(correu, "No es correcte el correu electrònic introduït");
      return false;
    }
  }
  return true;
}

function validarContrasenya() {
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

function contrasenyaCorrecta() {
    let contrasenya1 = document.getElementById("password").value;
    let contrasenya2 = document.getElementById("passwordc").value;

    if(contrasenya2 != contrasenya1){
        error2(contrasenya1,"Les contrasenyes no coincideixen");
        return false;
    }
    return true;
}

function registrar() {
    let nom = document.getElementById("nom").value;
    let correu = document.getElementById("email").value;
    let contrasenya = document.getElementById("passwordc").value;

    var usuari = {
        name: nom,
        email: correu,
        password: contrasenya
    }

    fetch("https://userprofile.serverred.es/api/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(usuari),
})
.then(response => response.json())
.then(data => {
    if(data.error == null){
        alert("Usuari s'ha registrat correctament");
        location.assign("index.html")
    }else{
        error2(document.getElementById("nom"), data.error)
    }
    console.log(data);

})
.catch((error) => {
    console.log("Error => ", error);
})
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
    if (validarNombre() && validarCorreo() && validarContrasenya() && contrasenyaCorrecta()) {
        registrar();
        return true;
    }  else {
        return false;
    }
}
