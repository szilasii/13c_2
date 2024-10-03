import express from "express";
import cors from "cors";
const app =express();
const port = 3000;
const host = "localhost";

// app.use(function (req, res, next) {
//     res.setHeader(
//       'Access-Control-Allow-Origin','*'
//     );
//     next();
//   });
app.use(cors());
const persons = [
  {name:"Maci Laci", address:"Yellowstone"},
  {name:"Bubu", address:"Yellowstone"},
  {name:"Mekk Elek", address:"Budapest"},
  {name:"Hack Elek", address:"Budapest"}
]


app.get('/macika',(req,res)=>{
    res.send('Hello haver!')
})
app.post('/data',(req,res) => {
    res.send(persons)
})

app.listen(port,() => { console.log(`A szerver a http://${host}:${port}-on fut`)});