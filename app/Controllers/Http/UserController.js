"use strict";
const Database = use("Database");
const User = use("App/Models/User");

class UserController {
  // Try/catch to see if a user data exists in the database, and whether you
  // follow them. This function needs to be updated to be fully dynamic
  async profile({ auth, request, response }) {
    try {
      // Variable containing the query for the requested user
      const user = await User.query()
        .where("id", "=", request.params.id)
        .fetch();
      // Store a value (even if null) to a variable where there is an attempt 
      // to find the requester already following the requested user
      // May have to update the user_id in the query
      const following = await Database.from("followers").where({
        user_id: 1,
        follow_id: request.params.id
      });

      // Console log to see if the user is already being followed by the requester
      console.log("=================");
      console.log(following); 
      console.log("=================");

      // Return both variables in order to update the user variable to a JSON format and the
      // following variable to a boolean value
      return {
        user: user.toJSON(),
        following:
          following === undefined || following.length == 0 ? false : true
      };
    } catch (error) {
      console.log(error); // Catch any potential errors
    }
  }

  // This function creates a follow relationship between the requester and the
  // requested user. This is done via inserting a record into the followers database.
  // The first step checks if the user is even logged in.
  async follow({ auth, request, response }) {
    if (auth.user) {
      try {
        const followedUser = await Database.table("followers").insert({
          user_id: auth.user.id,
          follow_id: request.params.id
        });

        console.log(followedUser);
        return "saved successfully";
      } catch (error) {
        console.log(error);
      }
    } else {
      return "You are not logged in";
    }
  }

  // Same functionality as the follow method above, but for unfollowing a user by
  // deleting the associated record in the followers database
  async unfollow({ auth, request, response }) {
    if (auth.user) {
      try {
        const followedUser = await Database.table("followers")
          .where({
            user_id: auth.user.id,
            follow_id: request.params.id
          })
          .delete();

        console.log(followedUser);
        return "deleted successfully";
      } catch (error) {
        console.log(error);
      }
    } else {
      return "You are not logged in";
    }
  }
}

module.exports = UserController;
