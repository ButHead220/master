import express, {Express} from "express"
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {testingRouter} from "./routes/testing-router";

const app : Express = express()
const port : 3000 = 3000

app.use(express.json())
app.use()

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)

app.listen(port, () : void => {
    console.log(`Example app listening on port ${port}`)
})