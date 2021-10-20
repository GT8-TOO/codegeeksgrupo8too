import { createStyles, makeStyles } from '@mui/styles';

const useStyles =makeStyles((theme)=>
  createStyles({
     errors:{
      display:'flex',
      position:'relative',
      fontSize:'12px',
      textIndent:'18px',
      color: '#ff0000',
    },
    errors2:{
      display:'flex',
      position:'relative',
      fontSize:'12px',
      color: '#ff0000',
    },
    text:{
      width:'100%'
    }
  }),
);
export default useStyles;
