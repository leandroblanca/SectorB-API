import mongoose from "mongoose";

const barberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del barbero es requerido"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no puede superar los 50 caracteres"],
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
