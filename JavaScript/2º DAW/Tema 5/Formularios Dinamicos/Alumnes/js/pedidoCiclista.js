window.onload = main;
var cont = 0;
var suma = 0;
var talla_actual = "";
var prendas = [];

function main(){
    cargarDatosLocalStoratge();
    mostrarProductos();
    document.getElementById("siguiente").addEventListener("click", productos);
}

function productos(evt){
    evt.preventDefault();
    if (cont < 5) {
        mostrarProductos();
        talla_actual = "";
    } else {
        window.location = "FDConfirmar.html"
    }
}

function cargarDatosLocalStoratge(){
    let nombre = document.getElementById("nombreApellidos");
    let contacte = JSON.parse(localStorage.getItem("contacte"));
    if (contacte!= null) {
        nombre.append("Benvingut " + contacte.nom);
    }
}

function mostrarProductos(){
    
    document.getElementById("siguiente").addEventListener("click", guardarProductos);
    document.getElementById("nombreArticulo").value = pedido[cont].nombreArticulo;
    document.getElementById("precioArticulo").value = pedido[cont].precioArticulo;
    
    let tallas = document.getElementById("talla");
    while(tallas.firstChild){
        tallas.removeChild(tallas.firstChild);
    }
    
    var option = document.createElement("option");
    var txt = document.createTextNode("Talla");
    option.setAttribute("value", "");
    option.appendChild(txt);
    tallas.appendChild(option);
    
    for(let i = 0; i < pedido[cont].tallas.length; i++){
        let option = document.createElement("option");
        option.append(pedido[cont].tallas[i]);
        option.setAttribute("value", pedido[cont].tallas[i]);
        tallas.appendChild(option);
    }
    
    document.getElementById("imagen").setAttribute("src", "img/" + pedido[cont].imagen);
    document.getElementById("talla").addEventListener("change", mostrarDinero);
}

function guardarProductos() {
    if(cont < 1){
        localStorage.removeItem("prendas");
    }
    let tallas = document.getElementById("talla");
    let prenda = {
        article: pedido[cont].nombreArticulo,
        preu: pedido[cont].precioArticulo,
        talla: tallas.value
    };

    if (localStorage.getItem("prendas") != null) {
        prendas = JSON.parse(localStorage.getItem("prendas"));
    }
    

    if(tallas.value != ""){
        prendas.push(prenda);
        localStorage.setItem("prendas", JSON.stringify(prendas));
    }
    cont++;
}

function mostrarDinero(){
    
    let tallas = document.getElementById("talla");

    if (talla_actual != "" && tallas.value == "") {
        suma -= pedido[cont].precioArticulo;
        document.getElementById("total").innerHTML = suma + " €";
        talla_actual = "";
    } else if(talla_actual == "" && tallas.value != "") {
        suma += pedido[cont].precioArticulo;
        document.getElementById("total").innerHTML = suma + " €";
        talla_actual = tallas.value;
    }
}