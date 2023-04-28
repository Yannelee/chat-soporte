let conversaciones = document.getElementById('list__conversaciones')
let chatNombre = document.querySelector('.chat__nombre')
let chatImg = document.querySelector('.chat__img')
let chatMensajes = document.querySelector('.chat__items')
let mensajes = document.getElementById('conversaList')
let inputMensaje = document.getElementById('inputMensaje')
let input = document.querySelector('.escribir')
let chatActual = document.querySelector('.chat__actual')
let chatEscribir = document.querySelector('.chat__escribir')
let chatEstatus = document.querySelector('.chat__conexion')
let chatEncabezado = document.querySelector('#chat__encabezado')

let urlRM = 'https://rickandmortyapi.com/api/character';
let urlQuotes = 'https://api.breakingbadquotes.xyz/v1/quotes'

//*LISTA DE CONVERSACIONES
fetch(urlRM)
.then(response => response.json())
.then(datos =>{
  let { count } = datos.info
  conversasList(urlRM, numero(count), numero(100))
  let i = 0
  while (i<numero(10)) {
    conversasList(urlRM, numero(count), numero(100))
    i++
  }
})

//* SELECCIÓN DE CONVERSACIÓN
let seleccion = (obj)=>{
  let objChild = obj.children[0]
  let imgSrc = objChild.children[0].src
  let nombre = objChild.children[1].children[0].children[0]
  let mensaje = objChild.children[1].children[1].children[0]
  let pill = objChild.children[1].children[1].children[1]

  chatImg.src = imgSrc
  chatNombre.innerHTML = nombre.innerHTML
  chatEstatus.innerHTML = online()
  pill.classList.add('d-none')
  nombre.classList.remove('fw-bold')
  chatActual.classList.remove('d-none')
  chatEscribir.classList.remove('d-none')
  mensajes.innerHTML = ''
  mensajes.innerHTML += `<p class="textos rounded-4 p-3 my-1 bg-Teal-skyblue">${mensaje.innerHTML}</p>`
  scrolling()
}

//* ESCRIBIR MENSAJE
inputMensaje.addEventListener('submit', (e)=>{
  e.preventDefault()
  let mensajeInput = input.value
  if(mensajeInput) { 
    mensajes.innerHTML += `<p class="textos rounded-4 p-3 align-self-end bg-Teal-pale">${mensajeInput}</p>`;
    mensajeIzq();   
    borrar();
  }
})



//*FUNCIONES
let conversasList = (url, nRandom, mensajeNoLeido) =>{
  fetch(`${url}/${nRandom}`)
  .then(response => response.json())
  .then(datos =>{ 
    const { name, image } = datos
    fetch(urlQuotes)
    .then(response => response.json())
    .then(datos => {
      let { quote } = datos[0]
      conversaciones.innerHTML += `
        <a role="button" class="list-group-item list-group-item-action p-1 rounded-0 flex-grow-1" id="list" onclick="seleccion(this)">
          <div class="grupo d-flex align-items-center" id="grupo">
            <img src="${image}" alt="" class="rounded-circle me-2 w-25 conversa__img" onclick="scroll()">
            <div class="grupo__texto flex-grow-1">
              <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1 fw-bold conversa__nombre w-70" id="nombre">${name}</h6>
                <small class="text-muted tiempo flex-grow-1 w-50 text-end">${time()}</small>
              </div>
              <div class="mensaje d-flex align-items-center justify-content-between w-100">
                <p class="mb-1 quote">${quote}</p>
                <span class="badge bg-primary rounded-pill mensaje__no-leido" id="aqui">${mensajeNoLeido}</span>
              </div>
            </div>
          </div>
        </a>
      `
    })
  })
}

let numero = a =>{
  return (Math.floor(Math.random()*a))+1
}

let borrar = ()=>{
  input.value = ''
}

let mensajeIzq = () =>{
  fetch(urlQuotes)
  .then(response => response.json())
  .then(datos => {
    let { quote } = datos[0]
    console.log(quote);
    mensajes.innerHTML += `<p class="textos textos--left rounded-4 p-3 bg-Teal-skyblue">${quote}</p>`
  })
}

let time = ()=>{
  let dato = ''
  let num = Math.ceil(Math.random()*3)
  switch (num) {
    case 1:
      let dia = numero(30)
      dia>1
      ? dato = `Hace ${dia} días`
      : dato = `Hace ${dia} día`

      break;
    case 2:
      let hora = numero(24)
      hora>1 
      ? dato = `Hace ${hora} horas`
      : dato = `Hace ${hora} hora`
      break;
    case 3:
      let minuto = numero(24)
      minuto>1 
      ? dato = `Hace ${minuto} minutos`
      : dato = `Hace ${minuto} minuto`

      break;
    default:
      break;
  }
  
  return dato
}

let online = ()=>{
  let online = ''
  let num = Math.ceil(Math.random()*2)

  num == 1 ? online = 'Online' : online = 'Offline'
  
  return online
}

let scrolling =()=>{
  window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: "smooth"})
}