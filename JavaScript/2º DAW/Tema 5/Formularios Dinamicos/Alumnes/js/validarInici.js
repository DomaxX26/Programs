window.onload = main;

function main() {
  localStorage.clear();
  document.getElementById("siguiente").addEventListener("click", validar,false);
}

function validarNombreApellido() {
  esborrarError();
  let nombre = document.getElementById("nombre");
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

function validarEmail() {
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

function validarTelefono() {
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

function guardarLocalStoratge(){
  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("email").value;
  let telefono = document.getElementById("telefono").value;
  let usuario = "";

  if (JSON.parse(localStorage.getItem("contacte") != null)) {
    usuario = JSON.parse(localStorage.getItem("contacte"));
  }

  let contacte = {
    nom: nombre,
    correu: email,
    tel: telefono
  };

  
  localStorage.setItem("contacte", JSON.stringify(contacte));
}

function esborrarError() {
  let formulari = document.forms[0];
  for (let i = 0; i < formulari.elements.length; i++) {
    formulari.elements[i].className = "";
  }
}

function error2(element, missatge) {
  document.getElementById("mensajeError").innerHTML = missatge;
  element.className = "text-danger";
  element.focus();
}

function validar(e) {
  e.preventDefault();
  esborrarError();
  if (validarNombreApellido() && validarEmail() && validarTelefono()) {
    guardarLocalStoratge();
    window.location = "FDArticles.html";
    return true;
  } else {
    return false;
  }
}
