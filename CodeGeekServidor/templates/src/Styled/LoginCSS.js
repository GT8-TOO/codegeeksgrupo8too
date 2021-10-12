import { createStyles, makeStyles } from '@mui/styles';

const useStyles =makeStyles((theme)=>
  createStyles({
    root:{
      display:'block',
      margin:'20% auto',
      borderRadius:'20px',
      boxShadow: '0px 0px 10px 1px #7b7b7b',
      width:'500px',
    },
    text:{
      position:'absolute',
      width:'300px',
      marginLeft:'100px'

    }
  }),
);
export default useStyles;
