import React, {useState} from "react";
import Slider from 'infinite-react-carousel';
import '../Styles/Sliders.css';

const Sliders = (props)=>{
// eslint-disable-next-line
  const [settings, setSettings]=useState({
    autoplay: props.autoplay,
    arrows: false, 
    arrowsScroll:1,
    autoplaySpeed:props.speed
  })

  return(
    <div>
      <Slider {...settings}>
        {props.images.map(image=><div className="div" key={image.id} >
          {props.inicio ?
            // eslint-disable-next-line
            <img 
              className="slider_images" 
              src={image.image}
              alt ={image.description}/> :              
            <p>Hola mundo</p>}
      </div>)}
      </Slider>
    </div>
  );
}
export default Sliders;
