var botaoAdicionar = document.getElementById("buscar-pacientes");
botaoAdicionar.addEventListener("click", () => {
    var http = new XMLHttpRequest();

    http.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

    http.addEventListener("load", function() {
        var erroAjax = document.getElementById("erro-ajax");

        if (http.status == 200) {
            erroAjax.classList.add("invisivel");
            var resposta = http.responseText;
            var pacientes = JSON.parse(resposta);

            pacientes.forEach(function(paciente) {
                adicionaPacienteNaTabela(paciente);
            });
        } else {
            erroAjax.classList.remove("invisivel");
        }
    });

    http.send();
});
