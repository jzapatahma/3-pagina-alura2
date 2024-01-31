let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;   
    return; 
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    //tres iguales, indican comparar igual valor, e igual tipo de datos
    //console.log(numeroDeUsuario);
    //console.log(intentos);
    if(numeroDeUsuario===numeroSecreto){
        asignarTextoElemento('p',`Acertaste el numero Secreto en ${intentos} ${intentos === 1 ? 'vez' : 'veces'} `)
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acerto el numero
        if(numeroDeUsuario>numeroSecreto){
            asignarTextoElemento('p','El numero secreto es menor');
        } else {
            asignarTextoElemento('p','El numero secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value=''; // Adicionando # busca por id;    
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    // Si el numero esta generado esta incluido en la lista
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos los numero a adivinar
    if (listaNumerosSorteados.length == numeroMaximo) {
            asignarTextoElemento('p','Ya se sortearon todos lo snumero posibles');
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del Numero Secreto!');
    asignarTextoElemento('p', `Indica un numero de 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto(); // Generar el numero aleatorio
    intentos = 1; // Reiniciar la variable de intentos
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    limpiarCaja(); // Limpiar texto, variables
    condicionesIniciales(); // Indicar mensaje de inicio, intervalos de numeros
    document.querySelector('#reiniciar').setAttribute('disabled','true')
}

condicionesIniciales();