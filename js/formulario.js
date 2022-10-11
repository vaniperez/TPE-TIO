"use strict";

let textoFijo = 'HmpQz';
let btn= document.querySelector("#btn-enviar").addEventListener("click",validar);
console.log("A");

function validar(e) {
    e.preventDefault();
    let textoUsuario = document.querySelector("#input-validar").value;
    console.log("B");
    if(textoUsuario == textoFijo){
        document.querySelector("#mensaje").innerHTML="su consulta ha sido enviada con éxito";   
    } else {
        document.querySelector("#mensaje").innerHTML="error, el texto ingresado no coincide";
    }
    console.log("C");
}
