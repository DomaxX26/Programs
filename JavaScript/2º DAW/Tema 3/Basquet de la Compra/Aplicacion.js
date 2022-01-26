var array_tenda = [];
var preuFinal = 0;
var pos = 0;

function nuevoProducto() {
  var i;
  var descricion = document.getElementById("descripcion").value;
  var precio = document.getElementById("precio").value;
  var cantidad = document.getElementById("cantidad").value;
  //Objeto creado
  var objetoProductos = {
    descripcio: descricion,
    preu: precio,
    quantitat: cantidad
  };
  console.log(JSON.parse(localStorage.getItem("productos")));
  //Comprobación si el localStoratfe esta vacio, para no sobreescribir.
  if (JSON.parse(localStorage.getItem("productos") != null)) {
    array_tenda = JSON.parse(localStorage.getItem("productos"));
  }
  //Comprobación si ya esta creado el producto, si no el añade al array el producto
  let busqueda = objetoProductos.descripcio;
  let index = array_tenda.findIndex(
    busca_productos => busca_productos.descripcio === busqueda
  );

  if (index >= 0) {
    alert("Producto ya registrado");
  } else {
    array_tenda.push(objetoProductos);
    localStorage.setItem("productos", JSON.stringify(array_tenda));
    alert("Se a registrado correctamente");
  }
  //console.log(array_tenda);
  limpiarCampos();
}

function tenda() {
  let tenda = document.getElementById("compra_productes");
  let aux;

  if (JSON.parse(localStorage.getItem("productos") != null)) {
    array_tenda = JSON.parse(localStorage.getItem("productos"));
    console.log(array_tenda);
  }

  aux = "<tr><th></th><th>Descripció</th><th>Preu</th><th>Quantitat</th></tr>";

  array_tenda.forEach((element ,index) => {
    let extracion_producto = JSON.parse(localStorage.getItem("productos"));
    aux += "<tr>";
    aux +=
      "<td><button onclick='añadir_cesta(this), cuentaAtras()' id=" + index + ">add</button></td>" +
      "<td>" +
      element.descripcio +
      "</td><td>" +
      element.preu +
      "</td><td>" +
      element.quantitat +
      "</td>";
    aux += "</tr>";
    tenda.innerHTML = aux;
  });
}

function limpiarCampos() {
  document.getElementById("formulario").reset();
}

function añadir_cesta(element) {
  let taula = document.getElementById("basquet_productes");
  var arrayProductes = new Array();
  var arrayBasquet = new Array();
  let id = element.id;

  if(JSON.parse(localStorage.getItem("cesta")) != null){
    arrayBasquet = JSON.parse(localStorage.getItem("cesta"));
  }

  arrayProductes = JSON.parse(localStorage.getItem("productos"));
  arrayBasquet.push(arrayProductes[id]);

  let aux = "";
  
  aux = "<tr><td>" + arrayProductes[id].descripcio + "</td><td>1</td><td>" + arrayProductes[id].preu + "</td></td></td></tr>"
  taula.innerHTML += aux;
  localStorage.setItem("cesta",JSON.stringify(arrayBasquet));
 
  let valor = parseFloat(arrayProductes[id].preu);
  preuFinal += valor;
  document.getElementById("preuCompra").innerHTML = "Preu total de la compra: " + preuFinal + "€";
}

var segundos = 0;
var minutos = 20;
var llamada;
var ceromin="";
var ceroseg = "";

function cuentaAtras(){
  devolvercero(minutos,segundos);
  segundos = segundos % 60;
  document.getElementById("reloj").innerHTML="Tens de temps " + ceromin+minutos+':'+ceroseg+segundos + " fins que es borre el basquet";
   if (minutos === 0 && segundos === 0){
      localStorage.removeItem("Basquet");
      location.reload();
      clearTimeOut(llamada);
  }
  if (segundos ==0){
      minutos --;
      segundos+=60;   
  }   
  segundos --;

  var llamada = setTimeout(cuentaAtras,1200);
}

function devolvercero(minutos,segundos){
  if (minutos<10){
      ceromin='0';
     
  }
  if (segundos<10){
      ceroseg='0';
     
  }else {
      ceroseg='';
  }
   return ceroseg;
   return ceromin;
}