import { createStyles, makeStyles } from '@mui/styles';

const useStyles =makeStyles((theme)=>
  createStyles({
    root:{
      display:'grid',
      gridTemplateColumns:'repeat(1, 1fr)',
      gap:'40px',
      margin:'15% auto',
      width:'400px',
    },
    text:{
      width:'100%',
    },
    errors:{
      fontSize:'5px',
      backgroundColor:'red',
    }
  }),
);
export default useStyles;
