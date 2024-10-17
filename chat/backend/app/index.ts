import express from "express"  //express modul importálása
import cors from "cors" //cors modul importálása
import bodyParser from "body-parser" //bodyparser modul importálása

const app= express() //express modul példányosítássa

app.use(cors({origin:'*'})) // CORS (Eredet ellenörzés) beállítása a szerver bárhonnan elérhető 

/*Headerben, body-ban küldött adatok visszanyerése json-ból*/
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
  }));


// Exportáljuk app változót, hogy más fájlokban/modulokban használhassuk a "tartalmát"  
export default app;  


