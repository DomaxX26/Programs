window.onload = main;

function main() {

    document.getElementById("enviar").addEventListener("click", ejecutar_buscar);
}


function ejecutar_buscar() {
    var min = document.getElementById("minimo").value;
    var max = document.getElementById("maximo").value;
    var aleatorio = Math.floor(Math.random() * 50 + 0);
    var contador = 1;
    
    if(min > max || min == max){
        alert("Numeros introducidos incorrectamente");
        location.reload();
    }
    else{
        buscar(min, max, aleatorio, contador);
    }
    
    console.log("Este es el numero aleatorio: " + aleatorio);

    
}
function buscar(minimo, maximo, aleatorio, contador) {

    console.log("Este es el contador: " + contador);

    let sumar = Math.floor((parseInt(minimo) + parseInt(maximo)) / 2);

    console.log("Este es el valor sumar: " + sumar);

    if (sumar == aleatorio) {
        alert("Se a encontrado el número aleatorio");
        return document.getElementById("conta").innerText = "Operaciones hechas: " + contador;
    }

    if (sumar > aleatorio) {
        maximo = sumar;
        contador++;
        return buscar(minimo, maximo, aleatorio, contador);
    }
    else {
        minimo = sumar;
        contador++;
        return buscar(minimo, maximo, aleatorio, contador);
    }
}


