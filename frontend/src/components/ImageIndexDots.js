import React from 'react';

let ImageIndexDots = props => {
const { currentIndex, numberOfImages } = props;
let dots = []
for(var i=0; i<numberOfImages;i++){
  i===currentIndex ?
  dots.push(<div key={i} className="dot activedot"></div>) :
  dots.push(<div key={i} className="dot"></div>)
}
return(
  <div className="dot_container"> 
    {dots}
  </div>)
}

export default ImageIndexDots
