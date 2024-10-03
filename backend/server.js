import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
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
  {name:"Maci Laci", address:"Yellowstone"},
  {name:"Bubu", address:"Yellowstone"},
  {name:"Mekk Elek", address:"Budapest"},
  {name:"Hack Elek", address:"Budapest"}
]


app.get('/',(req,res)=>{
    res.send('Hello haver!')
})
app.post('/data',(req,res) => {
    res.send(persons)
})
app.post('/search',(req,res) => {
    const {searched} = req.body
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
    if (!name && !address) {
      res.status(400).json({error: "Nem adta meg megfelelően az adatokat"})
      return
    }
    persons.push({name:name,address:address})
    res.status(200).json({success: "Sikeres adatrögzítés"});
    console.log(persons);
})
app.put('/modify',(req, res) => {
  const {id,name,address} = req.body
    if (!id,!name && !address) {
      res.status(400).json({error: "Nem adta meg megfelelően az adatokat"})
      return
    }
    persons[id].name = name;
    persons[id].address= address;
    res.status(200).json({success: "Sikeres adatrögzítés"});
    console.log(persons);
})
app.delete('/delete',(req, res) => {
  const {id} = req.body
  if (!id) {
    res.status(400).json({error: "Nem adta meg megfelelően az adatokat"})
    return
  }
  delete persons[id];
  res.status(200).json({success: "Sikeres törlés"});
  console.log(persons);
})


app.listen(port,() => { console.log(`A szerver a http://${host}:${port}-on fut`)});