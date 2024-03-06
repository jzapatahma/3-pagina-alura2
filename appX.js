let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

// Variables para el Nro Elegido
let input = document.querySelector(".number-input");
const min = input.getAttribute("min");
const max = input.getAttribute("max");
const step = Number(input.getAttribute("step") || 1);
var value = Number(input.getAttribute("value") || 0);
let number = document.querySelector(".number");
number.innerHTML = value;
// 

let idSelecionado = document.getElementById("id-nroIntentos");
let NroIntentosElegidos = idSelecionado.options[idSelecionado.selectedIndex].value;
console.log('Nro Intentos elegidos por el usuario' + String(NroIntentosElegidos));

// condicionesIniciales();
function asignarTextoElemento(elemento, texto) {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;   
    return; 
}

function reiniciarJuego() {
    // limpiarCaja(); // Limpiar texto, variables
    condicionesIniciales(); // Indicar mensaje de inicio, intervalos de numeros
    fnHabilitarBotones();
}


function verificarIntento() {
    //la siguiente linea funciona muy bien con el input number.
    // let numeroDeUsuario = parseInt(document.getElementById('id-number-input').value);    
    // let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    //tres iguales, indican comparar igual valor, e igual tipo de datos
    //console.log(numeroDeUsuario);
    //console.log(intentos);
    //
    let numeroDeUsuario = value; // La variable value contiene el valor del item selecionado por el usuario para el numero de intentos en el juego
    //
    console.log(intentos);
    if(intentos <= NroIntentosElegidos){        
        if(numeroDeUsuario===numeroSecreto){
            asignarTextoElemento('p',`Acertaste # Secreto en ${intentos} ${intentos === 1 ? 'vez' : 'veces'} `)
            // document.getElementById('reiniciar').removeAttribute('disabled');        
            fnHabilitarBotones();
            document.getElementById("id-textoNumero").style.color = "#FFE000";
        } else {
            //El usuario no acerto el numero
            if(numeroDeUsuario>numeroSecreto){
                asignarTextoElemento('p','El numero secreto es menor');
                document.getElementById("id-textoNumero").style.color = "#E3371E";
            } else {
                asignarTextoElemento('p','El numero secreto es mayor');
                document.getElementById("id-textoNumero").style.color = "#F2AE30";
            }
            intentos++;
            // limpiarCaja();
        }
        return;
    }else{
        asignarTextoElemento('p','Superaste el nro de intentos, reinicia y sigue juando');
        document.getElementById("id-textoNumero").style.color = "orange";
        // fnHabilitarBotones();
    }
}



// var select = document.getElementById('id-nroIntentos');
// select.addEventListener('change',
//   function(){
//     var selectedOption = this.options[select.selectedIndex];
//     console.log(selectedOption.value + ': ' + selectedOption.text);
//   });

// /* Para obtener el valor */
// var cod = document.getElementById("id-select").value;
// alert(cod);
 
// /* Para obtener el texto */
// var combo = document.getElementById("id-select");
// var selected = combo.options[combo.selectedIndex].text;
// alert(selected);



// fnHabilitarBotones();

function fnHabilitarBotones(){
    console.log('fnHabilitarBotones');
    document.getElementById('iniciar').removeAttribute('disabled');
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    // document.getElementById('id-nroIntentos').options[1].value = 1;
    // numeroSecreto = 0;
    // intentos = 1; // Reiniciar la variable de intentos
    // numeroMaximo = 0;
    // NroIntentosElegidos = 0;
    // listaNumerosSorteados = [];

    var iniciaIntento = document.getElementById("id-nroIntentos");
    iniciaIntento.value= "1";
}

// function limpiarCaja() {
//     document.querySelector('#id-number-input').value=''; // Adicionando # busca por id;    
// }

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    // Si el numero esta generado esta incluido en la lista
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos los numero a adivinar
    if (listaNumerosSorteados.length == numeroMaximo) {
            asignarTextoElemento('p','Ya se sortearon todos lo snumero posibles');
            document.querySelector('#iniciar').setAttribute('disabled','true');
            fnHabilitarBotones();
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
    console.log('condicionesIniciales');
    asignarTextoElemento('h1', 'Juego del Numero Secreto!');
    asignarTextoElemento('p', `Ahora juega del 1 al ${numeroMaximo}`);
    document.getElementById("id-textoNumero").style.color = "#F2AE30";
    numeroSecreto = generarNumeroSecreto(); // Generar el numero aleatorio
    intentos=1;
    // limpiarCaja();
    // console.log(numeroSecreto);
}





// condicionesIniciales();

//Codigo extraido de la internet, se puede ajustar y personalizar a nuestro gusto
function increase() {
if (max) {
    if (value < max && value + step <= max) {
    value += step;
    }
} else {
    value += step;
}
input.style.transform = "rotateY(20deg)";
setTimeout(() => {
    input.style.transform = "rotateY(0deg)";
}, 150);
number.innerHTML = value;
}

function decrease() {
if (min) {
    if (value > min && value - step >= min) {
    value -= step;
    }
} else {
    value -= step;
}
input.style.transform = "rotateY(-20deg)";
setTimeout(() => {
    input.style.transform = "rotateY(0deg)";
}, 150);
number.innerHTML = value;
}