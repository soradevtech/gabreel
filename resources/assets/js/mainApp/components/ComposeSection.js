import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class ComposeSection extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  // This function will try to post the submitted form data to the declared
  // route, sending the content, user id, and post type
  // This needs to be updated to be more dynamic when time permits
  submitForm = async () => {
    try {
      const post = await axios.post("/api/post", {
        content: this.state.post_content,
        user_id: this.props.initialData.userInfo.id,
        type: "text"
      });

      console.log(post);
    } catch (error) {
      console.log(error); // Catch errors if any occur
    }
  };
  // This is an axios function that updates the state with user input from the
  // target element via the onChange attribute
  handleChange = event => {
    const name = event.target.name;
    const value =
      event.target.type == "checkbox"
        ? event.target.checked
        : event.target.value;

        this.setState({
          [name]: value
        }, () => {
          console.log(this.state)
        })
  };
  render() {
    return (
      <section className="compose-section">
        <textarea
          name="post_content"
          id
          cols={80}
          rows={8}
          defaultValue={""}
          // The value attribute is automatically updated through the state, which is
          // updated by the handleChange function in the onChange attribute in the
          // same element (phew!)
          onChange={this.handleChange} value={this.state.post_content} 
        />
        <div className="user-img" />
        <div className="buttons">
          <div className="button photo-btn">
            <i className="fas fa-camera-retro" />
          </div>
          <div className="button video-btn">
            <i className="fas fa-video" />
          </div>
          {/* This div button calls submitForm() */}
          <div className="button send-btn" onClick={this.submitForm}>
            <i className="fas fa-paper-plane" />
          </div>
        </div>
      </section>
    );
  }
}
