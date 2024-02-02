const contenidoMenu = document.getElementById("contenidoMenu");
const verComandad = document.getElementById("verComanda");
const pedidoContainer = document.getElementById("pedido-container");


const platos =[
    {
        id: 1,
        nombre: "Tacos",
        precio: 250,
        cantidad: 1,
    },
    {
        id: 2,
        nombre: "Tortilla",
        precio: 150, 
        cantidad: 1,
    },
    {
        id: 3,
        nombre: "Burritos",
        precio: 250, 
        cantidad: 1,
    },
    {
        id: 4,
        nombre: "Nachos",
        precio: 200, 
        cantidad: 1,
    },
    {
        id: 5,
        nombre: "Limonada",
        precio: 80, 
        cantidad: 1,
    },
    {
        id: 6,
        nombre: "Agua Mineral",
        precio: 50, 
        cantidad: 1,
    },
    
];

let comanda= JSON.parse(localStorage.getItem("comanda"))||[];

platos.forEach((plato)=>{
    let content = document.createElement("div");
    content.className ="platillos";
    content.innerHTML = `
    <h3>${plato.nombre}</h3>
    <p class = "valor">${plato.precio}$</p>
    `;
    contenidoMenu.append(content)

    let comprar = document.createElement("button")
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click",()=>{

        const repeat = comanda.some((repeatPlato)=> repeatPlato.id === plato.id);

        if(repeat){
            comanda.map((pla)=>{
                if(pla.id=== plato.id){
                    pla.cantidad ++;
                }
            });
        }else{
        comanda.push({
            id: plato.id,
            nombre: plato.nombre,
            precio: plato.precio,
            cantidad: plato.cantidad,
        });
        
    }
        saveLocal();
    });
});


    const pasarcomanda =()=>{
    pedidoContainer.innerHTML= "";
    pedidoContainer.style.display = "flex";
    const pedidoHeader= document.createElement("div");
    pedidoHeader.className = "pedido-header"
    pedidoHeader.innerHTML = `
    <h1 class="pedido-header-title">Comanda:</h1>
    `;
    pedidoContainer.append(pedidoHeader);

    const pedidoButton = document.createElement("h1");
    pedidoButton.innerText= "Salir❌";
    pedidoButton.className = "pedido-header-button";

    pedidoButton.addEventListener("click",()=>{
        pedidoContainer.style.display = "none";
    });
    

    pedidoHeader.append(pedidoButton);

    comanda.forEach((plato)=>{
        let comandaContent = document.createElement("div");
        comandaContent.className = "pedido-content";
        comandaContent.innerHTML= `
        <h3>${plato.nombre}</h3>
        <p>${plato.precio}$</p>
        <p>Cantidad: ${plato.cantidad}</p>
        <p>Total: ${plato.cantidad * plato.precio}</p>
        <span class="delete-plato"> X </span>
    `;
        pedidoContainer.append(comandaContent);

        let eliminar = comandaContent.querySelector(".delete-plato")
        eliminar.addEventListener("click",()=>{
            eliminarPlato(plato.id);
        });
    });
        

    const total = comanda.reduce((acc, el)=>acc + el.precio * el.cantidad, 0);

    const totalComanda = document.createElement("div");
    totalComanda.className = "total-content";
    totalComanda.innerHTML = `Total a pagar: ${total}$`;
    pedidoContainer.append(totalComanda);
};


verComanda.addEventListener("click", pasarcomanda);

const eliminarPlato =(id)=>{
    const foundId = comanda.find((element)=> element.id === id);
    console.log(foundId);//
    comanda = comanda.filter((comandaId)=>{
        return comandaId !== foundId;

    });
    saveLocal();
    pasarcomanda();

}

const saveLocal=()=>{
    localStorage.setItem("comanda",JSON.stringify(comanda));
};



// const platos = ["Tacos", "Tortillas", "Nachos", "Guacamole", "Limonada", "Tequila", "Agua Mineral"]
// for(let i=0; i<15; i++){
//     console.log(platos[i])
// }

// let misplatos =[]
// let cargar = prompt ("Ingrese el plato del día o presione Cancelar")
// while(cargar !== null)
// {
//    misplatos.push(cargar)
//     cargar = prompt ("Hay otro plato del día que desees cargar? ")
// }
// console.table(misplatos)

// function DatosUser(){
//     let nombre= prompt ("Ingrese su nombre: ")
//     let id= prompt ("Ingrese su usuario: ")
// }

// function HacerPedido(){
//     let confirma = confirm ("Quieres ingresar un pedido? O presiona Cancelar")

//     while(confirma){
//         PasarPedido()
//         confirma=confirm ("Desea agregar otro Plato al pedido?")
//     }
//     if(Contador >0){
//         MostrarTicket()
//     }
// }

// let TotalTicket=0
// Contador=0
// ListadoPedidos="\n Listado de Pedidos: "

// function PasarPedido(){
//     let nombre, precio, cantidad, total
//     nombre= prompt ("Ingrese el nombre del plato: ")
//     precio= parseFloat(prompt("Ingrese el precio: "))
//     cantidad= parseInt(prompt("Ingrese la cantidad deseada: "))
//     total= calcularTotal(precio, cantidad)
//     Contador ++
//     console.log({nombre, precio, cantidad, total})
//     ListadoPedidos += "\n Comanda"+ Contador + "|Plato: " + nombre +", Precio: $"+precio+", Cantidad: "+ cantidad +", Total: $"+total
// }

// function calcularTotal(precio, cantidad){
//     let total= precio * cantidad
//     TotalTicket+=total
//     return total
// }

// function MostrarTicket(){
//     ListadoPedidos += "\n\n El total a pagar de la mesa es $"+ TotalTicket
//     alert(ListadoPedidos)
//     console.log(ListadoPedidos)
// }

// DatosUser()
// HacerPedido()