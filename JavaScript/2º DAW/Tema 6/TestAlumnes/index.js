window.onload = main;

var cont = 0;
var reset = false;
var acert = 0;

function main() {
    $("#iniciar").click(reiniciarPrograma);
}

function mostrarPreguntas() {
        let txtPregunta = document.createTextNode(test[cont].pregunta);
        $("#pregunta").html(txtPregunta);        
}

function mostrarRespuestas() {
        $("#respostes").empty();
        $("#pregunta").html(test[cont].pregunta);
        $("#respostes").append("<ul id='respostaSeparada' style='list-style'>");
        for(var i = 0; i < 3; i++){
            $("#respostaSeparada").append("<li id=" + i + ">" + test[cont].respostes[i] + "</li>");     
        }
        cont++;
        $("#respostes").append("</ul>");
        $("#respostaSeparada").click(function(){
            
            if(cont < 5){
                $("#panel").hide(1500);
                $("#panel").show(function(){
                    mostrarPreguntas();
                    mostrarRespuestas();
                }) 
            }else{
                $("#panel").hide(1500, function(){
                    $("#pregunta").hide();
                    $("#respostes").hide();
                }) 
                $("#panel").show(mostrarResultat)
            }
            
        
            if(event.target.id == test[cont - 1].acert){
                acert++;
                $("#acerts").text(acert);
                $("#total").text(cont);
            }else{
                $("#total").text(cont);
            }
        })
}

function reiniciarPrograma(){
    if(reset == false){
        reset = true;
        mostrarPreguntas();
        mostrarRespuestas();
        $("#panel").show("slow");
        
    }else{
        reset = false;
        $("#panel").hide(1500);
        $("#pregunta").empty();
        $("#respostes").empty();
        $("#resultat").hide();
        $("#acerts").text("0");
        $("#total").text("0");
        $("#pregunta").show();
        $("#respostes").show();
        cont = 0;
        acert = 0;
        $("#panel").show("slow");
        reiniciarPrograma();
    }
}

function mostrarResultat(){

    $("#panel").append("<div id='resultat'>");
        $("#resultat").append("Has contestat correctament " + acert + " de 5 preguntes.<br>");
        $("#resultat").append("Tens un " + (acert/cont)*10 + " sobre 10.");

    $("#panel").append("</div>");
}