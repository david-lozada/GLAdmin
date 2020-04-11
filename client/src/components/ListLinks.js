import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Dashboard as DashboardIcon, LocalShipping, People as PeopleIcon,
          PeopleOutline as PeopleOutlineIcon, Assignment as AssignmentIcon, 
          Business as BusinessIcon, MonetizationOn as MonetizationOnIcon  } from '@material-ui/icons';


const link = { textDecoration: 'none', color: 'inherit' }

export const mainListItems = (
  <div>
    <Link to="/home/dashboard" style={link}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon color={"primary"}/>
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItem>
    </Link>
    <Link to="/home/suppliers"  color="inherit" style={link}>
      <ListItem button>
        <ListItemIcon>
          <LocalShipping  color={"primary"}/>
        </ListItemIcon>
        <ListItemText primary="Proveedores" />
      </ListItem>
    </Link>
    <Link to="/home/customers"  color="inherit" style={link}>
      <ListItem button>
        <ListItemIcon>
          <PeopleOutlineIcon  color={"primary"}/>
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>
    </Link>
    <Link to="/home/companies"  color="inherit" style={link}>
      <ListItem button>
        <ListItemIcon>
          <BusinessIcon  color={"primary"}/>
        </ListItemIcon>
        <ListItemText primary="Empresas" />
      </ListItem>
    </Link>
    <Link to="/home/users"  color="inherit" style={link}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon  color={"primary"}/>
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>
    </Link>
    <Link to="/home/taxes"  color="inherit" style={link}>
      <ListItem button>
        <ListItemIcon>
          <MonetizationOnIcon  color={"primary"}/>
        </ListItemIcon>
        <ListItemText primary="Impuestos" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Reportes</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon  color={"primary"}/>
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon  color={"primary"}/>
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon  color={"primary"}/>
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
