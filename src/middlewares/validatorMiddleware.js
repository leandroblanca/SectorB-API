import {validationResult} from "express-validator"

const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            sucess: false,
            errors: errors.array()
        })
    }
    next()
}

module.exports = validationMiddleware;