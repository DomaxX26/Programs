window.onload = main;

function main() {
    new Chart(document.getElementById("pie-chart"), {
        type: "pie",
        data: {
            labels: ["Africa", "Asia", "America"],
            datasets: [
                {
                    label: "Population (millions)",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
                    data: [150, 300, 50]
                }
            ]
        },
        options: {
            title: {
                display: true
            }
        }
    });
    document.getElementById("escarabajo").addEventListener("click", mostrarOcultar);
    document.getElementById("myModal").addEventListener("click", mostrarOcultar);
}


function mostrarOcultar(){
    let modal = document.getElementById('myModal');
    if(modal.style.display === "block"){
        modal.style.display = "none";
    }else{
        modal.style.display = "block";
    }
}