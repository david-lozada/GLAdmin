import React from 'react';
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
// import ListSubheader from '@material-ui/core/ListSubheader';
import { Dashboard as DashboardIcon, LocalShipping, People as PeopleIcon,
          PeopleOutline as PeopleOutlineIcon,/* Assignment as AssignmentIcon, */
          Business as BusinessIcon, MonetizationOn as MonetizationOnIcon,
          ListAlt as ListAltIcon, Fastfood as FastfoodIcon, 
          LocalOffer as LocalOfferIcon, Settings as SettingsIcon  } from '@material-ui/icons';

const link = { textDecoration: 'none', color: 'inherit' }
const Navegation = ({routes, match}) => (
  <div>
    {routes.map((route) => (
      <Link to={`${match.path}${route.url}`} style={link} key={route.url}>
        <ListItem button>
          <ListItemIcon>
          {
            {
              'User': <Tooltip title={'Usuarios'} placement={"right"}><PeopleIcon color={"primary"}/></Tooltip>,
              'Dashboard': <Tooltip title={'Inicio'} placement={"right"}><DashboardIcon color={"primary"}/></Tooltip>,
              'Customer': <Tooltip title={'Clientes'} placement={"right"}><PeopleOutlineIcon color={"primary"}/></Tooltip>,
              'Supplier': <Tooltip title={'Proveedores'} placement={"right"}><LocalShipping color={"primary"}/></Tooltip>,
              'Company': <Tooltip title={'Empresa'} placement={"right"}><BusinessIcon color={"primary"}/></Tooltip>,
              'Stock': <Tooltip title={'Inventario'} placement={"right"}><ListAltIcon color={"primary"}/></Tooltip>,
              'Tax': <Tooltip title={'Impuestos'} placement={"right"}><MonetizationOnIcon color={"primary"}/></Tooltip>,
              'Batch': <Tooltip title={'Lotes'} placement={"right"}><LocalOfferIcon color={"primary"}/></Tooltip>,
              'Product': <Tooltip title={'Productos'} placement={"right"}><FastfoodIcon color={"primary"}/></Tooltip>,
              'Settings': <Tooltip title={'Configuraciones'} placement={"right"}><SettingsIcon color={"primary"}/></Tooltip>
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