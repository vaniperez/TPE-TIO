
"use strict"

const url= ("https://62c42cf2abea8c085a6e5b00.mockapi.io/api/productos");
document.addEventListener('DOMContentLoaded', mostrarTabla);

let tbProductos = document.querySelector(".tabla");
let mensaje = document.querySelector("#mensaje").innerHTML = "";

document.querySelector("#btnAgregar").addEventListener("click", agregarProducto);

//-----------------MOSTRAR TABLA
async function mostrarTabla() {
    tbProductos.innerHTML = "";
    try{
        let respuesta = await fetch(url);
        let json = await respuesta.json();
        console.log(json);
        for (const productos of json) {
        let item = productos.item;
        let cantidad = productos.cantidad;
        let id = productos.id;
        tbProductos.innerHTML += `<tr>
                                      <td>${item}</td>
                                      <td>${cantidad}</td>
                                      <td><button class="botonEliminar" type="button" data-id=${id}>Eliminar</button> 
                                          <button class="botonEditar" type="button" data-id=${id}>Editar</button>
                                      </td> 
                                  </tr>`;
                                // SE HACE ESTO PARA RECORRER CADA BOTON Y CUANDO SE CLICKEE, LLAME A LA FUNCION
                                  let botonesEliminar= document.querySelectorAll(".botonEliminar");
                                    for (let botonEliminar of botonesEliminar) {
                                        botonEliminar.addEventListener("click", borrarFila);
                                    };

                                    let botonesEditar= document.querySelectorAll(".botonEditar");
                                    for (let botonEditar  of botonesEditar) {
                                        botonEditar.addEventListener("click", editarFila);
                                    };
                }
    }
    catch (error) {
        console.log(error);
    }
}

    async function agregarProducto(e) {
        e.preventDefault(); 
        let item = document.querySelector('#item').value;
        let cantidad = document.querySelector('#cantidad').value;
        let nuevoProducto = {
            "item": item,
            "cantidad": cantidad,
        }
        try {
            let res = await fetch (url, {
                "method": "POST",
                "headers": {"Content-type": "application/json"},
                "body": JSON.stringify(nuevoProducto)
                 });
                if (res.status === 201) {
                document.querySelector("#mensaje").innerHTML = 'su producto ha sido creado con éxito';
                console.log("producto creado!");
                }
        }
        catch (error) {
            console.log(error);
        }
        mostrarTabla();
    }  
    
async function borrarFila (e) {
    e.preventDefault(); 

    let id = this.dataset.id; //CON ESTO se SEÑALA EL ID DE CADA BOTON CLICKEADO

    try {
        let res = await fetch (`${url}/${id}`, {
            "method": "DELETE",
        });
    
        if (res.status === 200) {
        document.querySelector("#mensaje").innerHTML = "su producto ha sido ELIMINADO con éxito";
        console.log("producto ELIMINADO!");
        }
    }
    catch (error) {
    console.log(error);
    }
     mostrarTabla();
}

async function editarFila(e) { 
    e.preventDefault(); 
    let id = this.dataset.id; 

        let item = document.querySelector('#item').value;
        let cantidad = document.querySelector('#cantidad').value;

        let productoEditado = {
            "item": item,
            "cantidad": cantidad,
        }
    
    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "PUT",
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(productoEditado)
        });
        if (res.status === 200) {
            document.querySelector("#mensaje").innerHTML = "su producto ha sido EDITADO con éxito";
            }
            else {
            document.querySelector("#mensaje").innerHTML = "su producto no se pudo editar";
        }
    } catch (error) {
        console.log(error);
    }
    mostrarTabla();
}

