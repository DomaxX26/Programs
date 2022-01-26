window.onload = main;

function main() {
    document.getElementById("register").addEventListener("click", registrar);
    document.getElementById("login").addEventListener("click", iniciar);
}

function registrar() {

    
    var usuario = document.getElementById("usuari").value;
    var contrasenya = document.getElementById("password").value;

    var usuari = {
        nombre: usuario,
        password: contrasenya
    }
    
    localStorage.setItem("registrar", JSON.stringify(usuari));
    
    console.log(JSON.parse(localStorage.getItem("registrar")));
    alert("Se a registrado correctamente");
}

function iniciar() {

    var usuario = document.getElementById("usuari").value;
    var contrasenya = document.getElementById("password").value;
    var usuari = {
        nombre: usuario,
        password: contrasenya
    }

    let login = JSON.parse(localStorage.getItem("registrar"));

    if (usuari.nombre == login.nombre) {
        if (usuari.password == login.password) {
            console.log("Sesion iniciada");
        }
        else {
            console.log("Contraseña mal");
        }
    }
    else {
        console.log("Usuario incorrecto");
    }

}

  