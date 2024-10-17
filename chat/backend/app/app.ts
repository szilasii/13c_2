import app from "./index"

app.get('/',(req,res)=>{
    res.send("szerver fut")
})

app.listen(3000,()=> {
    console.log("fut a szerver");
})