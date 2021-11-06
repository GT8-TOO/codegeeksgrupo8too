import React from 'react';
import '../Styled/FoterCSS.css';
import { 
  Typography
} from '@mui/material';
import Logo from '../Media/logo.png';

const Footer =()=>{
  return(
    <div className="root">
      <hr className="linea_horizontal"/>
      <footer className="footer_content">
        <div>
          <img 
            className="img"
            src={Logo} 
            alt="Logo del grupo de trabajo" 
            height="80" 
            width="85"/>
          <Typography className="title" variant="h4">Code Geek App</Typography>
        </div>
      </footer>
    </div>);
}

export default Footer;
