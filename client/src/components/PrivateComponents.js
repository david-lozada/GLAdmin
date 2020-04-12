import React from 'react';
import { Route } from 'react-router-dom'


//Components
import UserComponent from '../pages/User'
import DashboardComponent from '../pages/Dashboard'
import CustomerComponent from '../pages/Customer'
import SupplierComponent from '../pages/Supplier'
import CompanyComponent from '../pages/Company'
import TaxComponent from '../pages/Tax'
import Page404Component from '../pages/Page404'


// TODO: Import all private routes here and add in export object.

const User = () => (
    <Route path="/home/users" component={UserComponent} />
);
const Dashboard = () => (
    <Route path="/home/dashboard" component={DashboardComponent} />
);
const Customer = () => (
    <Route path="/home/customers" component={CustomerComponent} />
);
const Supplier = () => (
    <Route path="/home/suppliers" component={SupplierComponent} />
);
const Company = () => (
    <Route path="/home/companies" component={CompanyComponent} />
);
const Tax = () => (
    <Route path="/home/taxes" component={TaxComponent} />
);
const Page404 = () => (
    <Route component={Page404Component} />
);

export {
  User,
  Dashboard,
  Customer,
  Supplier,
  Company,
  Tax,
  Page404
}