window.onload = main;

function main() {
    mostrarHora();
    changeRadio();
    document.getElementById("Enviar").addEventListener("click", validar, false);
}

function validarProvincia() {
    
    var element = document.querySelector("input[name='provincia']:checked");

    if (!element) {
        error2(element, "Has de seleccionar una provincia");
        return false;
    }
    return true;
}

function mostrarEstacio(){
  debugger;
  let radioButton = document.getElementsByName("provincia");
  let select = document.getElementById("estacio");
  
  for(let i = 0; i < radioButton.length; i++){
      if(radioButton[i].checked == true){
          while(select.firstChild){
              select.removeChild(select.lastChild);
          }
          for(let j = 0; j < estacions[i].estacio.length; j++) {
              var option = document.createElement("option");
              var txt = document.createTextNode(estacions[i].estacio[j]);
              option.appendChild(txt);
              select.appendChild(option);
          }
      }
  }
}

function changeRadio(){
  let radioButton = document.getElementsByName("provincia");
  for(let i = 0; i < radioButton.length;i++){
      document.getElementsByTagName("input")[i].addEventListener("change", mostrarEstacio);
  }
}


function validarCombustible(){
  
  let select = document.getElementById("conbustible");

  if(select.value == ""){
    error2(select,"Has de seleccionar un combustible");
    return false;
  }else{
    return true;
  }

}


function validarDate(){
  
  let fechaAdelantada = new Date();
  fechaAdelantada.setDate(fechaAdelantada.getDate() + 30)
  
  let fechaSeleccionada = new Date(document.getElementById("fecha"));
  let fechaActual = new Date();

  if(fechaSeleccionada > fechaAdelantada || fechaActual > fechaSeleccionada){
      error2(fechaSeleccionada, "Data seleccionada fora de rang");
     return false;
  }else if(fechaSeleccionada.getDay == 0){
    error2(fechaSeleccionada,"Diumenge estem tancats");
  }else{
      return true;
  }
}

function validarMatricula(){
    
    let matricula = document.getElementById("matricula");

    if (!matricula.checkValidity()) {
        if (matricula.validity.valueMissing) {
          error2(matricula, "Deus d'introduïr una matricula.");
          return false;
        }
        if (matricula.validity.patternMismatch) {
          error2(matricula, "No has indicat el format correcte de la matrícula");
          return false;
        }
      }
      return true;
}

function mostrarHora(){
    let select = document.getElementById("hora");
    
    for(let i = 7; i < 20; i++){
        if (i < 10) {
            i = "0" + i;
        }
        for(let j = 0; j < 60; j+=15){
            var option = document.createElement("option");
        
            if (j < 15) {
                var x = "0" + j;
                let tiempo = i + ":" + x;
                let formato =  document.createTextNode(tiempo);
                option.appendChild(formato);
            }else{
                let tiempo = i + ":" + j;
                let formato =  document.createTextNode(tiempo);
                option.appendChild(formato);
            }    
            select.appendChild(option);
        }   
    }
}

function validarNom() {
  
  let nombre = document.getElementById("nom");
  

  if (!nombre.checkValidity()) {
    if (nombre.validity.valueMissing) {
      error2(nombre, "Deus d'introduïr un nom.");
      return false;
    }
    if (nombre.validity.patternMismatch) {
      error2(nombre, "El nom sols pot contindre caracters.");
      return false;
    }
  }
  return true;
}

function validarTelefon() {
   
    let tel = document.getElementById("telefon");
    let valorTel = tel.value;
  
    if (!tel.checkValidity()) {
      if (tel.validity.valueMissing) {
        error2(tel, "Deus d'introduïr un telefon.");
        return false;
      }
      if (tel.validity.patternMismatch) {
        error2(tel, "No es correcte el format introduït.");
        return false;
      }

      if(valorTel.length < 9){
        error2(tel, "El numero de telefon esta incomplet");
        return false;
      }
    }
    return true;
  }

function validarCorreo() {
    
    let correo = document.getElementById("email");
  
    if (!correo.checkValidity) {
      if (correo.validity.valueMissing) {
        error2(correo, "Has d'introduir un correu electronic");
        return false;
      }
    }
    return true;
  }



function validarTerminos(){
  
  let termes = document.getElementById("protecioDades");

  if(!termes.checked){
    error2(termes,"Has d'acceptar els terminis i condicions");
  }
}


function error2(element, missatge) {
  document.getElementById("missatgeError").innerHTML = missatge;
  document.location.href = "#miModal";
}

function validar(e) {
  
  if (validarProvincia() && validarMatricula() && validarCombustible() && validarDate() && validarNom() && validarTelefon() && validarCorreo() && validarTerminos() && confirm("Confirma si vols enviar el formulari")) {
    return true;
  } else {
    e.preventDefault();
    return false;
  }
}
