import {body} from "express-validator";
import {inputValidationMiddleware} from "./input-validation-middleware";
import {db} from "../database";

export const postsValidation = [
    body('title').isString().trim().isLength({min: 1, max: 30}).withMessage('incorrect title'),
    body('shortDescription').isString().trim().isLength({min: 1, max: 100}).withMessage('incorrect shortDescription'),
    body('content').isString().isLength({min: 1, max: 1000}).withMessage('incorrect content'),
    body('blogId').isString().custom((id, parse) => {
        const foundBlogId =  db.blogs.find(b => b.id === id)
        if (foundBlogId) {
            parse.req.body.blogName = foundBlogId.name
            return true
        } else {
            throw new Error('blogId not found')
        }
        }
    ),
    inputValidationMiddleware
]