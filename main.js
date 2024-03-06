const contenidoMenu = document.getElementById("contenidoMenu");
const verComanda = document.getElementById("verComanda");
const pedidoContainer = document.getElementById("pedido-container");


let comanda = JSON.parse(localStorage.getItem("comanda")) || [];

const getPlatos = async () => {

    const response = await fetch("data.json");
    const data = await response.json();
    data.forEach((plato) => {
        let content = document.createElement("div");
        content.className = "platillos";
        content.innerHTML = `
        <img src="${plato.img}">
        <h3>${plato.nombre}</h3>
        <p class = "valor">${plato.precio}$</p>
        `;
        contenidoMenu.append(content);

        let comprar = document.createElement("button")
        comprar.innerText = "Solicitar";
        comprar.className = "comprar";

        content.append(comprar);

        comprar.addEventListener("click", () => {

            const repeat = comanda.some((repeatPlato) => repeatPlato.id === plato.id);

            if (repeat) {
                comanda.map((pla) => {
                    if (pla.id === plato.id) {
                        pla.cantidad++;
                    }
                });
            } else {
                comanda.push({
                    id: plato.id,
                    img: plato.img,
                    nombre: plato.nombre,
                    precio: plato.precio,
                    cantidad: plato.cantidad,
                });
            }
            saveLocal();
        });
    });

    const pasarcomanda = () => {
        pedidoContainer.innerHTML = "";
        pedidoContainer.style.display = "flex";
        const pedidoHeader = document.createElement("div");
        pedidoHeader.className = "pedido-header"
        pedidoHeader.innerHTML = `
        <h1 class="pedido-header-title">Comanda:</h1>
        `;
        pedidoContainer.append(pedidoHeader);

        const pedidoButton = document.createElement("h1");
        pedidoButton.innerText = "Salir❌";
        pedidoButton.className = "pedido-header-button";

        pedidoButton.addEventListener("click", () => {
            Toastify({
                text: "Vuelva pronto!!",
                duration: 1500,
                destination: "./index.html",
                close: true,
                gravity: "bottom", 
                position: "center", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function () { } 
            }).showToast();
        })
        pedidoButton.addEventListener("click", () => {
            pedidoContainer.style.display = "none";
        });

        pedidoHeader.append(pedidoButton);
        pedidoHeader.append(finButton);

        comanda.forEach((plato) => {
            let comandaContent = document.createElement("div");
            comandaContent.className = "pedido-content";
            comandaContent.innerHTML = `
            <img src= "${plato.img}">
            <h3>${plato.nombre}</h3>
            <p>${plato.precio}$</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${plato.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${plato.cantidad * plato.precio}</p>
            <span class="delete-plato"> 🗑 </span>               
        `;

            pedidoContainer.append(comandaContent);

            let restar = comandaContent.querySelector(".restar")
            restar.addEventListener("click", () => {
                if (plato.cantidad !== 1) {
                    plato.cantidad--;
                }
                saveLocal();
                pasarcomanda();
            });

            let sumar = comandaContent.querySelector(".sumar")
            sumar.addEventListener("click", () => {
                plato.cantidad++;
                saveLocal();
                pasarcomanda();
            });

            let eliminar = comandaContent.querySelector(".delete-plato")
            eliminar.addEventListener("click", () => {
                eliminarPlato(plato.id);
            });

        });


        const total = comanda.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
        const totalComanda = document.createElement("div");
        totalComanda.className = "total-content";
        totalComanda.innerHTML = `Total a pagar: ${total}$`;
        pedidoContainer.append(totalComanda);

    };

    verComanda.addEventListener("click", pasarcomanda);

    const eliminarPlato = (id) => {
        const foundId = comanda.find((element) => element.id === id);
        console.log(foundId);
        comanda = comanda.filter((comandaId) => {
            return comandaId !== foundId;
        });
        saveLocal();
        pasarcomanda();
    }

};

getPlatos();

const saveLocal = () => {
    localStorage.setItem("comanda", JSON.stringify(comanda));
};

const finButton = document.createElement("h1");
finButton.innerText = " Finalizar Pedido 🍱";
finButton.className = "fin-header-button";

finButton.addEventListener("click", () => {
    pedidoContainer.style.display = "none";
    compraFin();
    eliminarLS();
});

function compraFin() {
    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Tu Comanda esta en camino",
        showConfirmButton: true,
        timer: 2000
    });


};

const eliminarLS = () => {
    localStorage.removeItem("comanda");
};



