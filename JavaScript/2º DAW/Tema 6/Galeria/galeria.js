window.onload = main;
var cont = 0;
function main(){
	ponerId();
}

function ponerId(){
	$(".centrar div img").each(function(){
		$(this).attr('id', cont++);
	});
}
function clickImagen(){}