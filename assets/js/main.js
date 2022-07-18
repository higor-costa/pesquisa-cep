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

        const urlCep = `https://viacep.com.br/ws/${inputUf}/${inputCidade}/${inputRua}/json/`;
        fetch(urlCep)
            .then(resposta => resposta.json())
            .then(json => {
                resultadoPesquisa(json)
            })
            .catch(erro => console.log('Erro ao pesquisar dados!', erro))
    })

function checaInputs(cidade, uf, rua) {
    if (cidade == '' && uf == '' && rua == '') {
        $('.erro').css({display: 'block'});
        $('.erro-rua').css({display: 'block'});
    }
    else if (cidade == '') {
        $('.erro-cidade').css({display: 'block'});
    } 
    else if (uf == '' && $('.erro-cidade').css({display: 'block'})) {
        $('.erro-cidade').css({display: 'none'})
        $('.erro-uf').css({display: 'block'});
    } 
    else if (rua == '') {
         $('.erro-rua').css({display: 'block'});
    } 
}

function resultadoPesquisa(json) {
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
    $('small').css({display: 'none'})
}

function limpaCampos() {
    $('#cidade').val('');
    $('#uf').val('');
    $('#rua').val('');

    $('.resultado-pesquisa').css({ display: "none" });
}