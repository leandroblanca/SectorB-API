import {mongoose} from "mongoose"

const user = new mongoose.Schema(
    {
        name:{
            type: String,
            require: true,
            trim: true
        },
        lastname:{
            type: String,
            require: true,
            trim: true
        },
        email:{
            type: String,
            require: true,
            unique: true,
            lowercase:true,
            trim: true
        },
        password:{
            type: String,
            require: true,
        },
        role:{
            type: String,
            enum: ["client", "admin"],
            default: ["client"]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", user)