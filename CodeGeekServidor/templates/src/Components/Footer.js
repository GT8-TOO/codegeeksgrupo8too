import React from 'react';
import '../Styled/FoterCSS.css';
import EmailIcon from '@mui/icons-material/Email';
import { 
  Icon,
  Tooltip
} from '@mui/material';

const Footer =(props)=>{

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
        <div style={{display:'inline-block', width:'30%', postion:'relative'}}>
          <Tooltip title="Enviar correo">
          <Icon 
            style={{
              display:'inline-block',
              margin :'14px 85%',
              cursor:'pointer',
              postion:'absolute',
              }} ><EmailIcon/></Icon>
          </Tooltip>
        </div>
      </footer>
    </div>);
}

export default Footer;
