import { createStyles, makeStyles } from '@mui/styles';

const useStyles =makeStyles((theme)=>
  createStyles({
    div:{
      borderRadius: '10px',
      boxShadow: '0px 0px 3px 0px #000 ',
    }
  }),
);
export default useStyles;
