import express from "express";
const app =express();
const port = 3000;
const host = "localhost";

app.get('/macika',(req,res)=>{
    res.send('Hello haver!')
})
app.post('/data',(req,res) => {
    res.send(JSON.stringify('Hello haver!'))
})

app.listen(port,() => { console.log(`A szerver a http://${host}:${port}-on fut`)});