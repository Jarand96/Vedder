import React from "react";
import { imageurl } from "../index"
import ImageIndexDots from "./ImageIndexDots"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//Ta inn en liste med bilder.



export default class imageViewer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      'images': this.props.images,
      'currentIndex': 0
    }
    this.goToNextSlide = this.goToNextSlide.bind(this)
    this.goToPrevSlide = this.goToPrevSlide.bind(this)
  }

  goToPrevSlide(){
    if (this.state.currentIndex === 0){
      this.setState({
        'currentIndex' : this.state.images.length -1
      })
      return
    }
    this.setState({
      'currentIndex' : this.state.currentIndex - 1
    })
  }

  goToNextSlide(){
    if (this.state.currentIndex === this.state.images.length - 1){
      return this.setState({
        'currentIndex' : 0
      })
    }

    this.setState({
      'currentIndex' : this.state.currentIndex + 1
    })
  }
  // render
  render() {
    let image = imageurl +this.state.images[this.state.currentIndex]["filename"]
    return (
      <div className="image_container">
        <img className="post_image" src={image}/>
        {this.state.images.length>1  &&
        <div className="backArrow arrow" onClick={this.goToPrevSlide}>
          <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
        </div>
        }
        {this.state.images.length>1 &&
        <div className="nextArrow arrow" onClick={this.goToNextSlide}>
          <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
        </div>
      }
      {this.state.images.length>1 &&
        <ImageIndexDots
        currentIndex={this.state.currentIndex}
        numberOfImages={this.state.images.length} />
      }
      </div>
    );
  }
}
