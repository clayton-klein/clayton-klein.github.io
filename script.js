'use strict';

// selecionando elementos do HTML
let textoInput = document.querySelector('#textoInput');
let imagemSemTexto = document.querySelector('#noMessage')
let boxOutput = document.querySelector('.texto-output');
let textoOutput = document.querySelector('#textoOutput');

let btnCriptografar = document.querySelector('#btnCriptografar');
let btnDescriptografar = document.querySelector('#btnDescriptografar');
let btnCopiar = document.querySelector('#btnCopiar');

// adicionando eventos aos botoes
btnCriptografar.addEventListener('click', criptografar);
btnDescriptografar.addEventListener('click', descriptografar);
btnCopiar.addEventListener('click', copiar);

// iniciar já com o cursor na textarea para digitar a mensagem
textoInput.focus();

// esta regex aceita somente letras minúsculas e sem acento, inclusive escritos em múltiplas linhas.
let regex = /^[a-z\s]+$/;
function criptografar() {
    let mensagem = textoInput.value;

    if(!mensagem) {
        alert('Primeiro digite uma mensagem para ser criptografada.');
        return;
    } else if( !regex.test(mensagem) ) {
        alert('Utilize somente letras minúsculas e sem acentos.');
        textoInput.value = '';
        textoInput.focus();
        return;  
    } else {
        // NÃO organizar por ordem alfabética, senão ocorre bug
        // devido ao "i" de "ai" que será convertido novamente depois.
        mensagem = mensagem.replaceAll('e', 'enter');
        mensagem = mensagem.replaceAll('i', 'imes');
        mensagem = mensagem.replaceAll('a', 'ai');
        mensagem = mensagem.replaceAll('o', 'ober');
        mensagem = mensagem.replaceAll('u', 'ufat');
    };

    imagemSemTexto.style.display = 'none';
    boxOutput.style.display = 'flex';
    textoOutput.value = mensagem;
    textoInput.value = '';
};
        
function descriptografar() {
    let mensagemSaida = textoInput.value;

    if(!mensagemSaida) {
        alert('Primeiro digite uma mensagem para ser descriptografada.');
        textoInput.focus();
        return;
    };

    mensagemSaida = mensagemSaida.replaceAll('enter', 'e');
    mensagemSaida = mensagemSaida.replaceAll('imes', 'i');
    mensagemSaida = mensagemSaida.replaceAll('ai', 'a');
    mensagemSaida = mensagemSaida.replaceAll('ober', 'o');
    mensagemSaida = mensagemSaida.replaceAll('ufat', 'u');

    imagemSemTexto.style.display = 'none';
    boxOutput.style.display = 'flex';
    textoOutput.value = mensagemSaida;
    textoInput.value = '';
};

function copiar() {
    // selecionar o campo de texto.
    textoOutput.select();
    // selecionar o campo de texto para celulares.
    textoOutput.setSelectionRange(0, 99999);
    // copiar o texto de dentro do text-area.
    // a princípio estava utilizando este método navigator abaixo,
    // porém n sei pq n estava funcionando no meu celular (mas no PC sim),
    // então substituí por execCommand e deu certo!!!
    // deixo comentado aqui como exemplo...
    // navigator.clipboard.writeText(textoOutput.value); X
    document.execCommand('copy');

    boxOutput.style.display = 'none';
    imagemSemTexto.style.display = 'flex';
    alert('Mensagem copiada.');
    textoInput.focus();
};