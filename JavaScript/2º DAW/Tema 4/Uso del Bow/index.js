window.onload = main;
window.onresize = resize;

function main() {
  mostrar_browser();
  resize();
  document.getElementById("ventanas").addEventListener("click", window200);
  document.getElementById("mod_ventanas").addEventListener("click",windowPrompt);

}

function mostrar_browser() {
  let name = "Nombre del navegador: " + window.navigator.appCodeName;
  let h1 = document.getElementById("titulo");
  if (h1.textContent != null) {
    h1.textContent = null;
  }
  h1.appendChild(document.createTextNode(name));
}

function resize() {
  let p = document.getElementById("dimensiones");

  let ancho = window.outerWidth;
  let alto = window.outerHeight;
  let txt = "Window size: Ancho=" + ancho + ", Alto=" + alto;
  if (p.textContent != null) {
    p.textContent = null;
  }
  p.appendChild(document.createTextNode(txt));
  
}

function window200(){
    window.open("/countdowntimer-main/index.html", "ventanaSecundaria","width=200px, height=200px,scrollbars=NO");
}

function windowPrompt(){
  let width = prompt("Numero de pixeles de anchura: ");
  let height = prompt("Numero de pixeles de altura: ");

  window.open("/countdowntimer-main/index.html", "ventanaSecundaria",width, height ,"scrollbars=NO");
}
