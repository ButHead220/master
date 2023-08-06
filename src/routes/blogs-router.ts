import {Request, Response, Router} from "express"
import {blogsRepository} from "../repositories/blogs-repository";
import {authorizationMiddleware} from "../middlewares/authorizationMiddleware";
import {blogsValidation} from "../middlewares/blogs-validation";

export const blogsRouter = Router({})

blogsRouter.get('/' , (req: Request , res: Response) => {
    const blogs = blogsRepository.findAllBlogs()
    res.send(blogs)
})

blogsRouter.post ('/',
    authorizationMiddleware,
    blogsValidation,
    (req: Request, res: Response) => {

    const {name, description, websiteUrl} = req.body
    const newBlog = blogsRepository.createBlog(
        name,
        description,
        websiteUrl,
    )

    res.status(201).send(newBlog)
})

blogsRouter.get('/:blogsId', (req: Request, res: Response) => {

    const blog = blogsRepository.findBlogById(req.params.blogsId)

    if (blog) {
        res.send(blog)
    } else {
        res.sendStatus(404)
    }
})

blogsRouter.put('/:blogsId',
    authorizationMiddleware,
    blogsValidation,
    (req: Request, res: Response) => {
        const {name, description, websiteUrl} = req.body
        const successUpdate = blogsRepository.updateBlog(
            req.params.blogsId,
            name,
            description,
            websiteUrl,
        )

        if(successUpdate) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

blogsRouter.delete('/:blogsId',
    authorizationMiddleware,
    blogsValidation,
    (req: Request, res: Response) => {
        const successDelete = blogsRepository.deleteBlog(req.params.blogsId)

        if (successDelete) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })