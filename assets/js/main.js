'use strict';

const btnPesquisar = document.querySelector('.form-btn')
    .addEventListener('click', event => {
        event.preventDefault();

        const inputCidade = document.querySelector('#cidade').value
        const inputUf = document.querySelector('#uf').value
        const inputRua = document.querySelector('#rua').value

        const urlCep = `https://viacep.com.br/ws/${inputUf}/${inputCidade}/${inputRua}/json/`;
        fetch(urlCep)
        .then(resposta => resposta.json())
        .then(json => {
            resultadoPesquisa(json)
        })
    })

    function resultadoPesquisa(json) {
       $('.paragrafo').html(`Este é o CEP de <span class="cidade">${json[0].localidade}-${json[0].uf}</span>:`);
       $('.cep').html(json[0].cep);
       $('.resultado-pesquisa').css({display: "block"});
    }