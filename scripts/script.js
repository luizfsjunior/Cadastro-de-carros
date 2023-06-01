function limpa_form() {
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("km").value = "";

}


function deletar(id) {
    const options = {
        method: 'DELETE'
    }

    fetch("https://firestore.googleapis.com/v1/projects/cadastro-de-carros-573be/databases/(default)/documents/Carros/" + id, options)
        .then(t => {
            console.log(id);
            busca();
        })
        .catch(error => {
            console.error(error);
        });
}

function cadastrar(id, method) {
    var marca = document.getElementById("marca").value;
    var modelo = document.getElementById("modelo").value;
    var cor = document.getElementById("cor").value;
    var placa = document.getElementById("placa").value;
    var ano = document.getElementById("ano").value;
    var km = document.getElementById("km").value;

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
        method: method,
        body: JSON.stringify(jsonBody)
    }

    fetch("https://firestore.googleapis.com/v1/projects/cadastro-de-carros-573be/databases/(default)/documents/Carros/" + id, options)
        .then(t => {
            console.log(id);
        })
        .then(() => {
            // Limpar os campos do formulário
            limpa_form();
            // Atualizar a tabela com os novos dados
            busca();
        })
        //.then(busca)
        .catch(error => {
            console.error(error);
        });
}



function criarBotaoEditar(index) {
    let botaoSelect = document.createElement("button");
    botaoSelect.textContent = "Selecionar";

    botaoSelect.addEventListener("click", () => {
        fetch("https://firestore.googleapis.com/v1/projects/cadastro-de-carros-573be/databases/(default)/documents/Carros/" + index)
            .then(response => response.json())
            .then(carros => {
                document.getElementById("marca").value = carros.fields.marca.stringValue;
                document.getElementById("modelo").value = carros.fields.modelo.stringValue;
                document.getElementById("cor").value = carros.fields.cor.stringValue;
                document.getElementById("placa").value = carros.fields.placa.stringValue;
                document.getElementById("ano").value = carros.fields.ano.integerValue;
                document.getElementById("km").value = carros.fields.km.stringValue;
            })
            .catch(error => {
                console.error(error);
            });

        let btnCadastro = document.getElementById("cadastro-btn");
        let div_edit = document.getElementById("editar");

        btnCadastro.style.display = "none"
        div_edit.style.display = "flex"



        let btnEdit = document.getElementById("edit-btn");
        btnEdit.addEventListener("click", () => {
            cadastrar(index, 'PATCH')
            limpa_form();
            div_edit.style.display = "none"
            btnCadastro.style.display = "block"
        });

        let btnDelete = document.getElementById("delete-btn");
        btnDelete.addEventListener("click", () => {
            deletar(index)
            limpa_form();
            div_edit.style.display = "none"
            btnCadastro.style.display = "block"
        });

        let btnVolta = document.getElementById("voltar-btn");
        btnVolta.addEventListener("click", () => {
            limpa_form();
            div_edit.style.display = "none"
            btnCadastro.style.display = "block"
        });


    });
    return botaoSelect;
}


function busca() {
    let corpoTabela = document.getElementById("corpoTabela");
    fetch("https://firestore.googleapis.com/v1/projects/cadastro-de-carros-573be/databases/(default)/documents/Carros")
        .then(response => response.json())
        .then(carros => {

            corpoTabela.innerHTML = "";

            let n = carros.documents.length;
            console.log(n);
            let i;

            for (i = 0; i < n; i++) {

                c = carros.documents[i];
                id = c.name.split('/')[6];
                let novaLinha = document.createElement("TR")
                corpoTabela.appendChild(novaLinha);

                let colMarca = document.createElement("TD")
                let colModelo = document.createElement("TD")
                let colCor = document.createElement("TD")
                let colPlaca = document.createElement("TD")
                let colKm = document.createElement("TD")
                let colAno = document.createElement("TD")
                let colEditar = document.createElement("TD");



                novaLinha.appendChild(colMarca);
                novaLinha.appendChild(colModelo);
                novaLinha.appendChild(colCor);
                novaLinha.appendChild(colPlaca);
                novaLinha.appendChild(colKm);
                novaLinha.appendChild(colAno);
                novaLinha.appendChild(colEditar);

                colEditar.appendChild(criarBotaoEditar(id));
                colMarca.innerHTML = c.fields.marca.stringValue;
                colModelo.innerHTML = c.fields.modelo.stringValue;
                colCor.innerHTML = c.fields.cor.stringValue;
                colPlaca.innerHTML = c.fields.placa.stringValue;
                colKm.innerHTML = c.fields.km.stringValue;
                colAno.innerHTML = c.fields.ano.integerValue;
            }
        })
        .catch(error => {
            console.error(error);
        });
}


window.addEventListener('load', busca);