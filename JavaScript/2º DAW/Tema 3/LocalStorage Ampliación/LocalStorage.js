window.onload = main;
var usuario;
var contrasenya;
var array_usuarios = [];

function main() {
  document.getElementById("register").addEventListener("click", registrar);
  document.getElementById("login").addEventListener("click", iniciar);
}

function registrar() {
  usuario = document.getElementById("usuari").value;
  contrasenya = document.getElementById("password").value;

  var usuari = {
    nombre: usuario,
    password: contrasenya
  };


  if (JSON.parse(localStorage.getItem("añadir") != null)) {
    array_usuarios = JSON.parse(localStorage.getItem("añadir"));
    console.log(array_usuarios);
  }


  let busqueda = usuari.nombre;
  let index = array_usuarios.findIndex(busca_nombre => busca_nombre.nombre === busqueda);

  if (index >= 0) {
    alert("Usuari ya creado");
  } else {
    array_usuarios.push(usuari);
    localStorage.setItem("añadir", JSON.stringify(array_usuarios));
    alert("Se a registrado correctamente");
  }

}

function iniciar() {
  usuario = document.getElementById("usuari").value;
  contrasenya = document.getElementById("password").value;


  if (JSON.parse(localStorage.getItem("añadir") != null)) {
    array_usuarios = JSON.parse(localStorage.getItem("añadir"));
    console.log(array_usuarios);
  }


  for (let i = 0; i < array_usuarios.length; i++) {
    if (usuario == array_usuarios[i].nombre && contrasenya == array_usuarios[i].password) {
      alert("Sesión Iniciada");
      break;
    }else{
      if(usuario != array_usuarios[i].nombre && contrasenya != array_usuarios[i].password){
        alert("Credenciales Introducidas Incorrectas");
        
      }
      else if(contrasenya != array_usuarios[i].password){
        alert("Contraseña Incorrecta");
        break;
      }
      else{
        alert("Usuario Incorrecto");
        break;
      }
    }

  }
}



