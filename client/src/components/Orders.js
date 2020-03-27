import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  textCyan: {
    color: theme.palette.secondary.main
  },
  textWhite: {
    color: '#fff'
  },
  textGrey: {
    color: theme.palette.primary.light
  }
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title className={classes.textGrey}>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.textCyan}>Date</TableCell>
            <TableCell className={classes.textCyan}>Name</TableCell>
            <TableCell className={classes.textCyan}>Ship To</TableCell>
            <TableCell className={classes.textCyan}>Payment Method</TableCell>
            <TableCell className={classes.textCyan} align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell className={classes.textWhite}>{row.date}</TableCell>
              <TableCell className={classes.textWhite}>{row.name}</TableCell>
              <TableCell className={classes.textWhite}>{row.shipTo}</TableCell>
              <TableCell className={classes.textWhite}>{row.paymentMethod}</TableCell>
              <TableCell className={classes.textWhite} align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link className={classes.textGrey} href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
