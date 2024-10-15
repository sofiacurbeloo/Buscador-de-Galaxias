//VARIABLES GLOBALES
const container = document.getElementById("contenedor");

//FUNCION QUE OBTIENE LA API CON FETCH
let getData = function (url){
    return fetch(url)
    .then(response =>{
        if(response.ok){    //manejando errores
            return response.json();    
        } else {
            throw Error("No se ha encontrado")
        }
    })
    .catch (error => {
        console.error("Error:", error);
    })
} 

//EVENTO DEL BOTON BUSCAR
document.getElementById("btnBuscar").addEventListener("click", ()=>{  
    const URL = `https://images-api.nasa.gov/search?q=${document.getElementById("inputBuscar").value.trim()}`;
    console.log(document.getElementById("inputBuscar").value.trim());
    console.log(URL);
    container.innerHTML = ""; //vacio el contenedor
    getData(URL) //tomo los datos de la API
    .then (data => {
        setInfo(data.collection.items);  
    });  
});

//FUNCION QUE GUARDA LOS RESULTADOS
function setInfo(array){
    array.forEach(item => {
        let {links: [{href}], data: [{title, description_508, description, date_created}]} = item
        showInfo(href, title, description_508 || description || "No hay descripcion para este item", date_created);
    });
}

//FUNCION QUE MUESTRA LOS RESULTADOS
let showInfo = (img, title, description, date)=>{
    container.innerHTML +=  `
        <div class="card mx-auto col-4 my-2 p-0 background" style="width: 23rem;">
            <img src="${img}" class="card-img-top img" alt="${title} image">
            <div class="card-body">
                <h4 class="card-title text-light">${title}</h4>
                <p class="card-text overflow-auto text-light" style="height: 7rem;">${description}</p> 
            </div>
            <p class="card-text p-2 text-muted">${date}</p>
        </div>`
}


