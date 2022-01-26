window.onload = main;

function main() {
  mostrarCaptcha();
  document.getElementById("enviar").addEventListener("click", validar, false);
  document.getElementById("nombre").addEventListener("blur", validarNombre, false);
  document.getElementById("apellidos").addEventListener("blur", validarApellidos, false);
  document.getElementById("nif").addEventListener("blur", validarNIF, false);
  document.getElementById("email").addEventListener("blur", validarCorreo, false);
  document.getElementById("email2").addEventListener("blur", validarCorreo2, false);
  document.getElementById("nickname").addEventListener("blur", validarNickName, false);
  document.getElementById("contra").addEventListener("blur", validarPassword, false);
  document.getElementById("contra2").addEventListener("blur", validarPassword2, false);
  document.getElementById("captcha").addEventListener("blur", validarCapcha, false);
}
function validarNombre() {
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
  }
  return true;
}

function validarApellidos() {
  esborrarError();
  let apellidos = document.getElementById("apellidos");
  let valorApellidos = apellidos.value;

  if (!apellidos.checkValidity()) {
    if (apellidos.validity.valueMissing) {
      error2(apellidos, "Deus d'introduïr els apellidos.");
      return false;
    }
    if (valorApellidos.length < 2) {
      error2(apellidos, "Els apellidos ha de contindre almenys 2 caracters.");
      return false;
    }
  }
  return true;
}

function validarNIF() {
  esborrarError();
  let nif = document.getElementById("nif");

  if (!nif.checkValidity()) {
    if (nif.validity.valueMissing) {
      error2(nif, "Deus d'introduïr un nùmero NIF/NIE");
      return false;
    }
    if (nif.validity.patternMismatch) {
      error2(nif, "El NIF/NIE no te el format correcte");
      return false;
    }
  }
  if (validarLetraNIF() == false) {
    return false;
  }
  return true;
}

function validarLetraNIF() {
  esborrarError();
  let nif = document.getElementById("nif").value;
  let numeros = nif.substring(0, nif.length - 1);
  let resto = numeros % 23;

  let letras = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
  
  letras = letras.join("");
  let caracter = nif.charAt(8);
  let compro = letras.charAt(resto);
  
  

  if (caracter == compro) {
    return true;
  } else {
    error2(nif, "NIF no es correcte");
    return false;
  }
}

function validarCorreo() {
  esborrarError();
  let correo = document.getElementById("email");

  if (!correo.checkValidity()) {
    if (correo.validity.valueMissing) {
      error2(correo, "Has d'introduir un correu electronic");
      return false;
    }
  }
  return true;
}

function validarCorreo2() {
  esborrarError();
  let correo2 = document.getElementById("email2");

  if (!correo2.checkValidity()) {
    if (correo2.validity.valueMissing) {
      error2(correo2, "Has d'introduir la validació del correu electronic");
    }
  }
  return true;
}

function comprobacionCorreo() {
  esborrarError();
  let correo = document.getElementById("email").value;
  let correo2 = document.getElementById("email2").value;

  if (correo != correo2) {
    error2(correo2, "No coincideixen els correus electronics");
    return false;
  }
  return true;
}

function validarNickName() {
  esborrarError();
  let nickname = document.getElementById("nickname");
  let valorNickname = nickname.value;

  if (!nickname.checkValidity()) {
    if (nickname.validity.valueMissing) {
      error2(nickname, "Has d'introduir un Nickname");
      return false;
    }
    if (valorNickname.length < 2) {
      error2(nickname, "El Nickname ha de contindre almenys 2 caracters.");
      return false;
    }
  }
  return true;
}

function validarPassword() {
  esborrarError();
  let password = document.getElementById("contra");
  let valorPassword = password.value;

  if (!password.checkValidity()) {
    if (password.validity.valueMissing) {
      error2(password, "Has d'introduir una contrasenya");
      return false;
    }
    if (valorPassword.length < 8) {
      error2(nickname, "La contrasenya a de contindre al menys 8 caracters.");
      return false;
    }
  }
  return true;
}

function validarPassword2() {
  esborrarError();
  let password2 = document.getElementById("contra2");
  let valorPassword = password2.value;
  if (!password2.checkValidity()) {
    if (password2.validity.valueMissing) {
      error2(nickname, "Has d'introduir una contrasenya");
      return false;
    }
    if (valorPassword.length < 8) {
      error2(nickname, "La contrasenya a de contindre al menys 8 caracters.");
      return false;
    }
    
}
  return true;
}

function comprobacionPassword(){
  let password = document.getElementById("contra").value;
  let password2 = document.getElementById("contra2").value;

  if (password != password2) {
    error2(correo2, "No coincideixen les contrasenyes");
    return false;
}
return true;
}
var num1 = Math.floor(Math.random() * (20 - 10) + 10);
var num2 = Math.floor(Math.random() * (10 - 5) + 5);
var operador = Math.floor(Math.random()*2);
function validarCapcha(){
esborrarError();
let idCapcha = document.getElementById("captcha");

if (!idCapcha.checkValidity()) {
if(idCapcha.validity.valueMissing){
  error2(idCapcha, "Tens que introduir el captcha.");
  return false;
}
if(idCapcha.validity.patternMismatch){
  error2(idCapcha, "Tens que introduir el captcha.");
  return false;
}
if(operador == 0){
  if(num1+num2 != idCapcha.value){
    error2(idCapcha, "El captcha esta mal calculat, calcula de nou");
    return false;
  }
}
if(operador == 1){
  if(num1-num2 != idCapcha.value){
    error2(idCapcha, "El captcha esta mal calculat, calcula de nou");
    return false;
  }
}
}
return true;
}

function mostrarCaptcha(){
  let idCapcha = document.getElementById("captcha");

  if(operador == 0){
    idCapcha.setAttribute("placeholder", num1 + " + " + num2 + " =");
  }else{
    idCapcha.setAttribute("placeholder", num1 + " - " + num2 + " =");
  } 
}

function esborrarError() {
  let formulari = document.forms[0];
  for (let i = 0; i < formulari.elements.length; i++) {
    formulari.elements[i].className = "";
  }
}

function error2(element, missatge) {
  document.getElementById("missatgeError").innerHTML = missatge;
  element.className = "error";
  element.focus();
}

function validar(e) {
  esborrarError();
  if (validarNombre() && validarApellidos() && validarNIF() && validarCorreo() && validarCorreo2() && validarNickName() && validarPassword() && validarPassword2() && comprobacionCorreo && comprobacionPassword && confirm("Confirma si vols enviar el formulari")) {
    return true;
  } else {
    e.preventDefault();
    return false;
  }
}
