window.onload = main;

var array_tascas = [];
function main(){
mostrar_tasques();
}

function añadir_tarea(){
    let tarea = document.getElementById("novaTasca").value;

    var tasca = {
        nom: tarea 
    };

    if(JSON.parse(localStorage.getItem("añadir") != null)){
        array_tascas = JSON.parse(localStorage.getItem("añadir"));
    }

    array_tascas.push(tasca);
    localStorage.setItem("añadir", JSON.stringify(array_tascas));
    
    mostrar_tasques();
    limpiarCampo();
}

function limpiarCampo(){
    document.getElementById("novaTasca").value = "";
}

function mostrar_tasques(){
    let zona_tasca = document.getElementById("llista");
    
    

    if(JSON.parse(localStorage.getItem("añadir") != null)){
        array_tascas = JSON.parse(localStorage.getItem("añadir"));
    }
    /*if(array_tascas.length >= 0 ){
        var input = document.getElementById("tasca0");
        input.removeChild(input);
    }*/

    console.log(array_tascas);
    for(var i = 0; i < array_tascas.length; i++){
        let tasca = JSON.parse(localStorage.getItem("añadir"));
    
        zona_tasca.innerHTML += "<li>" + "<input type='checkbox' id=" + i + " onclick='cambiar_css(this);' name=" + i + ">" + tasca[i].nom + "</li>";
        }  
    
}


function cambiar_css(element){
    var id = element.id;
    console.log(id);
    var task = JSON.parse(localStorage.getItem("añadir"));
    let zona_tasca = document.getElementById("llista");
    zona_tasca.innerHTML += "<li>" + "<input type='checkbox' id=task" + id + " onclick='cambiar_css(this);' name=" + id + "><del>" + task[id].nom + "</del></li>";
    

    //var x = document.getElementById(id);
    //x.style.textDecoration = "line-though";
    //zona_tasca.innerHTML = task[id].nom + x;
}

