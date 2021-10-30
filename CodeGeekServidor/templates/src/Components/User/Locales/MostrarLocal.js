import React, { useState,forwardRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  Autocomplete,
  Rating,
  Slide,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';

//Components
import Slider from '../../Sliders';

//Style
import errorStyle from '../../../Styled/ErorCSS';

//Icons
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

//Context
import UserContext from '../../../Context/UserContext';

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Muy desatisfecho',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Insastifecho',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Sastifecho',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Muy Satisfecho',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MostrarLocal = (props)=>{
  const errorClass =errorStyle();
  const userContext = useContext(UserContext);
  const [calificacion,setCalificacion]=useState();
  const images =[{
    id:'1',
    title:'Academica Frontal',
    description:'Academica de frente',
    image:require('../../../Media/Index/AcademicaFrontal.jpg')
    },{
    id:'2',
    title:'Academica Lateral',
    description:'Academica de lado izquierdo',
    image:require('../../../Media/Index/AcademicaLateral.jpg')
    } ,{
    id:'3',
    title:'Edificio B',
    description:'Edificio B de frente',
    image:require('../../../Media/Index/EdificioB.jpg')
    },{
    id:'4',
    title:'Academica atardecer',
    description:'Academica de atardecer',
    image:require('../../../Media/Index/AcademicaAtardecer.jpeg')
    }
  ]

  //Component dimount
  useEffect(()=>{
    setCalificacion(2)
    console.log(userContext.catalogoLocal);
    userContext.setRespuesta({
		message:"",
      state:false,
      type:""
    })
 
  },[])

  //Cierra la ventana flotante
  const handleClose = () => {
    userContext.setMostrarLocal(false);
    userContext.setCatalogo(undefined);
  };

  //Renderizado de HTML
  return(
    <div>
      <Dialog TransitionComponent={Transition} open={userContext.openLocal} fullWidth={true} width="xl" onClose={handleClose}>
        <DialogTitle>Informacion del local {userContext.catalogoLocal.label}</DialogTitle>
        <DialogContent style={{marginLeft:'15px'}}>
          <div style={{display:'felx'}}>
          <Slider 
            inicio={false} 
            autoplay={false} 
            arrows={true}
            images={images}/>
              <p>Hola mundo</p>
            </div>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined" 
            onClick={handleClose}>Cerrar</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}
export default MostrarLocal;
