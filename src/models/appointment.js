import mongoose, { model } from "mongoose";
import barber from "./barber";

const appointmentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El cliente es requerido"],
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "El servicio es requerido"],
    },
    barber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barber",
      required: [true, "el barbero es requerida"],
    },
    date: {
      type: Date,
      required: [true, "La fecha es requerida"],
    },
    time: {
      type: String,
      required: [true, "La hora es requerida"],
    },
    duration: {
      type: Number,
      required: [true, "La duracion es requerida"],
      min: [15, "La duracion es de 15 minutos"],
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
        "rejected",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Appointment", appointmentSchema);
