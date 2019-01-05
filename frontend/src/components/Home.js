import React from "react";
import Settings from "./Settings"

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <Settings />
      </div>
    );
  }
}
