import React from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Route, Switch, withRouter, useHistory } from 'react-router-dom'
import useStyles from '../useStyles'
import { observer, inject } from "mobx-react"
import { CssBaseline, Drawer, AppBar, Toolbar, List, Typography, 
  Divider, IconButton, Badge, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { mainListItems, secondaryListItems } from '../components/ListLinks';
// Components
import Dashboard from './Dashboard'

/*function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}*/


const Frame = inject("userStore", "authStore", "globalStore")(
  observer(({ authStore, userStore, globalStore }) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  }
  const handleLogout = () => {
    authStore.logout()
    globalStore.setToken(undefined);
    userStore.forgetUser();
    history.replace('/')
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/*<MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>*/}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            { /*userStore.getCurrentUser*/ }
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Router>
          <Switch>
            <Route path="/home" component={Dashboard} />
            {/*<Route path="/users" component={User} />*/}
          </Switch>
        </Router>
      </main>
    </div>
  )
})
)
export default withRouter(Frame)