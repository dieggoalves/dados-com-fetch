window.onload = function() {
    campoDeCep.focus();
}

function recuperaCEP(cep) {

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const options = {
        method: 'GET',
        //mode: 'no-cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }
    const regexDoCampoCep = /^[\d]{5}-?[\d]{3}$/g;

    if(regexDoCampoCep.test(cep)) {

        fetch(url, options).then(response => response.json()).then(data => {
     
            if(data.erro) {

                campoDeCep.setCustomValidity(mensagensDeErro.cepInvalido);
                campoDeCep.reportValidity();

                erroNoCep = true;
                mudaCorBordaDoInput();

                return;
            }

            campoDeCep.setCustomValidity('');

            erroNoCep = false;
            mudaCorBordaDoInput();

            preencheCamposDeEndereco(data);
            // console.log(data); Mostra os dados recuperados na tela

            return;     
        });
    } else {

        campoDeCep.setCustomValidity(mensagensDeErro.cepComErroDeDigitacao);
        campoDeCep.reportValidity();

        erroNoCep = true;
        mudaCorBordaDoInput();
    }
}

function preencheCamposDeEndereco(data) {

    campoDeLogradouro.value = data.logradouro;
    campoDeBairro.value = data.bairro;
    campoDeCidade.value = data.localidade;
    campoDeEstado.value = data.uf;
}

function mudaCorBordaDoInput() {

    if(erroNoCep) {
        campoDeCep.classList.add('erro');
    } else {
        campoDeCep.classList.remove('erro');
    }
}

// VARIÁVEIS ARMAZENANDO OS INPUTS
const campoDeCep = document.querySelector('[data-tipo="cep"]');
const campoDeLogradouro = document.querySelector('[data-tipo="logradouro"]');
const campoDeBairro = document.querySelector('[data-tipo="bairro"');
const campoDeCidade = document.querySelector('[data-tipo="cidade"]');
const campoDeEstado = document.querySelector('[data-tipo="estado"]');

const botaoDeBusca = document.querySelector('.botao-cadastrar');

const mensagensDeErro = {

    cepInvalido: 'Não foi possível buscar o CEP',
    cepComErroDeDigitacao: 'Digite um CEP válido'
}

let erroNoCep = false;

campoDeCep.addEventListener('blur', () => {

    const cepDigitado = campoDeCep.value.replace(/\D/g, '');
    recuperaCEP(cepDigitado);
});

botaoDeBusca.addEventListener('click', evento => {
    evento.preventDefault();

    const cepDigitado = campoDeCep.value.replace(/\D/g, '');
    recuperaCEP(cepDigitado);
});
