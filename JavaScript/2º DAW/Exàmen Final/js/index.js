window.onload = main;

function main() {
    carregarDades();
    cargarArticulos();;
}

function cargarArticulos() {
    fetch("https://news.serverred.es/api/articles", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.resultado.forEach((element, index) => {
                console.log(element);
                if(element.deleted == false){
                let root = document.getElementById("root");

                let div = document.createElement("div");
                div.setAttribute("class", "card mb-2");
                div.style = "width: 40rem;";

                let div2 = document.createElement("div");
                div2.setAttribute("class","card-body");

                let h5 = document.createElement("h5");
                h5.setAttribute("class", "card-title");
                h5.append(element.title);

                let p = document.createElement("p");
                p.setAttribute("class","card-text");
                p.append(element.body);

                div2.append(h5);
                div2.append(p);

                let div3 = document.createElement("div");
                div3.setAttribute("class", "card-body");

                let span1 = document.createElement("span");
                let i1 = document.createElement("i");
                i1.setAttribute("class", "bi bi-star-fill");
                i1.append(element.voteScore);
                i1.setAttribute("id", "like"+element._id);
                span1.append(i1);
                div3.append(span1);

                let span2 = document.createElement("span");
                let i2 = document.createElement("i");
                i2.setAttribute("class","bi bi-tag");
                i2.append(element.category);
                i2.setAttribute("id", "like"+element._id);
                span2.append(i2);
                div3.append(span2);

                let span3 = document.createElement("span");
                let i3 = document.createElement("i");
                i3.setAttribute("class","bi bi-person-fill");
                i3.append(element.author);
                span3.append(i3);
                div3.append(span3);

                let span4 = document.createElement("span");
                let i4 = document.createElement("i");
                i4.setAttribute("class","bi bi-calendar-event");

                let date = new Date(element.timestamp);
                let result = date.toLocaleString();
                
                i4.append(result),
                span4.append(i4);
                div3.append(span4);

                let a1 = document.createElement("a");
                a1.setAttribute("href","#");
                a1.setAttribute("class", "text-decoration-none");
                let i5 = document.createElement("i");
                i5.setAttribute("class","bi bi-emoji-smile");
                a1.append(i5);
                a1.setAttribute("value", element._id);
                a1.addEventListener("click", () => votoUp(element._id));
                div3.append(a1);

                let a2 = document.createElement("a");
                a2.setAttribute("href","#");
                a2.setAttribute("class", "text-decoration-none");
                let i6 = document.createElement("i");
                i6.setAttribute("class","bi bi-emoji-angry");
                a2.append(i6);
                a2.setAttribute("value", element._id);
                a2.addEventListener("click", () => votoDown(element._id));
                div3.append(a2);

                let a3 = document.createElement("a");
                a3.setAttribute("href","#");
                a3.setAttribute("class", "text-decoration-none");
                let i7 = document.createElement("i");
                i7.setAttribute("class","bi bi-trash");
                a3.append(i7);
                a3.append("Eliminar");
                div3.append(a3);

                div.append(div2);
                div.append(div3);

                root.append(div);
                }
            })
        }
        )
}

function carregarDades() {

    fetch("https://news.serverred.es/api/areaPersonal", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            let user = document.getElementById("user");

            let avatar = document.getElementById("avatar");

            let nombre = document.createTextNode(data.data.user.name);

            avatar.setAttribute("src", "https://news.serverred.es/public/img/" + data.data.user.avatar);
            user.replaceChildren(nombre);

        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}

function votoUp(id){
    var voto = {
        "vote": "upVote",
    }
    fetch('https://news.serverred.es/api/articles/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(voto),

    })
    .then(response => response.json())
    .then(data => {
        console.log(data.resultado.voteScore);
        var element = document.getElementById("like" + id);
        element.innerHTML =  data.resultado.voteScore ;

    }).catch((error) => {
        console.error('Error:', error);
    });
}

function votoDown(id){
    var voto = {
        "vote": "downVote",
    }
    fetch('https://news.serverred.es/api/articles/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(voto),

    })
    .then(response => response.json())
    .then(data => {
        console.log(data.resultado.voteScore);
        var element = document.getElementById("like" + id);
        element.innerHTML =  data.resultado.voteScore ;

    }).catch((error) => {
        console.error('Error:', error);
    });
}