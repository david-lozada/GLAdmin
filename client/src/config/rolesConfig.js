export default {
//role name as a key.
 master: {
    routes: [
      {
        component: 'Stock', 
        url: '/stocks',
        name: 'Inventario'
      },
      {
        component: 'Customer', 
        url: '/customers',
        name: 'Clientes'
      },
      {
        component: 'Supplier', 
        url: '/suppliers',
        name: 'Proveedores'
      },
      {
        component: 'Product', 
        url: '/products',
        name: 'Productos'
      },
      {
        component: 'Batch', 
        url: '/batches',
        name: 'Lotes'
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
      },
      {
        component: 'User', 
        url: '/users',
        name: 'Usuarios'
      }
    ],
  },
  admin: {
    routes: [
      {
        component: 'Stock', 
        url: '/stocks',
        name: 'Inventario'
      },
      {
        component: 'Customer', 
        url: '/customers',
        name: 'Clientes'
      },
      {
        component: 'Supplier', 
        url: '/suppliers',
        name: 'Proveedores'
      },
      {
        component: 'Product', 
        url: '/products',
        name: 'Productos'
      },
      {
        component: 'Batch', 
        url: '/batches',
        name: 'Lotes'
      },
      {
        component: 'Tax', 
        url: '/taxes',
        name: 'Impuestos'
      },
      {
        component: 'User', 
        url: '/users',
        name: 'Usuarios'
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