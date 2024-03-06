let numeroSecreto = 0;
let NroJugadas = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
//
// Variables para el Nro Elegido
let input = document.querySelector(".number-input");
const min = input.getAttribute("min");
const max = input.getAttribute("max");
const step = Number(input.getAttribute("step") || 1);
var numeroDeUsuario = Number(input.getAttribute("value") || 0);
let number = document.querySelector(".number");
number.innerHTML = numeroDeUsuario;
// 
let idSelecionado = document.getElementById("id-nroIntentos");
let NroIntentosElegidos = 0;
//
// Variables al arranque 
// console.log('Arranque - NroIntentosElegidos por el usuarioa' + NroIntentosElegidos);
// console.log('Arranque -numeroDeUsuario para jugar' + numeroDeUsuario);
// Iniciar los titulos
function asignarTextoElemento(elemento, texto) {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;   
    return; 
}
// 
function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del Numero Secreto!');
    asignarTextoElemento('p', `Ahora juega numero 1 - ${numeroMaximo}`);
    NroJugadas=1;
}
condicionesIniciales();
fnDeshabilitar(true);
// 
function fnDeshabilitar(valor){
    if(valor){
        document.querySelector('#id-nroIntentos').setAttribute('disabled', '');
        document.querySelector('#iniciar').setAttribute('disabled', '');
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById("id-number-input").style.background = '#898989';
        document.getElementById("id-nroIntentos").value = 1;
    }else{
        document.getElementById('id-nroIntentos').removeAttribute('disabled');
        document.getElementById("id-number-input").style.background = 'white';
        document.getElementById("id-nroIntentos").value = 1;
    }
    var childNodes = document.getElementById('id-center').getElementsByTagName('*');
    for (var node of childNodes) {
        node.disabled = valor;        
    }
}
//
function reiniciarJuego() {
    fnDeshabilitar(false);    
    document.getElementById("iniciar").disabled = false;
    document.getElementById("reiniciar").disabled = true;
    NroJugadas = 1;
    listaNumerosSorteados = [];
    numeroSecreto = generarNumeroSecreto();
    // console.log('Reinicio - NroIntentosElegidos por el usuarioa' + NroIntentosElegidos);
    // console.log('Reinicio -numeroDeUsuario para jugar' + numeroDeUsuario);
}
//
function verificarIntento() {    
    NroIntentosElegidos = idSelecionado.options[idSelecionado.selectedIndex].value;
    // console.log('Verificar - NroIntentosElegidos por el usuarioa' + NroIntentosElegidos);
    // console.log('Verificar -numeroDeUsuario para jugar' + numeroDeUsuario);
    //
    if(NroJugadas <= NroIntentosElegidos){        
        if(numeroDeUsuario===numeroSecreto){
            asignarTextoElemento('p',`Acertaste # Secreto en ${NroJugadas} ${NroJugadas === 1 ? 'vez' : 'veces'} `)                  
            document.getElementById("id-textoNumero").style.color = "#FFE000";
            fnDeshabilitar(true);
            setTimeout(() => {            
                condicionesIniciales();            
            }, 3000);
        } else {
            //El usuario no acerto el numero
            if(numeroDeUsuario>numeroSecreto){
                asignarTextoElemento('p','El numero secreto es Menor');
                document.getElementById("id-textoNumero").style.color = "#E3371E";
            } else {
                asignarTextoElemento('p','El numero secreto es Mayor');
                document.getElementById("id-textoNumero").style.color = "#F2AE30";
            }
            NroJugadas++;            
        }
        return;
    }else{
        asignarTextoElemento('p','Superaste el nro de intentos, Sigue Intentando');
        document.getElementById("id-textoNumero").style.color = "orange";
        //
        fnDeshabilitar(true);
        setTimeout(() => {
            condicionesIniciales();
          }, 3000);
    }
}
//
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    // Si el numero esta generado esta incluido en la lista
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos los numero a adivinar
    if (listaNumerosSorteados.length == numeroMaximo) {
            asignarTextoElemento('p','Se sortearon todos lo snumero posibles');
            document.querySelector('#iniciar').setAttribute('disabled','true');           
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}
//
function increase() {
    if (max) {
        if (numeroDeUsuario < max && numeroDeUsuario + step <= max) {
            numeroDeUsuario += step;
        }
    } else {
        numeroDeUsuario += step;
    }
    input.style.transform = "rotateY(20deg)";
    setTimeout(() => {
        input.style.transform = "rotateY(0deg)";
    }, 150);
    number.innerHTML = numeroDeUsuario;
}
//
function decrease() {
    if (min) {
        if (numeroDeUsuario > min && numeroDeUsuario - step >= min) {
            numeroDeUsuario -= step;
        }
    } else {
        numeroDeUsuario -= step;
    }
    input.style.transform = "rotateY(-20deg)";
    setTimeout(() => {
        input.style.transform = "rotateY(0deg)";
    }, 150);
    number.innerHTML = numeroDeUsuario;
}