import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CardLocal = (props)=>{
  return(
    <div>
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{props.local.nombre_local}</Typography>
          <Typography variant="body2" color="text.secondary">
            {props.local.descripcion} 
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Ver local</Button>
          <Button size="small">Realizar reserva</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default CardLocal;
