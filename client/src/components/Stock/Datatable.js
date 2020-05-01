import React, { forwardRef } from 'react';
import MaterialTable from "material-table";
import { observer, inject } from "mobx-react"
import alertify from "alertifyjs";
import theme from '../../Theme';
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline,
        Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn, Visibility } 
        from '@material-ui/icons';

const DataTable = inject("userStore", "customerStore", "globalStore", 
                            "supplierStore", "companyStore", "taxStore", "stockStore")(
  observer(({ store, userStore, customerStore, globalStore, supplierStore, 
                companyStore, taxStore, stockStore }) => {
  var Store
  switch(store){
    case 'userStore':
      Store = userStore
      break
    case 'customerStore':
      Store = customerStore
      break
    case 'supplierStore':
      Store = supplierStore
      break
    case 'companyStore':
      Store = companyStore
      break
    case 'taxStore':
      Store = taxStore
      break
    case 'stockStore':
        Store = stockStore
        break
    default:
      return null
  }
	const tableIcons = {
	    Add: forwardRef((props, ref) => <AddBox color={"secondary"} {...props} ref={ref} />),
	    Check: forwardRef((props, ref) => <Check color={"primary"} {...props} ref={ref} />),
	    Clear: forwardRef((props, ref) => <Clear color={"secondary"} {...props} ref={ref} />),
	    Delete: forwardRef((props, ref) => <DeleteOutline color={"primary"} {...props} ref={ref} />),
	    DetailPanel: forwardRef((props, ref) => <ChevronRight color={"secondary"} {...props} ref={ref} />),
	    Edit: forwardRef((props, ref) => <Edit color={"primary"} {...props} ref={ref} />),
	    Export: forwardRef((props, ref) => <SaveAlt color={"secondary"} {...props} ref={ref} />),
	    Filter: forwardRef((props, ref) => <FilterList color={"secondary"} {...props} ref={ref} />),
	    FirstPage: forwardRef((props, ref) => <FirstPage color={"secondary"} {...props} ref={ref} />),
	    LastPage: forwardRef((props, ref) => <LastPage color={"secondary"} {...props} ref={ref} />),
	    NextPage: forwardRef((props, ref) => <ChevronRight color={"secondary"} {...props} ref={ref} />),
	    PreviousPage: forwardRef((props, ref) => <ChevronLeft color={"secondary"} {...props} ref={ref} />),
	    ResetSearch: forwardRef((props, ref) => <Clear color={"secondary"} {...props} ref={ref} />),
	    Search: forwardRef((props, ref) => <Search color={"secondary"} {...props} ref={ref} />),
	    SortArrow: forwardRef((props, ref) => <ArrowDownward color={"secondary"} {...props} ref={ref} />),
	    ThirdStateCheck: forwardRef((props, ref) => <Remove color={"secondary"} {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn color={"secondary"} {...props} ref={ref} />),
	    Visibility: forwardRef((props, ref) => <Visibility color={"primary"} {...props} ref={ref} />)
	};
    return (
        <MaterialTable
            style={{ backgroundColor: theme.palette.primary.dark, color: '#fff', padding: '0 2% 0 2%'}}
            icons={tableIcons}
            title={globalStore.module}
            columns={Store.columns}
            data={Store.fullRecords}
            isLoading={Store.loading}
            options={{
              maxBodyHeight: 270,
              filtering: true,
              filterCellStyle: {
                color: '#fff',
              },
              minBodyHeight: 90,
              pageSize: 5,
              padding: 'dense',
              pageSizeOptions : [5],
              headerStyle: {
                backgroundColor: theme.palette.primary.dark, 
                color: theme.palette.secondary.main,
                fontWeight: 'bold',
              },
              searchFieldStyle: {
                color: theme.palette.primary.light
              },
              rowStyle: {
                borderColor: theme.palette.primary.main
              },
              exportButton: true,
              exportAllData: true,
              exportFileName: 'Usuarios'
            }}
            localization={{
              pagination: {
                labelRowsPerPage: 'Filas por página',
                labelDisplayedRows: '{from}-{to} de {count}',
                firstAriaLabel: 'Primera Página',
                firstTooltip: 'Primera Página',
                previousAriaLabel: 'Página Previa',
                previousTooltip: 'Página Previa',
                nextAriaLabel: 'Siguiente Página',
                nextTooltip: 'Siguiente Página',
                lastAriaLabel: 'Última Página',
                lastTooltip: 'Última Página',
              },
              toolbar: {
                searchTooltip: 'Buscar',
                searchPlaceholder: 'Buscar',
              }
            }}
            actions={[
              {
                icon: tableIcons.Add,
                tooltip: 'Agregar ' + globalStore.module,
                isFreeAction: true,
                onClick: (event) => {
                  Store.reset()
                  globalStore.setIsUpdateSlide(false)
                  globalStore.swipeOutForm('Agregar ' + globalStore.module, 'create')
                }
              },
              {
                icon: tableIcons.Visibility,
                tooltip: 'Ver ' + globalStore.module,
                onClick: (event, rowData) => {
                  console.log(rowData.id)
                }
              },
              {
    		        icon: tableIcons.Edit,
    		        tooltip: 'Editar ' + globalStore.module,
    		        onClick: (event, rowData) => {
                    Store.reset()
                    globalStore.setFormMethod('update')
                    globalStore.setSlideTitle('Editar ' + globalStore.module)
                    Store.getRecord(rowData.id)
                }
    		      },
              {
                icon: tableIcons.Delete,
                tooltip: 'Eliminar ' + globalStore.module,
                onClick: (event, rowData) => {
                  alertify.confirm("!ALERTA¡", "Desea eliminar "+ globalStore.module +"?",
                  function(){
                    globalStore.setTableLoaded()
                    Store.delete(rowData.id).then((res) => {
                      Store.deleteRecord(rowData.id)
                      globalStore.setTableLoaded()
                      alertify.success(res.es)
                    })
                  },
                  function(){
                  });
                }
              }
            ]}
          />
    )
})
)

export default DataTable;