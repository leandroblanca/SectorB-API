import mongoose from "mongoose";
import { type } from "node:os";

const barberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del barbero es requerido"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no puede superar los 50 caracteres"],
    },
    lastname: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    image: {
      type: String,
      default: ""
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model( "Barber", barberSchema);
