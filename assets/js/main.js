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
       
    }