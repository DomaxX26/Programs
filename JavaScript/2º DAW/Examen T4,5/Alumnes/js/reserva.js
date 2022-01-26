window.onload = main;

function main(){
    recuperarLocalStoratge();
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function recuperarLocalStoratge(){
    let cotxe = JSON.parse(localStorage.getItem("cotxe"));
    
    let nombre = document.getElementsByClassName("card-title");
    let nombretxt = cotxe.marca + " " + cotxe.model;

    let strong = document.getElementsByTagName("strong");
    let precio = document.getElementsByClassName("font-weight-bold");
    let img = document.getElementsByClassName("card-img-top");
    img[0].setAttribute("src", "img/"+cotxe.image);
    precio[0].append(cotxe.preu + " €");
    nombre[0].append(nombretxt);
    strong[0].append(cotxe.any);
    strong[1].append(cotxe.km + " Km.");
    strong[2].append(cotxe.canvi);
    strong[3].append(cotxe.combustible);

}

function validarNombreApellidos(){
    esborrarError();
  let nombre = document.getElementById("nombreApellidos");
  let valorNombre = nombre.value;

  
  if (!nombre.checkValidity()) {
    if (nombre.validity.valueMissing) {
      error2(nombre, "Deus d'introduïr un nom.");
      return false;
    }
    if (valorNombre.length < 2) {
      error2(nombre, "Ha de tindre almenys 2 caracters el nom.");
      return false;
    }
    if (valorNombre.length > 60) {
      error2(nombre,"Has arribat al màxim permés de càracters. (Màxim 60 càracters).");
      return false;
    }
  }
  return true;
}

function validarEmail(){
    esborrarError();
  let email = document.getElementById("email");

  if (!email.checkValidity()) {
    if (email.validity.valueMissing) {
      error2(email, "Has d'introduir un correu electronic");
      return false;
    }
    if (email.validity.patternMismatch) {
      error2(email, "No es correcte el format del correu electronic");
      return false;
    }
  }
  return true;
  }


function validarTelefono(){
    esborrarError();
    let telefono = document.getElementById("telefono");
  
    if (!telefono.checkValidity()) {
      if (telefono.validity.valueMissing) {
        error2(telefono, "Has d'introduir un nùmero de telefon");
        return false;
      }
      if (telefono.validity.patternMismatch) {
        error2(telefono, "No te el format correcte el nùmero de telefon");
        return false;
      }
    }
    return true;
}

function condiciones(){
    let aceptar = document.getElementById("aceptar");
    
    if (!aceptar.checkValidity()) {
        if (aceptar.validity.valueMissing) {
            error2(aceptar, "Has d'acceptar les condicions d'us");
            return false;
        }
    }
    return true;
}

function guardarLocalStoratge(){
    let nombre = document.getElementById("nombreApellidos");
    let email = document.getElementById("email");
    let telefono = document.getElementById("telefono");
    let nota = document.getElementById("nota");

    let persona = "";

    if (JSON.parse(localStorage.getItem("persona") != null)) {
      persona = JSON.parse(localStorage.getItem("persona"));
    }
  
    let client = {
        nom: nombre.value,
        email: email.value,
        telefon: telefono.value,
        nota: nota.value
    }
  
    
    localStorage.setItem("persona", JSON.stringify(client));
    localStorage.removeItem("cotxe");
  }

function esborrarError() {
    let formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
      formulari.elements[i].className = "";
    }
  }

  function error2(element, missatge) {
    document.getElementById("errorMensaje").innerHTML = missatge;
    element.className = "text-danger";
    element.focus();
  }

  function validar(e) {
    e.preventDefault();
    esborrarError();
    if (validarNombreApellidos() && validarEmail() && validarTelefono() && condiciones()) {
        guardarLocalStoratge();
        window.location = "index.html";
      return true;
    } else {
      return false;
    }
  }