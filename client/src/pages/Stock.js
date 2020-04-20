// Dependencies
import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, ButtonBase } from '@material-ui/core'

// Components
// import useEventListener from '../components/useEventListener'
import Form from '../components/Stock/Form'
import DataTable from '../components/Stock/Datatable';


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
  image: {
    width: '100%',
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }
}));

const Stock = inject("stockStore", "globalStore", "supplierStore", "taxStore")(
  observer(({ stockStore, globalStore, supplierStore, taxStore }) => {
    React.useEffect(() => {
      stockStore.getAllRecords()
      supplierStore.getAllRecords()
      taxStore.getAllRecords()
      stockStore.reset()
    }, [stockStore, supplierStore, taxStore])
    globalStore.setModule('Inventario')
  	const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    // Get all users
   /* const NEW_KEYS = ['112', 'F1'];
    function handler({ key }) {
      if (NEW_KEYS.includes(String(key))) {
      }
    }
    useEventListener('keydown', handler);*/
    var imagePreview
    if (stockStore.record.image) {
      if (typeof stockStore.record.image === 'string') {
        const image = JSON.parse(stockStore.record.image)
        imagePreview = <img className={classes.img} 
          alt={image.name} 
          src={image.base64}
          />
      } else {
        imagePreview = <img className={classes.img} 
          alt={stockStore.record.image.name} 
          src={stockStore.record.image.base64}
          />
      }
    } else {
      imagePreview = <img className={classes.img} 
        alt={"default"}
        src={ process.env.PUBLIC_URL + '/assets/images/no-image.png' }
        />
    }
    return (
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Deposits */}
            <Grid item xs={12} md={3} lg={2}>
              <Paper className={fixedHeightPaper}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                  { imagePreview }
                  </ButtonBase>
                </Grid>
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={9} lg={10}>
              <Paper className={fixedHeightPaper}>
                <Form/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <DataTable store={"stockStore"}/>
            </Grid>
          </Grid>
      </Container>
    )
})
)

export default withRouter(Stock)