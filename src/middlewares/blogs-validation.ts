import {body} from "express-validator";
import {inputValidationMiddleware} from "./input-validation-middleware";

export const blogsValidation = [
    body('name').isString().trim().isLength({min: 1, max: 15}).withMessage('incorrect name'),
    body('description').isString().trim().isLength({min: 1, max: 500}).withMessage('incorrect description'),
    body('websiteUrl').isString().isURL().isLength({min: 1, max: 100}).withMessage('incorrect websiteUrl'),
    inputValidationMiddleware
]