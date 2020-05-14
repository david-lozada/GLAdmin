import React from 'react';
import { observer, inject } from "mobx-react"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
    backgroundColor: theme.palette.primary.main
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.primary.light,
    },
  },
}))(TableRow);

const CustomTable = inject("stockStore")(
  observer(({ stockStore }) => {
    // React.useEffect(() => {
      const rows = stockStore.record.stockDet
    // }, [])
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size={"small"} aria-label="a dense table">
        <TableHead>
          <StyledTableRow>
            <TableCell color="secondary" align="right">Tipo</TableCell>
            <TableCell color="secondary" align="right">Unidades</TableCell>
            <TableCell color="secondary" align="right">Caducidad</TableCell>
            <TableCell color="secondary" align="right">Observación</TableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow key={row.quantity+i}>
              <TableCell align="right">{(row.type === 1) ? 'Entrada' : 'Salida'}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.expiryDate}</TableCell>
              <TableCell align="right">{row.observation}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
})
)

export default CustomTable