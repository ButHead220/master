import {Router, Request, Response} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {authorizationMiddleware} from "../middlewares/authorizationMiddleware";
import {postsValidation} from "../middlewares/post-validation";

export const postsRouter = Router({})

postsRouter.get ('/', (req: Request, res: Response) => {
    const posts = postsRepository.foundAllPosts()
    res.send(posts)
})

postsRouter.post ('/',
    authorizationMiddleware,
    postsValidation,
    (req: Request, res: Response) => {

    const {title, shortDescription, content, blogId, blogName} = req.body
    const newPost = postsRepository.createPost(
        title,
        shortDescription,
        content,
        blogId,
        blogName
    )

    res.status(201).send(newPost)
})

postsRouter.get('/:postId', (req: Request, res: Response) => {
    const post = postsRepository.foundPostById(req.params.postId)

    if (post) {
        res.send(post)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.put('/:postId',
    authorizationMiddleware,
    postsValidation,
    (req: Request, res: Response) => {
    const {title, shortDescription, content, blogId} = req.body
    const successUpdate = postsRepository.updatePost(
        req.params.id,
        title,
        shortDescription,
        content,
        blogId
    )

    if (successUpdate) {
        res.sendStatus(204)
    } else {
        res.sendStatus(400)
    }
    })

postsRouter.delete('/:postId',
    authorizationMiddleware,
    postsValidation,
    (req: Request, res: Response) => {
        const deletePost = postsRepository.deletePost(req.params.postId)

        if (deletePost) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })