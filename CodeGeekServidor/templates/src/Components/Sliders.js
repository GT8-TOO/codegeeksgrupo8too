import React, {useState} from "react";
import Slider from 'infinite-react-carousel';
import '../Styled/Sliders.css';

const Sliders = (props)=>{
// eslint-disable-next-line
  const [settings, setSettings]=useState({
    autoplay: props.autoplay,
    arrows: props.arrows, 
    arrowsScroll:1,
    autoplaySpeed:props.speed,
  })

  return(
    <div style={{zIndex:'-1'}}>
      {props.inicio?
        <Slider className="slider" {...settings} >
        {props.images.map(image=>{
          return(
          <div className="div" key={image.id} id={image.id}>
          <img 
            title={image.title}
            className="slider_images" 
            src={image.image}
            height="500"
            alt ={image.description}/>               
      </div>);
        })}
      </Slider>:
      <Slider {...settings}>
        {props.images.map(image=>{
          return(
        <div className="divCatalogo" key={image.cod_imagen} id={image.cod_imagen}>
          <img 
            title={image.titulo}
            className="slider_images_catalogo" 
            src={image.url}
            alt ={image.descripcion}/>               
        </div>);
        })}
      </Slider>}
    </div>
  );
}
export default Sliders;
