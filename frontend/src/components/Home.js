import React from "react";
import Settings from "./Settings"

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <Settings />
        <h4>Hello world!</h4>
      </div>
    );
  }
}
