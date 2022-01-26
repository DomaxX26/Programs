window.onload = main;

function main(){
    cargarCoches();

    document.getElementById("ir").addEventListener("click", buscarMarcas);
    document.getElementById("combustible").addEventListener("change", filtarCombustible);
    filtrarDesde();
}

function cargarCoches(){
    let listado = document.getElementById("listado");
    let txt = " ";
    data.cars.forEach((element , index)=> {
        txt += 
        "<div class='card mb-4' id='"+index+"'>" +  
                    "<a href='#!'><img class='card-img-top' src='img/"+element.img+"' alt='...' /></a>" + 
                    "<div class='card-body'>" + 
                        "<h2 class='card-title'>"+element.marca +  " "+ element.modelo +"</h2>" + 

                        "<div class='row justify-content-end'>" +
                            "<div class='p-2 mb-1  col-md-3 offset-md-3 bg-warning rounded text-center'>" +
                                "<h2 class='font-weight-bold'>"+element.precio+" €</h2>" +
                            "</div>" +
                        "</div>"+ 

                        "<div class='row'>" +
                            "<div class='col p-3 text-center border-bottom border-dark'>Año</div>" +
                            "<div class='col p-3 text-center border-bottom border-dark'>Kilometros</div>" +
                            "<div class='col p-3 text-center border-bottom border-dark'>Cambio</div>" +
                            "<div class='col p-3 text-center border-bottom border-dark'>Combustible</div>" +
                            "<div class='w-100'></div>" +
                            "<div class='col p-3 text-center'><strong>"+element.anyo+"</strong></div>" +
                            "<div class='col p-3 text-center'><strong>"+element.precio+"Km.</strong></div>" +
                            "<div class='col p-3 text-center'><strong>"+element.cambio+"</strong></div>" +
                            "<div class='col p-3 text-center'><strong>"+element.combustible+"</strong></div>" +
                        "</div>" +
                        "<a class='btn btn-primary m-3' href='#!' id='"+index+"' onclick='cambiarPagina(this.id)'>Reservar</a>" +
                    "</div>" +
                "</div>";
    
    listado.innerHTML = txt;
});
}

function buscarMarcas() {
	let input = document.getElementById("marcaModelo");

	data.cars.forEach((element, index) => {
		if (!element.marca.toUpperCase().includes(input.value.toUpperCase())) {
			let div = document.getElementById(index);
			div.style = "display:none";
		} else {
			let div = document.getElementById(index);
			div.style = "display:block";
		}
	});
}

function filtarCombustible(){
    let combustible = document.getElementById("combustible");
    data.cars.forEach((element, index) => { 
    if(combustible.value == ""){
        let div = document.getElementById(index);
        div.style = "display:block";
    }else if(combustible.value == "Gasolina"){
        let div = document.getElementById(index);
        if(element.combustible != "Gasolina"){
            div.style = "display:none";
        }
    }else if(combustible.value == "Diesel"){
        let div = document.getElementById(index);
        if(element.combustible != "Diesel"){
            div.style = "display:none";
        }
    }else if(combustible.value == "Hibrido"){
        let div = document.getElementById(index);
        if(element.combustible != "Hibrido"){
            div.style = "display:none";
        }
    }else if(combustible.value == "Eléctrico"){
        let div = document.getElementById(index);
        if(element.combustible != "Eléctrico"){
            div.style = "display:none";
        }
    }
});
}

function filtrarDesde(){
    let anyoDesde = document.getElementById("anyoDesde");
    let anyoHasta = document.getElementById("anyoHasta");
    
    data.cars.forEach((element, index) => {
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");
        let txt1 = document.createTextNode(element.anyo);
        let txt2 = document.createTextNode(element.anyo);
        option1.setAttribute("value", element.anyo);
        option1.appendChild(txt1);
        option2.setAttribute("value", element.anyo);
        option2.appendChild(txt2);
        anyoHasta.appendChild(option1);
        anyoDesde.appendChild(option2);
    });
}

function guardarLocalStoratge(index){
  let cotxe = "";
  if (JSON.parse(localStorage.getItem("cotxe") != null)) {
    cotxe = JSON.parse(localStorage.getItem("cotxe"));
  }

  let coche = {
    marca: data.cars[index].marca,
    model: data.cars[index].modelo,
    preu: data.cars[index].precio,
    any: data.cars[index].anyo,
    km: data.cars[index].km,
    canvi: data.cars[index].cambio,
    combustible: data.cars[index].combustible,
    image: data.cars[index].img 
  };

  
  localStorage.setItem("cotxe", JSON.stringify(coche));
}

function cambiarPagina(e){
        guardarLocalStoratge(e);
        window.location = "reserva.html";
}

