import React, { forwardRef } from 'react';
import MaterialTable from "material-table";
import { observer, inject } from "mobx-react"
import { makeStyles } from '@material-ui/core/styles';
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline,
        Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } 
        from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  tableColor: {
  	backgroundColor: theme.palette.primary.darker
  },
}));
const DataTable = inject("userStore", "globalStore")(
  observer(({ store, userStore, globalStore }) => {
  switch(store){
    case 'userStore':
      var Store = userStore
      break
    default:
      return null
  }
  const classes = useStyles();
	const tableIcons = {
	    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
	};
    return (
        <MaterialTable
            className={classes.tableColor}
            icons={tableIcons}
            title={globalStore.module}
            columns={Store.columns}
            data={Store.records}
            options={{
              pageSizeOptions : [6],
              headerStyle: {
              },
              rowStyle: {
  	          }
            }}
            actions={[
              {
                icon: 'add',
                tooltip: 'Agregar Usuario',
                isFreeAction: true,
                onClick: (event) => {
                  globalStore.swipeForm('Agregar Usuario', 'create')
                }
              },
              {
		        icon: 'edit',
		        tooltip: 'Editar Usuario',
		        onClick: (event, rowData) => {
                /**
                 *  TODO: Fix Slide closing on edit seconds
                */
                globalStore.swipeForm('Actualizar Usuario', 'update')
                Store.getUser(rowData.id)
            }
		      },
		      {
		        icon: 'delete',
		        tooltip: 'Eliminar Usuario',
		        onClick: (event, rowData) => alert("You want to delete " + rowData.name)
		      }
            ]}
          />
    )
})
)

export default DataTable;
