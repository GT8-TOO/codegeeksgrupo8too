import { createStyles, makeStyles } from '@mui/styles';

// eslint-disable-next-line
const useStyles = makeStyles((theme) =>
  createStyles({
    button:{
      borderRadius:'20px',
      '&:hover':{
        backgroundColor:'#ddedf4',
      }
    },
    drawer:{
      backgroundColor:'red',
    },
  }),
);

export default useStyles;
