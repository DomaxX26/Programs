window.onload = main;

var Castello = [];
var Valencia = [];
var Alacant = [];

function main(){
	carregarApi();
}

function carregarApi(){
    let fecha = new Date();
    let anyActual = fecha.getFullYear();
    let mesActual = fecha.getMonth() + 1; 
    let diaActual = fecha.getDate();

    if(mesActual < 10){
        mesActual = "0" + mesActual;
    }

    if(diaActual < 10){
        diaActual = "0"+ diaActual;
    }

    let fechaActual = anyActual+"-" +mesActual+ "-" +diaActual;
    console.log(fechaActual = anyActual+"-" +mesActual+ "-" +diaActual)
    coronavirusComunitatValenciana = new XMLHttpRequest();

    coronavirusComunitatValenciana.onreadystatechange = function(){
        //console.log(this.readyState, this.status);
        if(this.readyState == 4 && this.status == 200){
            //console.log(this.responseText);
            let objecte = JSON.parse(this.responseText);
            //console.log(objecte.dates[fechaActual].countries.Spain.regions[6].sub_regions)
            objecte.dates[fechaActual].countries.Spain.regions[6].sub_regions.forEach((element, index) => {
                //console.log(element);
                
                document.getElementById("totalInfectats"+index).innerHTML = element.today_confirmed;
                document.getElementById("totalDefuncions"+index).innerHTML = element.today_deaths;
                document.getElementById("nousInfectats"+index).innerHTML = element.today_new_confirmed;
                document.getElementById("nousDefuncions"+index).innerHTML = element.today_new_deaths;
                document.getElementById("date"+index).innerHTML = "Última actualització " + fechaActual;
            });
            
            
            
        }
    }
    coronavirusComunitatValenciana.open("GET", "https://api.covid19tracking.narrativa.com/api/"+fechaActual+"/country/spain", true);
    coronavirusComunitatValenciana.send();
}