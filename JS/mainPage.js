const main=document.querySelector(".main")
const URL="https://fakestoreapi.com/products"
const cerrar=document.querySelector(".header p")
console.log(cerrar)
let dataUser=null
const datosUsuario=document.querySelector(".dataUser")

{/* <img src="" alt="" class="dataUser__image">
<p class="dataUser__name"></p> */}

if(localStorage.getItem("datos")!=null){
    dataUser=JSON.parse(localStorage.getItem("datos"))
}

const fotoUsuario=document.createElement("img")
const nombreUsuario=document.createElement("p")
fotoUsuario.classList.add("dataUser__image")
nombreUsuario.classList.add("dataUser__name")
fotoUsuario.src=dataUser.image
nombreUsuario.textContent=dataUser.nombre
datosUsuario.append(fotoUsuario,nombreUsuario)

obtener()




async function obtener(){
    const respuesta=await fetch(URL)
    const datos=await respuesta.json()
    if(respuesta.ok){
        setTimeout(()=>{
            const loader=document.querySelector(".loader")
            main.removeChild(loader)
            cargarElementos(datos)
        },1000)
    }
}

function cargarElementos(datos){
    for(let i=0;i<datos.length;i++){
        const card=document.createElement("div")
        const cardName=document.createElement("div")
        const cardImage=document.createElement("div")
        card.classList.add("card")
        cardName.classList.add("card__name")
        cardImage.classList.add("card__image")
        cardName.textContent=datos[i].title
        cardImage.style.backgroundImage=`url('${datos[i].image}')`
        card.append(cardName,cardImage)
        main.append(card)
    }
}

cerrar.addEventListener("click",()=>{
    localStorage.removeItem("datos")
    window.location.replace("../index.html")
})