import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class LeftMenu extends Component {
  constructor() {
    super();
    this.state = {
      dropdown: false // Dropdown has a default state of false
    };
  }

  // This function simply reverses the boolean value of the dropdown menu
  // to make it visible or not.
  clickedDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  };
  render() {
    // Return a div to indicate the data is loading if it needs time
    if (this.props.initialData.userInfo == undefined) {
      return <div>Loading</div>;
    } else {
      // Else return the content with interpolated values from the props
      const {first_name, last_name} = this.props.initialData.userInfo
      return (
        <section id="left-menu">
          <div className="account-dropdown">
            <div className="logo">
              <i className="fab fa-affiliatetheme" />
            </div>
            {/* These 2 divs call the clickedDropdown function on click */}
            <div className="name" onClick={this.clickedDropdown}>
              {`${first_name} ${last_name}`}
            </div>
            <div className="icon" onClick={this.clickedDropdown}>
              <i className="fas fa-chevron-down" />
            </div>
            {/* The dropdown will display based on the dropdown property value in the state */}
            <div className={`dropdown ${this.state.dropdown ? "active" : ""}`}>
              <nav>
                <a href="/account">account</a>
                <a href="/logout">logout</a>
              </nav>
            </div>
          </div>
          <div className="groups">
            <div className="group">
              <div className="title">Title</div>
              <ul>
                <li>
                  <a href="/logout">Logout</a>
                </li>
                <li>Link</li>
                <li>Link</li>
              </ul>
            </div>
          </div>
        </section>
      );
    }
  }
}
