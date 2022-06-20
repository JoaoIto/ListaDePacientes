## Função para CalcularIMC:

**Nesta, criamos variáveis, em que uma variável pegará diretamente o valor vindo do HTML, e logo depois ele é atribuído a uma variável de valor numérico:**

```jsx
var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");
    var peso = tdPeso.textContent;

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;

    var tdImc = paciente.querySelector(".info-imc");

    var pesoEhValido = validaPeso(peso);
    var alturaEhValida = validaAltura(altura);

```
#

Logo depois, percebe-se que faremos uma condição de erro, em uma variável de *array* que foi atribuída para ser colocado em todos os pacientes, e para que consigamos passar por todos eles, precisamos de uma lista de repetição...

**Definimos as condicionais com ```if else; for()```**

```jsx
for (var i = 0; i < pacientes.length; i++) {
if (!pesoEhValido) {
        console.log("Peso inválido!");
        pesoEhValido = false;
        tdImc.textContent = "Peso inválido";
        paciente.classList.add("paciente-invalido");
    }

    if (!alturaEhValida) {
        console.log("Altura inválida!");
        alturaEhValida = false;
        tdImc.textContent = "Altura inválida";
        paciente.classList.add("paciente-invalido");
    }

    if (pesoEhValido && alturaEhValida) {
        var imc = calculaImc(peso, altura);
        tdImc.textContent = imc;
    }
}
```

# 

Só resta depois concluir a função padrão de cálculo de IMC, que é feita com os valores numéricos de altura e peso...

```jsx
function calculaImc(peso, altura) {
    var imc = 0;
    imc = peso / (altura * altura);

    return imc.toFixed(2);
}

```

# 

## Formulário de paciente:
Primeiramente criamos uma função para o botão do formulário, para que ele consiga com uma só função buscar os valores dos parãmetros e mesmo assim, e os mesmos não houver validação, identificar com mensagem de erro...
```jsx

// Função principal:
var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    var paciente = obtemPacienteDoFormulario(form);

    var erros = validaPaciente(paciente);

    if (erros.length > 0) {
        exibeMensagensDeErro(erros);

        return;
    }

    adicionaPacienteNaTabela(paciente);

    form.reset();

    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";

});

// Tipos de erro:
function validaPaciente(paciente) {

    var erros = [];

    if (paciente.nome.length == 0) {
        erros.push("O nome não pode ser em branco");
    }

    if (paciente.gordura.length == 0) {
        erros.push("A gordura não pode ser em branco");
    }

    if (paciente.peso.length == 0) {
        erros.push("O peso não pode ser em branco");
    }

    if (paciente.altura.length == 0) {
        erros.push("A altura não pode ser em branco");
    }

    if (!validaPeso(paciente.peso)) {
        erros.push("Peso é inválido");
    }

    if (!validaAltura(paciente.altura)) {
        erros.push("Altura é inválida");
    }

    return erros;
}

// Mensagem de erro; function():

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

```
#
O próximo passo será **validar dentro de variáveis** todos os identificados no campos de input dentro do formulário, para que sejam colocados em outra função. 
Fizemos isso a partir de um objeto de "paciente", ( que já foi atribuído a um *array* que identificamos), com todos seus valores válidos. A partir da seguinte função:
```jsx
function obtemPacienteDoFormulario(form) {

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}
```
# 

Já que agora já conseguimetos colocar a função do botão, e já validamos as informações deixadas pelo usuário, no input, só precisamos montá-los na tabela de HTML, já que só temos em variáveis JS, isso montamos as **```td``` ```tr```**, de uma tabela:

```jsx
function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;

    return td;
}
```

E depóis só colocarmos as funções de tabela no HTML:

```jsx
function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

```
# 