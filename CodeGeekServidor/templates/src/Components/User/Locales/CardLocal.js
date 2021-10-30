import React, { useContext} from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';

//Iconos
import PreviewIcon from '@mui/icons-material/Preview';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

//Contexto
import UserContext from '../../../Context/UserContext';

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon sx={{fontSize:18}}/>,
    label: 'Muy desatisfecho',
  },
  2: {
    icon: <SentimentDissatisfiedIcon sx={{fontSize:18}}/>,
    label: 'Insastifecho',
  },
  3: {
    icon: <SentimentSatisfiedIcon sx={{fontSize:18}}/>,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon sx={{fontSize:18}}/>,
    label: 'Sastifecho',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon sx={{fontSize:18}} />,
    label: 'Muy Satisfecho',
  },
};

//image= {require('../../../Media/LaboratoriosImagenes/EdificioB1.jpg')}/>
const CardLocal = (props)=>{
  const userContext = useContext(UserContext);
  
  const mostrarLocal =()=>{
    userContext.setMostrarLocal(true)
    userContext.setCatalogo(props.local);
  }

  return(
    <div>
      <Card style={{width:300}}>
        <CardMedia
          component="img"
          height="140"
          image= {props.local.urlImg}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{props.local.label}</Typography>
          <Typography variant="body2" color="text.secondary">
            {props.local.nombreEdificio} 
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title="Solicitar local">
            <Link to={`/user/${'requestlocal'}`} >
              <IconButton aria-label="solicitar local" onClick={(e)=>{userContext.setCodigoLocal(props.local)}}>
                <PostAddIcon/>
              </IconButton>
              </Link>
          </Tooltip>
          <Tooltip title="Ver informacion del local">
            <IconButton onClick={mostrarLocal} aria-label="ver informacion">
              <PreviewIcon/>
            </IconButton>
          </Tooltip>
          <Typography 
            variant="p" 
            style={{
              color:'#686767',
              marginLeft:'40px',
              fontSize:'15px'}}
          >{customIcons[props.local.calificacion].icon} {customIcons[props.local.calificacion].label}</Typography>
        </CardActions>
      </Card>
    </div>
  );
}

export default CardLocal;
