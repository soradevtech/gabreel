"use strict";
const Post = use("App/Models/Post");

// This controller pulls information about the user and their related latest posts to be
// displayed on the homepage. Needs to be ironed out to display correctly either here or
// in the CSS.
class ApiController {
  async initialApp({ auth }) {
    try {
      //   const latestPosts = await Post.query()
      //     .where("user_id", "=", 1)
      //     .fetch();
      const latestPosts = await Post.query()
        .innerJoin("users", "users.id", "posts.user_id") // Join theses fields where they match
        .options({nestTables:true}) // Put info in their appropriate tables instead of one 
          // table, to avoid overwriting values
        .fetch(); // Store the query results into this variable
        console.log(latestPosts.toJSON()) // Show the found posts in the console log (testing)
      //Return an object of the user info and the latest posts for them
      return {
        userInfo: auth.user,
        latestPosts
      };
    } catch (error) {
      console.log(error); // Show the error in console if the request fails
    }
  }
}

module.exports = ApiController;
