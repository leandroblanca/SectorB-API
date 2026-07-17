import  mongoose  from "mongoose"


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        console.log("mongodb conectado")
    } catch (error) {
        console.error("error al conectar:", error.message)
        process.exit(1)
    }
}

export default connectDB;