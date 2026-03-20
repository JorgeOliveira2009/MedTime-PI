function cadastrar() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (!email || !senha) {
        mensagem.textContent = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return;
    }

    fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(res => res.text())
    .then(msg => {
        mensagem.textContent = msg;
        mensagem.style.color = "green";

        
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    })
    .catch(err => {
        console.error(err);
        mensagem.textContent = "Erro ao cadastrar!";
        mensagem.style.color = "red";
    });
}


//função de login
function fazerLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (!email || !senha) {
        mensagem.textContent = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return;
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.sucesso) {
            mensagem.textContent = "Login realizado com sucesso! ✅";
            mensagem.style.color = "green";

            localStorage.setItem("logado", "true");

            // ir para tela principal
            window.location.href = "app.html";
        } else {
            mensagem.textContent = "Email ou senha incorretos!";
            mensagem.style.color = "red";
        }
    })
    .catch(error => {
        console.error(error);
        mensagem.textContent = "Erro ao conectar com o servidor!";
        mensagem.style.color = "red";
    });
}

function irParaCadastro() {
    window.location.href = "cadastro.html";
}


//app

if (localStorage.getItem("logado") !== "true") {
    window.location.href = "login.html";
}


window.onload = carregarLembretes;

function adicionarLembrete() {
    const nome = document.getElementById("nomeRemedio").value;
    const horario = document.getElementById("horario").value;

    if (!nome || !horario) {
        alert("Preencha o nome do remédio e o horário!");
        return;
    }

    const lembrete = {
        nome: nome,
        horario: horario,
        tomado: false
    };

    let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
    lembretes.push(lembrete);

    localStorage.setItem("lembretes", JSON.stringify(lembretes));

    document.getElementById("nomeRemedio").value = "";
    document.getElementById("horario").value = "";

    carregarLembretes();
}

function carregarLembretes() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];

    lembretes.forEach((lembrete, index) => {
        if (!lembrete.tomado) {
            const item = document.createElement("li");
            item.innerHTML = `
                ${lembrete.nome} - ${lembrete.horario}
                <button onclick="marcarComoTomado(${index})">Já tomei</button>
            `;
            lista.appendChild(item);
        }
    });
}

function marcarComoTomado(index) {
    let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
    lembretes[index].tomado = true;

    localStorage.setItem("lembretes", JSON.stringify(lembretes));
    carregarLembretes();
}

// Logout
function logout() {
    localStorage.removeItem("logado");
    window.location.href = "login.html";
}