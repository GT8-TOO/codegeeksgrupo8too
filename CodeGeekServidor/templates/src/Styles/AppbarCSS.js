import { createStyles, makeStyles } from '@mui/styles';
// eslint-disable-next-line
import { createTheme, ThemeProvider } from '@mui/material/styles';

// eslint-disable-next-line
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      display:'inline-block',
      position:'relative',
      fontStyle:'italic',
      fontSize:'45px',
      top:'-3px',
      marginLeft:'52%',
      letterSpacing:'7px',
      lineHeight:'9'
    },
    img:{
      display:'inline-block',
      position:'absolute',
      top:'-3px',
      marginLeft:'20px',
     // border: '15px solid',
    },
    button:{
      display:'block',
      position:'relative',
      top:'15px',
      right:'10%',
      width:'100%',
      '&:hover': {
        backgroundColor:'#27496D',
      },
    },
    divInicio:{
      display:'block', 
      position:'absolute', 
      marginLeft:'86%',
    }
  }),
);

// eslint-disable-next-line
const theme = createTheme();

export default useStyles;
