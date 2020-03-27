// Dependencies
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core'
//Store
// Components
import Login from './Login'

const useStyles = makeStyles(theme => ({
}));

const Welcome = () => {
  const classes = useStyles()
  console.log(classes.wHeadline)
  return (
    <div className="w-background">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item md={8} lg={8} className="w-headline">
            ADMINISTRATIVE
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper style={{ height: 480 }}>
                  <Login />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default Welcome