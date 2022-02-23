window.onload = main;

function main() {
    if (JSON.parse(localStorage.getItem("token") != null)) {
        cargarCategorias();
        carregarDades();
        document.getElementById("btnGravar").addEventListener("click", validar, false);
    }else{
        location.assign("login.html");
    }
}


function cargarCategorias() {
    fetch("https://news.serverred.es/api/categories", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("TK"))
        }
    })
        .then(response => response.json())
        .then(data => {
            data.resultado.forEach((element, index) => {
                let lista = document.getElementById("listCategory");

                let li = document.createElement("li");
                li.setAttribute("class", "list-group-item");
                console.log(element)
                let txtCat = document.createTextNode(element.name);
                li.appendChild(txtCat);
                lista.appendChild(li);

            })
        }
        )
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
    if (validarNombre()) {
        enviarCategoria();
        return true;
    }  else {
        return false;
    }
}

function validarNombre() {
    let nom = document.getElementById("nom");

    if (!nom.checkValidity()) {
        if (nom.validity.valueMissing) {
            error2(nom, "Categoria obligatoria");
            return false;
        }
        if (nom.validity.patternMismatch) {
            error2(nom, "La categoria no te 4 caràcters");
            return false;
        }
    }
    return true;
}

function enviarCategoria() {
    var categoria = {
        "name": document.getElementById("nom").value,
        "path": document.getElementById("nom").value
    }
    console.log(categoria);
    fetch("https://news.serverred.es/api/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(categoria)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.error == null) {
                alert("S'ha registrat la categoria");
            }
        })
        .catch(error => console.log(error));
}


function carregarDades() {

    fetch("https://news.serverred.es/api/areaPersonal", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            let user = document.getElementById("user");

            let avatar = document.getElementById("avatar");

            let nombre = document.createTextNode(data.data.user.name);

            avatar.setAttribute("src", "https://news.serverred.es/public/img/" + data.data.user.avatar);
            user.replaceChildren(nombre);

        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}