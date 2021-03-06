'use strict';

document.querySelector('form')
    .addEventListener('submit', event => {
        event.preventDefault();
    })

const btnPesquisar = document.querySelector('#btn-pesquisar')
    .addEventListener('click', valorInputs => {
        const inputCidade = document.querySelector('#cidade').value
        const inputUf = document.querySelector('#uf').value
        const inputRua = document.querySelector('#rua').value

        if (inputCidade == '' || inputUf == '' || inputRua == '') {
            console.log('Inputs vazios!')
            return
        }

        consomeApi(inputUf, inputCidade, inputRua)
    })

function consomeApi(uf, cidade, rua) {
    const urlCep = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;
    fetch(urlCep)
        .then(resposta => resposta.json())
        .then(json => {
            resultadoPesquisa(json, rua)
        })
        .catch(erro => console.log('Erro ao pesquisar dados!', erro))
}

function resultadoPesquisa(json, nomeRua) {
    limpaMensagensErro()
    if (json[0].logradouro == '') {
        $('.paragrafo').html(`Este é o CEP da <span class="rua">${nomeRua}</span>:`);
    } else {
        $('.paragrafo').html(`Este é o CEP da <span class="rua">${json[0].logradouro}</span>:`);
    }
    $('.cep').html(json[0].cep);
    $('.resultado-pesquisa').css({ display: "block" });
}

const btnLimpar = document.querySelector('#btn-limpar')
    .addEventListener('click', event => {
        event.preventDefault();
        limpaCampos()
        limpaMensagensErro()
    })

function limpaMensagensErro() {
    $('small').css({ display: 'none' })
}

function limpaCampos() {
    const inputs = document.querySelectorAll('.form-control')
    inputs.forEach(input => input.value = '')

    $('.resultado-pesquisa').css({ display: "none" });
}