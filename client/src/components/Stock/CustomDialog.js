import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from "mobx-react"
import { Grid, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Slide, Typography, Divider } from '@material-ui/core'
//Components
import DetailDataTable from './StockDetailTable';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    // height: theme.spacing(28),
  },
  whiteText: {
    color: '#fff'
  }
}));

const CustomDialog = inject("stockStore")(
  observer(({ stockStore }) => {
    const classes = useStyles();
    const handleClose = () => {
      stockStore.setDialogOpen(false);
    };
    return (
        <Dialog
          classes={{
            paper: classes.paper
          }}
          fullWidth
          maxWidth={"md"}
          TransitionComponent={Transition}
          open={stockStore.dialogOpen}
          onClose={handleClose}
          aria-labelledby={"max-width-dialog-title"}
        >
          <DialogTitle id="max-width-dialog-title">{ (stockStore.record.product) ? stockStore.record.product.name : null }</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="secondary" gutterBottom>
                    Código del producto
                  </Typography>
                  <Typography className={classes.whiteText} variant={"body1"} gutterBottom>
                    { (stockStore.record.product) ? stockStore.record.product.code : null }
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="secondary" gutterBottom>
                    Nombre del producto
                  </Typography>
                  <Typography className={classes.whiteText} variant={"body1"} gutterBottom>
                    { (stockStore.record.product) ? stockStore.record.product.name : null }
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="secondary" gutterBottom>
                    Proveedor
                  </Typography>
                  <Typography className={classes.whiteText} variant={"body1"} gutterBottom>
                    {(stockStore.record.supplier) ? `${stockStore.record.supplier.firstName} ${stockStore.record.supplier.lastName}`  : null}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="secondary" gutterBottom>
                    Lote
                  </Typography>
                  <Typography className={classes.whiteText} variant={"body1"} gutterBottom>
                    {(stockStore.record.batch) ? stockStore.record.batch.code : null}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="secondary" gutterBottom>
                    En Existencia
                  </Typography>
                  <Typography className={classes.whiteText} variant={"body1"} gutterBottom>
                    { (stockStore.record.existence) ? stockStore.record.existence : null }
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Divider />
              <Grid container item xs={12} spacing={3}>
                <DetailDataTable/>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color={"secondary"}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      );
  })
)

export default CustomDialog;