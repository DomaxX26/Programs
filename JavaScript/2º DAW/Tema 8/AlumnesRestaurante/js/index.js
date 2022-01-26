window.onload = main;

function main(){
    if(JSON.parse(localStorage.getItem("token") != null)){
        carregarDades();
    }
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