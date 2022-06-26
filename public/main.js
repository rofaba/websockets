
const socket = io.connect();
socket.on('productos', data => {
    console.log(data);
    renderTabla(data);});

socket.on('mensajes', msg => {
    console.log(msg);
    renderMensajes(msg);
})

function renderTabla(data) {
    const sinProductos = `<h1> No hay productos para mostrar </h1>`
        if (data.length == 0) {
            document.querySelector(".table").innerHTML = sinProductos
            
        } else {
        const tabla = data.map((elem)=> {
        return(`<tr>
                    <td> ${elem.id} </td>
                    <td> ${elem.title} </td>
                    <td> ${elem.price} </td>
                    <td> <img src= ${elem.thumbnail} alt=${elem.title}} width="50px">
                    </td>
                </tr>`)
        })
                document.querySelector(".table").innerHTML = tabla;
                
        }  
    }
                
// RENDERIZAR LOS MENSAJES
function renderMensajes(mensajes) {
    console.log(mensajes)
    const chatWeb = mensajes.map((elem) => {
        return(`<div>
        <span style = "color:blue;"> <strong>${elem.author}</strong>: </span> 
        <span style = "color:brown;"> ${Date()} </style> </span>
        <span style = "color: green;" <i>${elem.text}</i> </span>
            </div>`)
    }).join(" ");
    document.querySelector("#messages").innerHTML = chatWeb;
}

// socket.on('mensajes', function(data) { render(data); });

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-mensaje', mensaje);
    return false;
}