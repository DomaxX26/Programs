var firstTime = false;
var valores = [];
window.onload = inicio();


function inicio() {
    crearCosas();
    document.getElementById("buscar").addEventListener("input", crearCosas);

    document.getElementById("combustible").addEventListener("change", filtroCombustible);
    document.getElementById("combustible").addEventListener("change", crearCosas);

    document.getElementById("color").addEventListener("change", filtroColor);
    document.getElementById("color").addEventListener("change", crearCosas);

}

function filtrar() {
    var color = document.getElementById("color");
    var combustible = document.getElementById("combustible");
    valores.splice(0, valores.length);

    for (var i = 0; i < coches.length; i++) {
        if (filtroColor() && filtroCombustible()) {
            if (color.value == coches[i].color && combustible.value == coches[i].combustible) {
                valores.push(i);
            } else {
                valores.push(null)
            } 
        } else if (filtroColor() || filtroCombustible()){
            if (filtroColor()) {
                if (color.value == coches[i].color) {
                    valores.push(i);
                } else {
                    valores.push(null)
                }
            }
            if (filtroCombustible()) {
                if (combustible.value == coches[i].combustible) {
                    valores.push(i);
                } else {
                    valores.push(null)
                }
            } 
            
        } else {
            valores.push(i)
        }
    }
    for (var j = valores.length -1; j >=0; j--){
        if(valores.indexOf(valores[j]) !== j) {
            valores[j] = null;
        }
    }
}
/*
function filtroUbicacion() {
    var ubicacion = document.getElementById("ubicacion");

    if (ubicacion.value != "Selecciona una opcion") {
        return true;
    }
    return false;
}
*/
function filtroCombustible() {
    var combustible = document.getElementById("combustible");
    if (combustible.value != "Selecciona una opcion") {
        return true;
    }
    return false;
}

function filtroColor() {
    var color = document.getElementById("color");
    if (color.value != "Selecciona una opcion") {
        return true;
    }
    return false;
}

function crearCosas() {
    filtrar()
    var buscar = document.getElementById("buscar").value;
    var divCards = document.getElementById("cards");

    if (divCards.outerText != "") {
        var borrar = cards.childElementCount;

        if (firstTime) {
            cards.firstElementChild.remove();
        }
        
        for (var j = 0; j < borrar-1; j++) {
            cards.lastElementChild.remove();
        }
    }

    var cont = 0;
    if (firstTime) {
        cont = valores.length;
    } else {
        cont = coches.length;
    }

    firstTime = true;
    
    for (var i = 0; i < cont; i++) {
        if (valores[i] != null) {

            var filtro = coches[valores[i]].nombreCoche.substr(0, buscar.length);
        }
        buscar = buscar.toUpperCase();
        if (buscar === filtro) {
            if (valores[i] != null) {
         
                // Div Card----------------------------------------------------
                var divCard = document.createElement("card");
                divCard.setAttribute("class", "card")
                
                // Div Imagen----------------------------------------------------
                var divImagen = document.createElement("div");
                divImagen.setAttribute("class", "imagen");
                
                var img = document.createElement("img");
                img.setAttribute("src", "img/" + coches[valores[i]].imagen);
                
                divImagen.appendChild(img);
                divCard.appendChild(divImagen);
                
                // Div Body----------------------------------------------------
                var divCardBody = document.createElement("div");
                divCardBody.setAttribute("class", "card-body");
                
                // Div Precio----------------------------------------------------
                var divCardPrecio = document.createElement("div");
                divCardPrecio.setAttribute("class", "card-precio");
                
                // Div Precio al contado----------------------------------------------------
                var divCardPrecioCont = document.createElement("div");
                divCardPrecioCont.setAttribute("class", "card-precioCont");
                
                var pCardPrecioCont = document.createElement("p");
                pCardPrecioCont.innerHTML = "Precio al contado";
                divCardPrecioCont.appendChild(pCardPrecioCont);
                
                var spanCardPrecioCont = document.createElement("span");
                spanCardPrecioCont.setAttribute("class", "contado");
                spanCardPrecioCont.innerHTML = coches[valores[i]].precioContado + " €";
                divCardPrecioCont.appendChild(spanCardPrecioCont);
                
                divCardPrecio.appendChild(divCardPrecioCont);
                
                // Div Precio financiado----------------------------------------------------
                var divCardPrecioFin = document.createElement("div");
                divCardPrecioCont.setAttribute("class", "card-precioFin");
                
                var pCardPrecioFin = document.createElement("p");
                pCardPrecioFin.innerHTML = "Precio financiado";
                divCardPrecioFin.appendChild(pCardPrecioFin);
                
                var spanCardPrecioFin = document.createElement("span");
                spanCardPrecioFin.setAttribute("class", "financiado");
                spanCardPrecioFin.innerHTML = coches[valores[i]].precioFinanciado + " €";
                divCardPrecioFin.appendChild(spanCardPrecioFin);
                
                divCardPrecio.appendChild(divCardPrecioFin);
                
                
                // Div de garantía----------------------------------------------------
                var divGarantia = document.createElement("div");
                divGarantia.setAttribute("class", "card-garantia");
                
                var pCardGarantia1 = document.createElement("p");
                pCardGarantia1.innerHTML = "Garantia 1 año";
                divGarantia.appendChild(pCardGarantia1);
                
                var pCardGarantia2 = document.createElement("p");
                pCardGarantia2.innerHTML = "IVA incluido";
                divGarantia.appendChild(pCardGarantia2);
                
                divCardPrecio.appendChild(divGarantia);
                
                divCardBody.appendChild(divCardPrecio);
                
                // Div de título----------------------------------------------------
                var divTitulo = document.createElement("div");
                divTitulo.setAttribute("class", "card-titulo");
                
                var pCardTitulo = document.createElement("p");
                pCardTitulo.innerHTML = coches[valores[i]].nombreCoche;
                divTitulo.appendChild(pCardTitulo);
                
                divCardBody.appendChild(divTitulo);
                
                // Div de etiquetas----------------------------------------------------
                var divEtiquetas = document.createElement("div");
                divEtiquetas.setAttribute("class", "card-etiquetas");
                
                var spanCardEtiquetasUbicacion = document.createElement("span");
                spanCardEtiquetasUbicacion.setAttribute("id", "ubicacion");
                spanCardEtiquetasUbicacion.innerHTML = coches[valores[i]].ubicacion;
                divEtiquetas.appendChild(spanCardEtiquetasUbicacion);
                
                var spanCardEtiquetasCombustible = document.createElement("span");
                spanCardEtiquetasCombustible.setAttribute("id", "combustible");
                spanCardEtiquetasCombustible.innerHTML = coches[valores[i]].combustible;
                divEtiquetas.appendChild(spanCardEtiquetasCombustible);
                
                var spanCardEtiquetasColor = document.createElement("span");
                spanCardEtiquetasColor.setAttribute("id", "color");
                spanCardEtiquetasColor.innerHTML = coches[valores[i]].color;
                divEtiquetas.appendChild(spanCardEtiquetasColor);
                
                var spanCardEtiquetasAno = document.createElement("span");
                spanCardEtiquetasAno.setAttribute("id", "ano");
                spanCardEtiquetasAno.innerHTML = coches[valores[i]].ano;
                divEtiquetas.appendChild(spanCardEtiquetasAno);
                
                divCardBody.appendChild(divEtiquetas);
                
                divCard.appendChild(divCardBody);
                
                divCards.appendChild(divCard);
            }
        }
    }
}