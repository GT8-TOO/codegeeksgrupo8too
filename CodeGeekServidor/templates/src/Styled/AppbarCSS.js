import { createStyles, makeStyles } from '@mui/styles';

// eslint-disable-next-line
const useStyles = makeStyles((theme) =>
  createStyles({
    text: {
      display:'inline-block',
      position:'relative',
      letterSpacing:'2px',
      margin:'5px auto',
      lineHeight:'9'
    },
    img:{
      display:'inline-block',
      position:'absolute',
      top:'-3px',
      marginLeft:'20px',
     // border: '15px solid',
    },
    divInicio:{
      display:'block', 
      position:'absolute', 
      marginLeft:'86%',
    }
  }),
);

export default useStyles;
