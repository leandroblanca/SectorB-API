import  {body}  from "express-validator";

const registerValidator = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({min:3, max: 30})
    .withMessage("El nombre debe tener entre 3 y 30 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre solo puede contener letras"),

    body("lastname")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({min: 3 , max: 30})
    .withMessage("El apallido debe tener entre 3 y 30 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El apallido solo puede contener letras"),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ingresar un email valido")
    .normalizeEmail(),

    body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatorio")
    .isLength({min: 8, max: 20})
    .withMessage("La contraseña debe tener entre 8 y 20 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña ebe contener al menos una letra mayuscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una letra minuscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un numero"),

    body("repeatPassword")
    .notEmpty()
    .withMessage("Repetir la contraseña es obligatorio")
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("La contraseña no coinciden");
        }
        return true
    })
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