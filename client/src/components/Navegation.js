import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import { Dashboard as DashboardIcon, LocalShipping, People as PeopleIcon,
          PeopleOutline as PeopleOutlineIcon,/* Assignment as AssignmentIcon, */
          Business as BusinessIcon, MonetizationOn as MonetizationOnIcon,
          ListAlt as ListAltIcon  } from '@material-ui/icons';

const link = { textDecoration: 'none', color: 'inherit' }
const Navegation = ({routes, match}) => (
  <div>
    {routes.map((route) => (
      <Link to={`${match.path}${route.url}`} style={link} key={route.url}>
        <ListItem button>
          <ListItemIcon>
          {
            {
              'User': <PeopleIcon color={"primary"}/>,
              'Dashboard': <DashboardIcon color={"primary"}/>,
              'Customer': <PeopleOutlineIcon color={"primary"}/>,
              'Supplier': <LocalShipping color={"primary"}/>,
              'Company': <BusinessIcon color={"primary"}/>,
              'Stock': <ListAltIcon color={"primary"}/>,
              'Tax': <MonetizationOnIcon color={"primary"}/>
            }[route.component]
          }
          </ListItemIcon>
          <ListItemText primary={route.name} />
        </ListItem>
      </Link>
    ))}
  </div>
);

export default Navegation