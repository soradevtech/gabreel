"use strict";

// Simple controller for the home and welcome pages. User is redirected to the welcome page
// from the home page if they do not pass authorization.
class PageController {
  async home({ response, request, view, auth }) {
    if (auth.user) {
      return view.render("pages/react");
    }
    return view.render("pages/welcome");
  }
  async welcome({ response, request, view }) {
    return view.render("pages/welcome");
  }
}

module.exports = PageController;
