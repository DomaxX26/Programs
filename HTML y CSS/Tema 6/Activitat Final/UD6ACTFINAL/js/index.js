window.onload = main;

function main(){
	document.getElementById("tancar").addEventListener("click", tancarCookies);
}

function tancarCookies(){
	let cookies = document.getElementById("cookies");
	cookies.parentNode.removeChild(cookies);
}