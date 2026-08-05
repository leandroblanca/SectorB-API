import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name :{
        type: String,
        required: [true, "El nombre de los servicios es requerido"],
        trim: true,
        minlength: [3, "El nombre debe tener al menos 3 caracteres"],
        maxlength: [50, "El nombre no puede superar los 50 caracteres"],
    },
    description:{
        type: String,
        required: [true,"La descripcion es requerida"],
        trim: true,
        maxlength: [200, "La descripcion no puede superar los 200 caracteres"],
    },
    price:{
        type: Number,
        required:[true, "El precio es requerido"],
        min:[0, "El precio no puede ser negativo"]
    },
    duration:{
        type: Number,
        required:[true, "La duracion es requerida"],
        min: [15, "La duracion minima es de 15 minutos"]
    },
    image: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        default: true,
    }
},
{
    timestamps: true
}
)

export default mongoose.model("Service", serviceSchema)