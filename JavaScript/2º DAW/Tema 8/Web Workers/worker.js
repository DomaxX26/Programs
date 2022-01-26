self.addEventListener("message", function(e){
    console.log("El jefe diu ",  e.data);
    let temps = new Date();

    let hora = temps.getHours();
    let minuts = temps.getMinutes();
    let segons = temps.getSeconds();

    if(hora < 10){
        hora = "0" + hora;
    }

    if(minuts < 10){
        minuts = "0" + minuts;
    }

    if(segons < 10){
        segons = "0" + segons;
    }


    this.self.postMessage(hora + ":" + minuts + ":" + segons);
})