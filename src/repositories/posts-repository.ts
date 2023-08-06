import {db} from "../database";


type PostsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
}

const posts: PostsType[] = []
export const postsRepository = {
    foundAllPosts() {
        return db.posts
    },

    createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        const newPost = {
            id: (+(new Date())).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName,
        }
        db.posts.push(newPost)
        return newPost
    },

    foundPostById(id: string) {
        const foundPost = db.posts.find(p => p.id === id)
        return foundPost
    },

    updatePost(postId: string, title: string, shortDescription: string, content:string, blogId: string) {
        let foundPost = db.posts.find(p => p.id === postId)
        if (foundPost) {
            foundPost.title = title
            foundPost.shortDescription = shortDescription
            foundPost.content = content
            foundPost.blogId = blogId
            return true
        } else {
            return false
        }
    },

    deletePost(id: string) {
        const deletePost = db.posts.find(p => p.id === id)

        if (deletePost) {
            for (let i = 0; i < db.posts.length; i++) {
                if (db.posts[i].id === id) {
                    db.posts.splice(i, 1)
                    break
                }
            } return true
        }    else {
            return false
        }
    }
}