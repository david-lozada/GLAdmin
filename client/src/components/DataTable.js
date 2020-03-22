import React, { useState } from 'react';
import MaterialTable from "material-table";
import { observer, inject } from "mobx-react"

const DataTable = inject("globalStore")(
  observer(({ globalStore }) => {
  const [state, setState] = useState({
    columns: [
      { title: "Nombre", field: "firstName" },
      { title: "Apellido", field: "lastName" },
      { title: "Correo", field: "email" },
      {
        title: "Rol",
        field: "idRole",
        lookup: { 1: "Master", 2: "Administrador", 3: "Empleado" }
      }
    ],
    data: [
      { firstName: "David", lastName: "Lozada", email: "david@gmail.com", idRole: 1 },
      { firstName: "Laura", lastName: "Lopez", email: "laura@gmail.com", idRole: 2 }
    ],
  });

  return (
    <MaterialTable
      title={globalStore.module}
      columns={state.columns}
      data={state.data}
      options={{
        pageSizeOptions : [5],
        headerStyle: {
          backgroundColor: "#7b8589",
          color: '#FFF'
        }
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
})
)
export default DataTable;


