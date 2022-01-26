window.onload = main;
var totesPoblacions = [];
function main(){
    document.getElementById("carregar").addEventListener("click", provinciesComunitatValencia);
    buscadorPoblacions();
}

function numeroDePoblacions(){
    let numPoblacio = document.getElementById("poblacions");
    let num = totesPoblacions.length;

    numPoblacio.innerHTML = "S'han carregat " + num + " poblacions.";
}

function carregarPoblacions(codicPostal){

    poblacionsComunitatvalenciana = new XMLHttpRequest();
    

    poblacionsComunitatvalenciana.onreadystatechange = function(){
        //console.log(this.readyState, this.status);
        if(this.readyState == 4 && this.status == 200){
            //console.log(this.responseText);
            let objecte = JSON.parse(this.responseText);
            //console.log(objecte.data)
            objecte.data.forEach(element => {
                //console.log(element.DMUN50);
                let poble = element.DMUN50.slice(0)
                totesPoblacions.push(poble);
            });
            
                numeroDePoblacions();
            
        }
    }
    poblacionsComunitatvalenciana.open("GET", "https://apiv1.geoapi.es/municipios?CPRO="+codicPostal+"&type=JSON&key=&sandbox=1", true);
    poblacionsComunitatvalenciana.send();
}

function provinciesComunitatValencia(){
    totesPoblacions = [];
    var codicPostal = "";
    for(let i = 0; i< 3; i++){
        if(i == 0){
            codicPostal = "12";
        }
        if(i == 1){
            codicPostal = "46";
        }
        if(i == 2){
            codicPostal = "03";
        }
        carregarPoblacions(codicPostal)
    }
}

function buscadorPoblacions(){
    $("#poblacio").autocomplete({
        source: totesPoblacions
    });
}