require("dotenv").config()

const app = require("./app");
const conectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

conectDB();

app.listen(PORT, () =>{
 console.log(`Servidor corriendo en el puerto ${PORT}`)
})