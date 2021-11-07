import React from 'react';
import {
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#022D36',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#DBECF3',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TablaHorarios = (props)=>{

  return(
    <Fade in={true}>
      <div>
        <TableContainer component={Paper} style={{marginTop:'60px', width:'100%'}}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <StyledTableCell align="center" colSpan={7}>Horario de {props.local.label}</StyledTableCell>
            <TableRow>
              <StyledTableCell align="right">{props.horario[0].hora}</StyledTableCell>
              <StyledTableCell align="right">{props.horario[0].columna0}</StyledTableCell>
              <StyledTableCell align="right">{props.horario[0].columna1}</StyledTableCell>
              <StyledTableCell align="right">{props.horario[0].columna2}</StyledTableCell>
              <StyledTableCell align="right">{props.horario[0].columna3}</StyledTableCell>
              <StyledTableCell align="right">{props.horario[0].columna4}</StyledTableCell>
              <StyledTableCell align="right">{props.horario[0].columna5}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.cuerpo.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="right">{row[0].columna}</StyledTableCell>
                <StyledTableCell align="right">{row[0].columna0}</StyledTableCell>
                <StyledTableCell align="right">{row[0].columna1}</StyledTableCell>
                <StyledTableCell align="right">{row[0].columna2}</StyledTableCell>
                <StyledTableCell align="right">{row[0].columna3}</StyledTableCell>
                <StyledTableCell align="right">{row[0].columna4}</StyledTableCell>
                <StyledTableCell align="right">{row[0].columna5}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </Fade>
  );
}

export default TablaHorarios;
