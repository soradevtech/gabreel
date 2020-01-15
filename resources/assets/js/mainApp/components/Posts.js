import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Posts extends Component {
  constructor() {
    super();
    this.state = {
      name: "Joe"
    };
  }
  clickedBtn = () => {
    console.log("swag");
  };
  showLatestPosts = () => {
    if (this.props.initialData.latestPosts != undefined) {
      return this.props.initialData.latestPosts.map((item, index) => {
        let user = item.users
        let post = item.posts
        return (
          <div className="update-container" key={index}>
            <div className="author-info">
              <a
                href="#"
                className="user-img"
                style={{
                  backgroundImage: `url('${user.profile_img}')`
                }}
              />
              <div className="info">
                <a href="#/profile">{`${user.first_name} ${user.last_name}`}</a>
                shared a
                <a href="#">{post.type == "text" ? "story" : "image"}</a>
              </div>
            </div>
            <div className="media">
              <div
                className={`${post.type == "text" ? "story" : "image"}`}
                style={{
                  background: 'url("/resources/inspiration.jpg")',
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover"
                }}
              />
            </div>
            <div className="padding-container">
              <div className="grey-container">
                <div className="update-info">
                  <h3>How to become a developer?</h3>
                  <p>{post.content}</p>
                </div>
                <div className="update-stats">
                  <div className="icon-section">
                    <div className="like-circle">
                      <i className="fas fa-thumbs-up" />
                    </div>
                  </div>
                  <div className="other-users">
                    Sarah Russel and 23 others liked update
                  </div>
                  <div className="comments-stats">4 Comments</div>
                </div>
                <div className="compose-comment">
                  <textarea name id cols={80} rows={8} defaultValue={""} />
                  <div className="buttons">
                    <div className="repost-btn">
                      <i className="fas fa-redo" />
                    </div>
                    <div className="like-btn">
                      <i className="fas fa-thumbs-up" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  render() {
    return <section id="posts">{this.showLatestPosts()}</section>;
  }
}
