// Dependencies
import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography } from '@material-ui/core'

// Components
// import useEventListener from '../components/useEventListener'
import Form from '../components/Stock/Form'
import Orders from '../components/Orders'


const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: theme.spacing(35),
  },
  fixedHeight: {
    height: 240,
  },
}));

const Stock = inject("stockStore", "globalStore")(
  observer(({ stockStore, globalStore }) => {
    React.useEffect(() => {
      stockStore.getAllRecords()
    }, [stockStore])
    globalStore.setModule('Inventario')
  	const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    // Get all users
   /* const NEW_KEYS = ['112', 'F1'];
    function handler({ key }) {
      if (NEW_KEYS.includes(String(key))) {
        globalStore.setIsUpdateSlide(false)
        globalStore.swipeOutForm('Agregar ' + globalStore.module, 'create')
        stockStore.reset()
      }
    }
    useEventListener('keydown', handler);*/

    return (
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/*<Deposits />*/}
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Form/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          {/*<Grid container spacing={1}> 
                      <Grid item xs={1}> 
                      </Grid>
                      <Grid item xs={10}> 
                        <Paper className={classes.paper} variant={"outlined"}>
                          <Typography component="h2" variant="h6" gutterBottom>
                            Producto
                          </Typography>
                          <Form/>
                        </Paper>
                      </Grid>
                    </Grid>*/}
      </Container>
    )
})
)

export default withRouter(Stock)