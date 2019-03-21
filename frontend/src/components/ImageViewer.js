import React from "react";
import { imageurl } from "../index"

//Ta inn en liste med bilder.



export default class imageViewer extends React.Component {
  constructor(props){
    super(props);
  }
  // render
  render() {
    return (
      <div className="imageContainer">
        {this.props.images.map((image, index) => {
          return(
            <img key={index} className="post_image" src={imageurl + image["filename"]}/>
          )
        })}
      </div>
    );
  }
}
