import React from 'react';
import '../Styled/FoterCSS.css';
import EmailIcon from '@mui/icons-material/Email';
import { 
  Icon,
  Tooltip
} from '@mui/material';

const Footer =(props)=>{
  const prueba =()=>{
    console.log("Mensaje prueba")
  }

  return(
    <div>
      <hr className="linea_horizontal"/>
      <footer className="footer_content">
        <div style={{width:'70%', display:'inline-block'}}>
          <img 
            className="img"
            src={require('../Media/logo.png')} 
            alt="Logo del grupo de trabajo" 
            height="80" 
            width="85"/>
          <p className="title">Code Geek App</p>
        </div>
        <div style={{display:'inline-block', width:'30%', postion:'fixed'}}>
          <Tooltip title="Enviar correo">
          <Icon 
            onClick={prueba}
            style={{
              display:'inline-block',
              margin:'10px',
              marginLeft:'80%',
              cursor:'pointer',
              postion:'fixed',
              }} ><EmailIcon/></Icon>
          </Tooltip>
        </div>
      </footer>
    </div>);
}

export default Footer;
