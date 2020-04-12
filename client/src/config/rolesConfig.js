export default {
//role name as a key.
 master: {
    routes: [
      {
        component: 'User', 
        url: '/users',
        name: 'Usuarios'
      },
      {
        component: 'Supplier', 
        url: '/suppliers',
        name: 'Proveedores'
      },
      {
        component: 'Customer', 
        url: '/customers',
        name: 'Clientes'
      },
      {
        component: 'Tax', 
        url: '/taxes',
        name: 'Impuestos'
      },
      {
        component: 'Company', 
        url: '/companies',
        name: 'Empresas'
      }
    ],
  },
  admin: {
    routes: [
      {
        component: 'User', 
        url: '/users',
        name: 'Usuarios'
      },
      {
        component: 'Supplier', 
        url: '/suppliers',
        name: 'Proveedores'
      },
      {
        component: 'Customer', 
        url: '/customers',
        name: 'Clientes'
      },
      {
        component: 'Tax', 
        url: '/taxes',
        name: 'Impuestos'
      }
    ],
  },
  employee: {
    routes: [
      {
        component: 'Supplier', 
        url: '/suppliers',
        name: 'Proveedores'
      },
      {
        component: 'Customer', 
        url: '/customers',
        name: 'Clientes'
      }
    ],
  },
  common: {
    routes: [
      {
        component: 'Dashboard',
        url: '/dashboard',
        name: 'Inicio'
      }
    ]
  }
}