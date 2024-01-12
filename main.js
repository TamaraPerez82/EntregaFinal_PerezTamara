const platos = ["Tacos", "Tortillas", "Nachos", "Guacamole", "Limonada", "Tequila", "Agua Mineral"]
for(let i=0; i<15; i++){
    console.log(platos[i])
}

let misplatos =[]
let cargar = prompt ("Ingrese el plato del día o presione Cancelar")
while(cargar !== null)
{
   misplatos.push(cargar)
    cargar = prompt ("Hay otro plato del día que desees cargar? ")
}
console.table(misplatos)

function DatosUser(){
    let nombre= prompt ("Ingrese su nombre: ")
    let id= prompt ("Ingrese su usuario: ")
}

function HacerPedido(){
    let confirma = confirm ("Quieres ingresar un pedido? O presiona Cancelar")

    while(confirma){
        PasarPedido()
        confirma=confirm ("Desea agregar otro Plato al pedido?")
    }
    if(Contador >0){
        MostrarTicket()
    }
}

let TotalTicket=0
Contador=0
ListadoPedidos="\n Listado de Pedidos: "

function PasarPedido(){
    let nombre, precio, cantidad, total
    nombre= prompt ("Ingrese el nombre del plato: ")
    precio= parseFloat(prompt("Ingrese el precio: "))
    cantidad= parseInt(prompt("Ingrese la cantidad deseada: "))
    total= calcularTotal(precio, cantidad)
    Contador ++
    console.log({nombre, precio, cantidad, total})
    ListadoPedidos += "\n Comanda"+ Contador + "|Plato: " + nombre +", Precio: $"+precio+", Cantidad: "+ cantidad +", Total: $"+total
}

function calcularTotal(precio, cantidad){
    let total= precio * cantidad
    TotalTicket+=total
    return total
}

function MostrarTicket(){
    ListadoPedidos += "\n\n El total a pagar de la mesa es $"+ TotalTicket
    alert(ListadoPedidos)
    console.log(ListadoPedidos)
}

DatosUser()
HacerPedido()