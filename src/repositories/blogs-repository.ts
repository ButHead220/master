import {db} from "../database"
export const blogsRepository = {
    findAllBlogs() {
        return db.blogs
    },

    createBlog (name: string, description: string, websiteUrl: string) {
        const newBlog = {
            id: (+(new Date())).toString(),
            name,
            description,
            websiteUrl,
        }

        db.blogs.push(newBlog)
        return newBlog
    },

    findBlogById(id: string) {
        let blog = db.blogs.find(b => b.id === id)
        return blog;
    },

    updateBlog (id: string, name: string, description: string, websiteUrl: string) {
        const blog = db.blogs.find(b => b.id === id)
        if (blog) {
            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return true
        } else {
            return false
        }
    },

    deleteBlog(id: string) {
        const deleteBlog = db.blogs.filter(b => b.id !== id)
        if (deleteBlog) {
            for (let i = 0; i < db.blogs.length; i++) {
                if (db.blogs[i].id === id) {
                    db.blogs.splice(i, 1)
                    break
                } 
            } return true
        }    else {
            return false
        }
    }
}