import React from "react";
import "../stylesheets/main.scss";
import Navigation from './Navigation';

// app component
export default class App extends React.Component {
  // render
  render() {
    return (
      <div className="wrapper">
        <Navigation />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
