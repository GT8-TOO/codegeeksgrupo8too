import React from "react";
import GoogleMapReact from 'google-map-react';
import PlaceIcon from '@mui/icons-material/Place';
import Tooltip from '@mui/material/Tooltip';

const AnyReactComponent = ({ text }) => <div><Tooltip title={text}><PlaceIcon sx={{ color: '#FC4030',fontSize: 40 }}/></Tooltip></div>;

const Mapa= (props)=>{

  //component di mount
  const defaultProps = {
    center: {
      lat: props.edificio.latitud,
      lng: props.edificio.longitud 
    },
    zoom: 11
  };

  return (
    <div style={{ height: '40vh', width: '100%' }}>
      {props.edificio !== undefined &&
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDnnEwalpH6c1Clka1CpwLQ6gQi1jnTQBw" }}
        defaultCenter={defaultProps.center}
        yesIWantToUseGoogleMapApiInternals
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text={props.text}
        />
      </GoogleMapReact>}
    </div>
  );
}
export default Mapa;
