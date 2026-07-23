import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [101, "El nombre no puede tener más de 101 caracteres"],
      match: [
        /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+(?: [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+)*$/,
        "El nombre solo puede contener letras",
      ],
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
