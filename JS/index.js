const user=document.querySelector("#username")
const contra=document.querySelector("#password")
const login=document.querySelector("#login")
const mostrarContra=document.querySelector("i")
let contador=0
const URL="https://api.escuelajs.co/api/v1/users"


login.addEventListener("click",(e)=>{
    e.preventDefault()
    obtener()
    
})

mostrarContra.addEventListener("click",(e)=>{
   if(contra.type==="password"){
        mostrarContra.classList="fa-solid fa-eye"
        contra.type="text"
   }else if(contra.type==="text"){
    mostrarContra.classList="fa-solid fa-eye-slash"
    contra.type="password"
   }

})

async function obtener(){
    const respuesta=await fetch(URL)
    const datos=await respuesta.json()
    logear(datos)
}

function logear(datos){
    let logged=false
    for(let i=0;i<datos.length;i++){
        if(user.value===datos[i].email){
            if(contra.value===datos[i].password){
                logged=true
                const dataUser={"nombre":datos[i].name,"image":datos[i].avatar}
                localStorage.setItem("datos",JSON.stringify(dataUser))
                break
            }
        }
    }
   

    if(logged){
        alert("Bievenido")
        redirigir()
    }else{
        contador++
        if(contador<=3){
            alert("Error de usuario o contraseña")
            user.value=""
            contra.value=""
            if (contador===3){
                alert("Bloqueado")
            login.disabled=true
            }
        }
    }

}

function redirigir(){
    setTimeout(()=>{
        window.location.assign("../HTML/mainPage.html")    
    },2000)
    
}