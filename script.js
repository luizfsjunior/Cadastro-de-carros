function cadastrar() {
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;
    let cor = document.getElementById("cor").value;
    let placa = document.getElementById("placa").value;
    let ano = document.getElementById("ano").value;
    let km = document.getElementById("km").value;

    let jsonBody = {
        "fields": {
            "marca": {
                "stringValue": marca
            },
            "modelo": {
                "stringValue": modelo
            },
            "cor": {
                "stringValue": cor
            },
            "placa": {
                "stringValue": placa
            },
            "ano": {
                "integerValue": ano
            },
            "km": {
                "stringValue": km
            }
        }
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(jsonBody)
    }

    fetch("https://firestore.googleapis.com/v1/projects/cadastro-de-carros-573be/databases/(default)/documents/Carros", options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let listaDados = document.getElementById("lista-dados");
            let itemLista = document.createElement("li");
            itemLista.innerText = `Marca: ${marca}\nModelo: ${modelo}\nCor: ${cor}\nPlaca: ${placa}\nAno: ${ano}\nKm: ${km}\n`;
            listaDados.appendChild(itemLista);
        })
        .catch(error => {
            console.error(error);
        });
}
