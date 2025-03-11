import WebSocket  from "ws";
const server = new WebSocket.Server({port:5555})
const clients = new Set<WebSocket>()

server.on('connection', (socket: WebSocket) => {
    console.log('valaki csatlakozott!')
    clients.add(socket)
    
    socket.on("message",(message)=>{   
        console.log(message)
        broadcast(message)    
    })
    socket.on('close', () =>{
        clients.delete(socket)
    })
})

const broadcast =  (message:any)=> {
    for(const client of clients){
        client.send(message)
    }
} 