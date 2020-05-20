import React from 'react';
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, AppBar, Tabs, Tab, Typography, Box, Divider } from '@material-ui/core'

//Components
import ForeignExchange from '../components/Settings/ForeignExchange';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    backgroundColor: '#2b2727',
    color: '#fff',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  typography: {
    color: '#fff',
  },
  fixedHeight: {
    height: 240,
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
  },
  tabPanel: {
    backgroundColor: theme.palette.primary.dark,
    height: theme.spacing(58)
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const Settings = inject("globalStore")(
  observer(({ globalStore }) => {
    const [option, setOption] = React.useState(0);
    const handleSettingOptionChange = (event, newValue) => {
      setOption(newValue);
    };
    globalStore.setModule('Configuraciones')
  	const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.container}>
          <AppBar position="static" className={classes.appBar}>
            <Tabs
              value={option}
              onChange={handleSettingOptionChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Divisas" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
              <Tab label="Item Four" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={option} index={0} className={classes.tabPanel}>
            <Typography color={"primary"} component={'p'} variant={'subtitle2'}>Actualizar valor del dólar</Typography>
            <Divider color={"primary"}></Divider>
            <ForeignExchange/>
          </TabPanel>
          <TabPanel value={option} index={1} className={classes.tabPanel}>
            Item Two
          </TabPanel>
          <TabPanel value={option} index={2} className={classes.tabPanel}>
            Item Three
          </TabPanel>
          <TabPanel value={option} index={3} className={classes.tabPanel}>
            Item Four
          </TabPanel>
        </Container>
    )
})
)

export default withRouter(Settings)
