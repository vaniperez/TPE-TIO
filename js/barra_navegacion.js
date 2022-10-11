document.querySelector(".btn_barra_navegacion").addEventListener("click", toggleMenu);

function toggleMenu(){
    document.querySelector(".navegacion").classList.toggle("show");
    document.querySelector(".apicola-titulo").innerHTML="";
}
