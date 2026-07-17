import  {body}  from "express-validator";

const registerValidator = [
    body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    body("lastname")
    .notEmpty()
    .withMessage("El apellido es obligatorio"),

    body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ingresar un email valido"),

    body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatorio")
    .isLength({min: 6})
    .withMessage("La contraseña tiene que tener al menos 6 caracteres"),
];


const loginValidator = [
    body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ingresar un email valido"),


    body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
]


export {
    registerValidator,
    loginValidator
}