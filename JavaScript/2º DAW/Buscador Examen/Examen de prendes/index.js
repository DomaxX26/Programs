window.onload = main;

function main() {
  cargarSelect();
  mostrarPrendas();
  document.getElementById("buscador").addEventListener("keyup", inputBuscador);
  document.getElementById("prendas").addEventListener("change", selectBuscador);
  document.getElementById("reiniciar").addEventListener("click", reiniciar);
}

function cargarSelect() {
  let select = document.getElementById("prendas");

  pedido.forEach(element => {
    let option = document.createElement("option");
    let txt = document.createTextNode(element.nombreArticulo);
    option.setAttribute("value", element.nombreArticulo);
    option.appendChild(txt);
    select.appendChild(option);
  });
}

function mostrarPrendas() {
  let article = document.getElementById("articulos");
  let text = " ";
  for (var i = 0; i < pedido.length; i++) {
    text +=
      "<div id='div" +
      i +
      "' class='card mt-2' style='width: 25rem;'>" +
      "<h5 class='card-header'>" +
      pedido[i].nombreArticulo +
      "</h5>" +
      "<div class='card-body'>" +
      "<div class='row'>" +
      "<div class='col'>" +
      "<h3 class='card-title'>" +
      pedido[i].precioArticulo +
      " €</h3>" +
      "<p class='card-text'>Talla " +
      pedido[i].tallas +
      "</p>" +
      "<a id='bt" +
      i +
      "' href='#' class='btn btn-primary text-end' onclick='borrarElementos(" +
      i +
      ")'><i class='fa fa-trash-o' aria-hidden='true'></i></a>" +
      "</div>" +
      "<div class='col '>" +
      "<img src='img/" +
      pedido[i].nombreArticulo.toLocaleLowerCase() +
      ".jpg' class='img-fluid img-thumbnail' width='50'>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    article.innerHTML = text;
  }
}

function inputBuscador() {
  var elemento = document.getElementById("buscador");

  pedido.forEach((element, index) => {
    if (!element.nombreArticulo.toUpperCase().includes(elemento.value.toUpperCase())) {
      let div = document.getElementById("div" + index);
      div.style = "display:none";
    } else {
      let div = document.getElementById("div" + index);
      div.style = "display:block";
    }
  });
}

function selectBuscador() {
  let select = document.getElementById("prendas").value;
  pedido.forEach((element, index) => {
    if (select != element.nombreArticulo) {
      let div = document.getElementById("div" + index);
      div.style = "display:none";
    } else {
      let div = document.getElementById("div" + index);
      div.style = "display:block";
    }
  });
}

function reiniciar() {
  pedido.forEach((element, index) => {
    let div = document.getElementById("div" + index);
    div.style = "display:block";
  });
}
