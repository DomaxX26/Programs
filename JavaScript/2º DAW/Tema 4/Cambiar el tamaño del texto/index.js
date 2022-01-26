window.onload = main;
var font_size = 16;

function main() {
    document.getElementById("agrandar").addEventListener("click", agrandar);
    document.getElementById("reducir").addEventListener("click", disminuir);
    document.getElementById("original").addEventListener("click", original);
}

function agrandar() {
    if (font_size > 32) {
        alert("Has arribat al llimit de 32px");
    } else {
        let texto = document.getElementById("texto");
        font_size = font_size + 0.05;
        texto.style.fontSize = font_size + "px";
    }
}

function disminuir() {
    if (font_size < 8) {
        alert("Has arribat al llimit de 8px");
    } else {
        let texto = document.getElementById("texto");
        font_size = font_size - 0.05;
        texto.style.fontSize = font_size + "px";
    }
}

function original() {
    let texto = document.getElementById("texto");
    font_size = 16;
    texto.style.fontSize = font_size + "px";
    if (font_size == 16) {
        alert("Has tornat al tamany de 16px")
    }

}


