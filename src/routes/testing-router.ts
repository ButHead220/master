import {Request, Response, Router} from "express"
import {db} from "../database";

export const testingRouter = Router({})

testingRouter.delete('/all-data', (req:Request, res: Response) => {
    db.posts.length = 0
    db.blogs.length = 0
    res.sendStatus(204)
})