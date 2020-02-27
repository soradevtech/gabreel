import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import axios from "axios";
import ComposeSection from "./ComposeSection";
import Posts from "./Posts";

// The main component for the Home page
// The container for the Compose and Posts sections
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: "Tracy"
    };
  }
  componentWillMount() {
    this.setState(
      {
        // Passing value of initialData from props into this component's state
        // Is this simply overwriting the main component's state??
        initialData: this.props.initialData 
      },
      () => {
        console.log(this.props);
      }
    );
  }
  clickedBtn = () => {
    console.log("clicked!");
  };
  render() {
    return (
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
    );
  }
}
