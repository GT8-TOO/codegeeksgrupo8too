import React from 'react';
import AppBar from '../Components/AppBar';
import Slider from '../Components/Sliders';
import { createStyles, makeStyles } from "@mui/styles";
// eslint-disable-next-line
import { createTheme, ThemeProvider } from "@material-ui/core";
import {Button, styled} from '@mui/material';

// eslint-disable-next-line
const useStyles = makeStyles((theme: Theme)=>
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
      height:'630px',
      margin:'4% 15px',
      borderRadius:'30px',
      boxShadow: '0px 0px 10px 1px #434343',
    },
  }),
);
// eslint-disable-next-line
const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#142850',
  display:'inline-block',
  position:'relative',
  width:'20%',
  margin:'10px 20%',
  '&:hover': {
    backgroundColor:'#27496D',
  },
}));

// eslint-disable-next-line
const theme =createTheme();

const Index =()=>{
  const classes = useStyles();
    const images =[{
      id:'1',
      title:'Academica Frontal',
      description:'Academica de frente',
      image:require('../Media/Index/AcademicaFrontal.jpg')
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
       <p 
          style={{
            position:'relative',
            textAlign:"center", 
            color:'#27496D',
            fontSize:"15px",
            fontFamily:"Lucida Handwriting",
            marginTop:"400px",
            }}>Proyecto de ciclo de TOO 115 ciclo 2 - 2021</p>
      </div>
      <Slider images={images} autoplay={true} speed={3000} inicio={true}/>
    </div>
    );
}
export default Index; 
