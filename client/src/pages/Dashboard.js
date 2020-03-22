import React from 'react';
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Orders from '../components/Orders';
import { Container, Grid, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = inject("globalStore")(
  observer(({ globalStore }) => {
    globalStore.module = 'Dashboard'
  	const classes = useStyles();
  	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                {/*<Chart />*/}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          {/*<Box pt={4}>
                      <Copyright />
                    </Box>*/}
        </Container>
    )
})
)

export default withRouter(Dashboard)
