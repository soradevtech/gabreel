import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class LeftMenu extends Component {
  constructor() {
    super();
    this.state = {
      dropdown: false
    };
  }
  clickedDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  };
  render() {
    if (this.props.initialData.userInfo == undefined) {
      return <div>Loading</div>;
    } else {
      const {first_name, last_name} = this.props.initialData.userInfo
      return (
        <section id="left-menu">
          <div className="account-dropdown">
            <div className="logo">
              <i className="fab fa-affiliatetheme" />
            </div>
            <div className="name" onClick={this.clickedDropdown}>
              {`${first_name} ${last_name}`}
            </div>
            <div className="icon" onClick={this.clickedDropdown}>
              <i className="fas fa-chevron-down" />
            </div>
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
