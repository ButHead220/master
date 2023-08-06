import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";


const errorsArray = ({message , field}: any) => {
    return {
        message: message,
        field: field,
    }
}

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        const errorsMessages = errors.array({onlyFirstError: true}).map(err => errorsArray(err))
        res.status(400).json({errorsMessages})
    } else {
        next()
    }
}