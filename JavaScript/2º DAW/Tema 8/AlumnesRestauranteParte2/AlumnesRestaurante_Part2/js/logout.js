window.onload = main;

function main() {
    carregarDades()
    document.getElementById("enviar").addEventListener("click", confirmar);
}

function confirmar(){
    let opcion = confirm("Vols ixir de la sessió?");
    if(opcion == true){
        borrarLocalStoratge();
        location.assign("index.html");
    }
    else{
        location.assign("areaPersonal.html");
    }
}


function borrarLocalStoratge(){
    localStorage.removeItem("token");
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
            
            let avatar = document.getElementById("avatar");
            
            let nombre  = document.createTextNode(data.data.user.name);

            avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ data.data.user.avatar);
            user.replaceChildren(nombre);

        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}