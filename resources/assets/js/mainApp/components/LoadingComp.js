import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class LoadingComp extends Component {
  constructor() {
    super();
    this.state = {
      dropdown: false
    };
  }

  // This component is the element that displays while the app is loading.
  // It will be active until initialData does not have a value of "loading".
  // Any other value in initialData will remove the "active" class from 
  // this component.
  render() {
    return (
      <section
        id="loading-comp"
        className={this.props.initialData == "loading" ? "active" : ""}
      >
        <div className="loading-icon">
          <div className="loadingio-spinner-blocks-os50euiti2s">
            <div className="ldio-8dbtwvzzaxt">
              <div
                style={{ left: "38px", top: "38px", animationDelay: "0s" }}
              />
              <div
                style={{ left: "80px", top: "38px", animationDelay: "0.125s" }}
              />
              <div
                style={{ left: "122px", top: "38px", animationDelay: "0.25s" }}
              />
              <div
                style={{ left: "38px", top: "80px", animationDelay: "0.875s" }}
              />
              <div
                style={{ left: "122px", top: "80px", animationDelay: "0.375s" }}
              />
              <div
                style={{ left: "38px", top: "122px", animationDelay: "0.75s" }}
              />
              <div
                style={{ left: "80px", top: "122px", animationDelay: "0.625s" }}
              />
              <div
                style={{ left: "122px", top: "122px", animationDelay: "0.5s" }}
              />
            </div>
          </div>
        </div>
        <div className="loading-text">Loading!</div>
      </section>
    );
  }
}
