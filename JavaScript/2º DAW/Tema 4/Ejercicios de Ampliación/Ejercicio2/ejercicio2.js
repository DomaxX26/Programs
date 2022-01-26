window.onload = main;
let array_txt = new Array();
function main() {
  document.getElementById("enviar").addEventListener("click", añadir);
}

function añadir() {
  let ol = document.getElementById("ol");
  let li = document.getElementsByTagName("li");
  array_txt = li;

  let text = document.getElementById("text").value;
  let number = document.getElementById("number").value;
  let index = array_txt[number];

  let liCrear = document.createElement("li");
  var txt = document.createTextNode(text);
  liCrear.appendChild(txt);
  ol.appendChild(liCrear);

  ol.insertBefore(liCrear,index);
  
  

  
}
