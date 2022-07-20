'use strict';

const btnPesquisar = document.querySelector('#btn-pesquisar')
    .addEventListener('click', event => {
        event.preventDefault();

        const inputCidade = document.querySelector('#cidade').value
        const inputUf = document.querySelector('#uf').value
        const inputRua = document.querySelector('#rua').value

        checaInputs(inputCidade, inputUf, inputRua)

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

function checaInputs(cidade, uf, rua) {
    if (cidade == '' && uf == '' && rua == '') {
        $('.erro-uf').css({ display: 'none' });
        $('.erro-cidade').css({ display: 'none' });
        $('.erro').css({ display: 'block' });
        $('.erro-rua').css({ display: 'block' });
    }
    else if (cidade == '' && uf == '' && rua != '') {
        $('.erro-uf').css({ display: 'none' });
        $('.erro-cidade').css({ display: 'none' });
        $('.erro-rua').css({ display: 'none' });
        $('.erro').css({ display: 'block' });
    }
    else if (cidade == '' && uf != '' && rua == '') {
        $('.erro').css({ display: 'none' });
        $('.erro-uf').css({ display: 'none' });
        $('.erro-cidade').css({ display: 'block' });
        $('.erro-rua').css({ display: 'block' });
    }
    else if (cidade == '' && uf != '' && rua != '') {
        $('.erro').css({ display: 'none' });
        $('.erro-uf').css({ display: 'none' });
        $('.erro-rua').css({ display: 'none' });
        $('.erro-cidade').css({ display: 'block' });
    }
    else if (cidade != '' && uf == '' && rua == '') {
        $('.erro').css({ display: 'none' });
        $('.erro-cidade').css({ display: 'none' });
        $('.erro-uf').css({ display: 'block' });
        $('.erro-rua').css({ display: 'block' });
    }
    else if (cidade != '' && uf != '' && rua == '') {
        $('.erro').css({ display: 'none' });
        $('.erro-uf').css({ display: 'none' });
        $('.erro-cidade').css({ display: 'none' });
        $('.erro-rua').css({ display: 'block' });
    }
    else if (cidade != '' && uf == '' && rua != '') {
        $('.erro').css({ display: 'none' });
        $('.erro-cidade').css({ display: 'none' });
        $('.erro-rua').css({ display: 'none' });
        $('.erro-uf').css({ display: 'block' });
    }
}

function resultadoPesquisa(json, nomeRua) {
    limpaMensagensErro()
    $('.paragrafo').html(`Este é o CEP da <span class="rua">${json[0].logradouro}</span>:`);
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