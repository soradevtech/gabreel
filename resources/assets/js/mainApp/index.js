import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Profile from "./components/Profile";
import LeftMenu from "./components/LeftMenu";
import Messenger from "./components/Messenger";
import SearchHeader from "./components/SearchHeader";
import ComposeSection from "./components/ComposeSection";
import Posts from "./components/Posts";
import LoadingComp from "./components/LoadingComp";

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      name: "Tracy"
    };
  }
  // Declarations that need to be made before the first render are placed in this function.
  // Props and initial state are accessible at this point.
  componentWillMount() {
    const self = this; // Setting a reference to the class in a variable
    const getInitialData = async function() {
      // This try/catch is going to use axios to make a call to the route that calls the
      // initialApp() function in the Api Controller. This will in turn pull the data required
      // for the user's feed.
      try {
        const initialData = await axios.get("/api/initialApp");

        // Store the data from initialApp into the state
        self.setState(
          {
            initialData: initialData.data
          },
          () => {
            console.log(self.state); // Console log of the state after storing data pulled via axios
          }
        );
        // Going to look into this return statement to see if it's necessary
        return initialData.data; 
      } catch (error) {
        console.log(error); // Standard error catching if there's any issues
      }
    };
    getInitialData(); // calling the function
  }
  // Function to expand on for a custom clickable button in the future
  clickedBtn = () => {
    console.log("clicked!"); 
  };
  // Where the main content to be displayed is written
  render() {
    return (
      <Router>
        <div className="app-container home-page">
          <LoadingComp
            // This conditional causes a loading element to appear over the actual
            // app until it initialData is populated with a value other than "loading"
            initialData={
              this.state.initialData == undefined
                ? "loading"
                : this.state.initialData
            }
          />
          <LeftMenu
            initialData={
              this.state.initialData == undefined
                ? "loading"
                : this.state.initialData
            }
          />
          <section id="content-container">
            <SearchHeader />
            {/* This Router statement will show the home page component if the URL is root ("/") 
              Props are also handed down in the same statement */}
            <Route exact path="/" component={(props) => <Home routeProps={props} initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />}/>

            {/* In this case for Router, the profile page component will show  based on the URL (""/profile/:id"")
              The profile shown will depend on the profile ID given 
              Props are handed down in the same statment here as well */}
            <Route exact path="/profile/:id" component={(props) => <Profile routeProps={props} initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />}/>
            <div className="content-area">
              <ComposeSection
                initialData={
                  this.state.initialData == undefined
                    ? "loading"
                    : this.state.initialData
                }
              />
              <Posts
                initialData={
                  this.state.initialData == undefined
                    ? "loading"
                    : this.state.initialData
                }
              />
            </div>
          </section>
          {/* Messenger component */}
          <Messenger />
        </div>
      </Router>
    );
  }
}

const app = document.getElementById("app");

ReactDOM.render(<Layout />, app);
