const mongoose = require("mongoose")


async function conectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        console.log("mongodb conectado")
    } catch (error) {
        console.error("error al conectar:", error.message)
        process.exit(1)
    }
}

module.exports= conectDB;