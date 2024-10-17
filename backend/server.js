import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
import { idToIndex } from "./functions.js"
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
app.use(bodyParser.json())
const persons = [
  {id:1,name:"Maci Laci", address:"Yellowstone"},
  {id:2,name:"Bubu", address:"Yellowstone"},
  {id:5,name:"Mekk Elek", address:"Budapest"},
  {id:4,name:"Hack Elek", address:"Budapest"}
]

app.get('/',(req,res)=>{
    res.send('Hello haver!')
})
app.post('/data',(req,res) => {
    res.send(persons)
})
app.get('/search',(req,res) => {
  const {searched} = req.query
    if (!searched) {
      res.status(400).json({error: "Nem adtad meg a keresendő szöveget"})
      return
    }
    const result = persons.filter(({name}) =>  name.toLocaleLowerCase().indexOf(searched.toLocaleLowerCase()) >= 0)
    if (result.length >0) {
      res.send(result).status(200);
      return
    }
    res.status(404).json({error:"Nincs találat"})
})
app.post('/save',(req, res) => {
    const {name,address} = req.body
    if (!name || !address) {
      res.status(400).json({error: "Nem adta meg megfelelően az adatokat"})
      return
    }
    persons.push({name:name,address:address})
    res.status(200).json({success: "Sikeres adatrögzítés"});
    console.log(persons);
})
app.put('/modify',(req, res) => {
  const {id,name,address} = req.body
  let ids = idToIndex(id)
 
  if (ids || !id || !name || !address) {
      res.status(400).json({error: "Nem adta meg megfelelően az adatokat"})
      return
    }
    persons[ids].name = name;
    persons[ids].address= address;
    res.status(200).json({success: "Sikeres adatrögzítés"});
    console.log(persons);
})
app.delete('/delete',(req, res) => {
  const {id} = req.body
  let ids = idToIndex(id)
  if (ids || !id || !((id-1 > -1) && (id-1 < persons.length))) {
    res.status(400).json({error: "Nem adta meg megfelelően az adatokat"})
    return
  }
  delete persons[ids];
  res.status(200).json({success: "Sikeres törlés"});
  console.log(persons);
})


app.listen(port,() => { console.log(`A szerver a http://${host}:${port}-on fut`)});