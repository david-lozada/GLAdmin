import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, withRouter, useHistory } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { CssBaseline, Drawer, AppBar, Toolbar, List, Typography, 
  Divider, IconButton, Badge, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Navegation from '../components/Navegation';
import * as Routes from '../components/PrivateComponents';
import Page404 from './Page404'

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({ 
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    color: '#070707',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: theme.palette.primary.main,
    overflowY: 'hidden',
  },
}));
const Frame = inject("userStore", "authStore", "globalStore", "roleStore")(
  observer(({ match, authStore, userStore, globalStore, roleStore }) => {
  React.useEffect(() => {
    roleStore.getRole()
  }, [roleStore])
  const history = useHistory();
  const classes = useStyles();
  const user = JSON.parse(window.localStorage.getItem('userData'))
  const userNames = user ? user.firstName + " " + user.lastName : ''

  // Drawer initialization
  const [open, setOpen] = React.useState(false);
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
  // Drawer end
  const handleLogout = () => {
    authStore.logout()
    globalStore.setToken(undefined);
    userStore.forgetUser();
    history.push('/')
  }
  return (
    <Router>
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
              {globalStore.module}
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
              <MenuItem onClick={handleLogout}>Salir</MenuItem>
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
          &nbsp;&nbsp;&nbsp;
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              { userNames }
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon color={"secondary"}/>
            </IconButton>
          </div>
          <Divider />
          <List>
            <Navegation routes={roleStore.allowedRoutes} match={match}/>
          </List>
          <Divider />
          {/*<List>{secondaryListItems}</List>*/}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            {
              roleStore.allowedRoutes.map(({component, url}) => (
                <Route
                  key={component}
                  path={`${match.path}${url}`}
                  component={Routes[component]}
                />
              ))
            }
            <Route component={Page404} />
          </Switch>
        </main>
      </div>
    </Router>
  )
})
)
export default withRouter(Frame)