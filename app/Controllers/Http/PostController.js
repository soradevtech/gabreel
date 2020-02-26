'use strict'
const Post = use('App/Models/Post')

// This is the controller that deals with the posts table
class PostController {
    // function that stores the post into the database. Will need to update the page
    // here and account for errors.
    async store({auth, request, response}) {
        const newPost = await Post.create({
            content: request.input('content'),
            user_id: auth.user.id,
            type: 'text'
        })
        return 'item was saved'
    }

    // Updates the current post in question. Will update this page as time allows.
    async update() {
        return request.post()
    }

    // Will work on this page later. Deletes the post in question.
    async destroy() {
        return 'destroyed'
    }
}

module.exports = PostController
