import { createStyles, makeStyles } from '@mui/styles';

const useStyles =makeStyles((theme)=>
  createStyles({
    root:{
      display:'grid',
      gridTemplateColumns:'repeat(1, 1fr)',
      gap:'30px',
      margin:'6% auto',
      width:'400px',
    },
    text:{
      width:'100%',
    },
    errors:{
      display:'flex',
      position:'relative',
      fontSize:'12px',
      textIndent:'18px',
      color: '#ff0000',
    },
    avatar:{
      height:'12px',
      margin:'-10px auto',
    },
    mensaje:{
      margin:'-40px auto',
      textAlign:'center',
    },
    button:{
      backgroundColor:'#01818A'
    },
  }),
);
export default useStyles;
