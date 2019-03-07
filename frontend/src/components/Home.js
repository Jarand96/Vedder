import React from "react";
import Settings from "../containers/Settings"
import NewPostContainer from "../containers/NewPostContainer"
import Posts from "./Posts"

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <NewPostContainer />
        <Posts />
      </div>
    );
  }
}
