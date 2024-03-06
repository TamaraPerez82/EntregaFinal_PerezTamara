 let infocom = document.querySelector("#users");

 const fetchComent = async () => {
  try{
    const response = await fetch("https://jsonplaceholder.typicode.com/users/2");
        const datos = await response.json();
        console.log(datos);      

        const coment = document.createElement("div");
            coment.innerHTML = ` 
            <h1>${datos.id}</h1>
            <p>${datos.name}</p>
            `;
            infocom.append(coment);

  } catch(err){
    console.log(err);
  }
};
fetchComent();













