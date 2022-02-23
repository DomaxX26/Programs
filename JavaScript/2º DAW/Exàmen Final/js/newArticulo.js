window.onload = main;

function main() {
    if (JSON.parse(localStorage.getItem("token") != null)) {
        carregarDades();
        mostrarCategories();
        document.getElementById("crearArticulo").addEventListener("click", validar, false);
    } else {
        location.assign("login.html");
    }
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
    if (validarTitulo() && validarAutor() && validarCuerpo()) {
        enviarArticulo();
        return true;
    } else {
        return false;
    }
}

function validarTitulo() {
    let title = document.getElementById("title");

    if (!title.checkValidity()) {
        if (title.validity.valueMissing) {
            error2(title, "Titulo obligatori");
            return false;
        }
        if (title.validity.rangeOverflow) {
            error2(title, "El titulo tienes menos de 5 caracteres");
            return false;
        }
    }
    return true;
}

function validarAutor() {
    let author = document.getElementById("author");
    if (!author.checkValidity()) {
        if (author.validity.valueMissing) {
            error2(author, "Autor obligatori");
            return false;
        }
    }
    return true;
}

function validarCuerpo() {
    let body = document.getElementById("body");
    if (!body.checkValidity()) {
        if (body.validity.valueMissing) {
            error2(body, "Cuerpo de texto obligatori");
            return false;
        }
        if (body.validity.patternMismatch) {
            error2(body, "El cuerpo de texto tienes menos de 20 caracteres");
            return false;
        }
    }
    return true;
}

function mostrarCategories(){
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
                console.log(element);
                let categories = document.getElementById("categories");
                let option = document.createElement("option");
                option.setAttribute("value", element.name);
                let txtOption = document.createTextNode(element.name);

                option.append(txtOption);
                categories.append(option);
            })
        }
        )
}

function enviarArticulo() {
    var articulo = {
        "title": document.getElementById("title").value,
        "author": document.getElementById("author").value,
        "category": document.getElementById("categories").value,
        "body": document.getElementById("body").value
    }
    console.log(articulo);
    fetch("https://news.serverred.es/api/articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(articulo)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.error == null) {
                alert("S'ha registrat el nou article");
            }
        })
        .catch(error => console.log(error));
}