import app from "./index"

//Gyökér végpont definiálása, a szerver státuszának kiírására 
app.get('/',(req,res)=>{
    res.send("szerver fut")
})


 //szerver futtatása a megadott porton
app.listen(3000, ()=> {
    console.log("fut a szerver");
})