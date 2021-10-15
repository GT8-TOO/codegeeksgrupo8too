import React, { useEffect } from 'react';
import { createStyles, makeStyles } from "@mui/styles";
import {
  Button,
  Box
} from '@mui/material';

//Components
import Slider from '../Components/Sliders';
import AppBar from '../Components/AppBar';
import Footer from '../Components/Footer';

// eslint-disable-next-line
const useStyles = makeStyles((theme)=>
  createStyles({
    text :{
      display:'block',
      textAlign:'justify',
      width:'89%',
      margin:'8% 5%',
      position:'relative',
      fontSize:'24px',
      fontFamily:'Monaco'
    },
    div:{
      display:'inline-block',
      position:'absolute',
      width:'40%',
      zIndex:'10',
      margin:'3% 5%',
      borderRadius:'30px',
      boxShadow: '0px 0px 10px 1px #434343',
    },
    button:{
      display: 'block',
      position:'absolute',
      width:'30%',
    },
  }),
);

const Index =()=>{
  const classes = useStyles();
    const images =[{
      id:'1',
      title:'Academica Frontal',
      description:'Academica de frente',
      image:'../Media/Index/AcademicaFrontal.jpg'
      },{
      id:'2',
      title:'Academica Lateral',
      description:'Academica de lado izquierdo',
      image:require('../Media/Index/AcademicaLateral.jpg')
    } ,{
      id:'3',
      title:'Edificio B',
      description:'Edificio B de frente',
      image:require('../Media/Index/EdificioB.jpg')
    },{
      id:'4',
      title:'Academica atardecer',
      description:'Academica de atardecer',
      image:require('../Media/Index/AcademicaAtardecer.jpeg')
    }
    ]
  useEffect (()=>{
    document.title="Gestion de laboratorios";
  },[])

  return (
    <div>
      <AppBar logeado={false}/>
      <div className={classes.div}>
        <p className={classes.text}>
          Vision
          <br/>
          <br/>
          Generar un sistema capaz de poder llevar a cabo el mantenimiento de los horarios de laboratorios
        </p>
        <Box textAlign='center'>
        <Button 
          className={classes.button} 
          variant="outlined" 
          href="/login"
          color="inherit">Iniciar Sesion</Button>
        <br/>
        <br/>
        <Button 
          className={classes.button} 
          variant="outlined" 
          href="/register"
          color="inherit">Registrarse</Button>
          </Box>
       <p 
          style={{
            position:'relative',
            textAlign:"center", 
            color:'#27496D',
            fontSize:"15px",
            fontFamily:"Lucida Handwriting",
            }}>Proyecto de ciclo de TOO 115 ciclo 2 - 2021</p>
      </div>
      <Slider 
        images={images} 
        autoplay={true} 
        speed={3000} 
        inicio={true} 
        arrows={false}/>
      <Footer/>
    </div>
    );
}
export default Index; 
