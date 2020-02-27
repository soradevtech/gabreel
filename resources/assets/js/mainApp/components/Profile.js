import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import axios from "axios";
import ComposeSection from "./ComposeSection";
import Posts from "./Posts";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "Tracy"
    };
  }
  componentWillMount() {
    // Create the 3 route props from the routeProps passed down from Router
    const { match, location, history } = this.props.routeProps;
    // Store a reference to this class into a variable 
    const self = this;

    // Function to retrieve user data
    const getUser = async function() {
      try {
        // Variable to fetch the requested user by their ID
        const userProfile = await axios.get(`/api/user/${match.params.id}`);
        console.log(userProfile) // Console log to check retrieved data
        // Set the relevant app and user data to the state
        self.setState(
          {
            initialData: self.props.initialData,
            userProfile: userProfile.data.user[0],
            following: userProfile.data.following
          },
          () => {
            console.log(self.state); // Console log the state to check it after it's been updated
          }
        );
      } catch (error) {
        console.log(error); // Catch any errors if necessary
      }
    };
    getUser(); // Actual call to the the function
  }

  // This function contains both the follow and unfollow methods from the User controller.
  followUser = async () => {
    // Grab the route props passed down from React Router routeProps property
    const { match, location, history } = this.props.routeProps;

    // Put a reference to this entire class into a variable
    const self = this;

    // If the following property in this component's state has a value, try to get the unfollow
    // method while referencing the user in question and set the value of the following property to
    // its oppisite (false in this case)
    if(this.state.following) {
      try {
        const followSwitch = await axios.get(
          `/api/user/${match.params.id}/unfollow`
        );
        self.setState({
          following: !self.state.following
        });
        console.log(followSwitch.data); // Console log of the data in the userProfile property
      } catch (error) {
        console.log(error); // Console log any errors should they arise
      }
    } else {
      // Else, do the opposite: store the follow method and change the follow property to its 
      // opposite value (true)
      try {
      const followSwitch = await axios.get(
        `/api/user/${match.params.id}/follow`
      );
      self.setState({
        following: !self.state.following
      });
      console.log(followSwitch.data); // Console log of the data in the userProfile property
    } catch (error) {
      console.herelog(error); // Console log any errors should they arise
    }
    }

    
  };

  render() {
    // If there is a value in the userProfile property of the state, pull necessary values
    // from that property with a destructuring expression and return the JSX for the
    // user profile info page.
    if (this.state.userProfile !== undefined) {
      const { first_name, last_name, profile_img } = this.state.userProfile;
      return (
        <div className="content-area profile-page">
          <div className="user-img">
            {/* Inserting the profile_img value from the 
              destructured expression in this img tag */}
            <img src={`${profile_img}`} />
          </div>
          <div className="info">
            {/* Inserting the first and last name from the destructured expression */}
            <h1>{`${first_name} ${last_name}`}</h1>
            {/* Calling the followUser() function via an onClick event */}
            <div className="follow-btn" onClick={this.followUser}>
              {/* The value for the following property dictates the text contained
                in this div button */}
              {this.state.following ? "Unfollow" : "Follow"}
            </div>
          </div>
        </div>
      );
    } else {
      // Else return the loading div element until the userProfile data loads
      return <div className="content-area profile-page">Loading</div>;
    }
  }
}
