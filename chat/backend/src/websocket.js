export const socket = new WebSocket("ws://localhost:5555");
const message = [];

socket.addEventListener("open",(event) => {

})

socket.addEventListener("message", (event) => {
    message.push(event.data)
})

socket.addEventListener("close",(event) => {

})

socket.addEventListener("error",(event) => {

})