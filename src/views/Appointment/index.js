/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { Service } from '../../services';
import { Loading } from 'react-loading-ui';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable from 'react-data-table-component';
import { DataTableColumns } from '../../config/DataTableColumns';
import { TimeConverter } from '../../config/Utilities';


export function Appointment() {
  const [dataTable, setDataTable] = useState({ rows: [], columns: DataTableColumns.Appointments });
  const [] = useState([]);

  useEffect(() => {
    Loading();
    Service.Appointment.Get().then(response => {
      if (response) {
        setDataTable({ ...dataTable, rows: response })
      }
      Loading();
    });
  }, []);

  return (
    <>
      <div className="dp-content-grid">
        <div className="container kt-grid__item kt-align-center dp-action__page">
          <div className="row">
            <div className="col-lg-12">
              <a className="btn btn-info btn-sm waves-effect waves-light ml-2" href="/CreateAppointment"><i className="fas fa-plus mr-1"></i> Yeni Randevu</a>
            </div>
            <div className="col-lg-12" style={{ textAlign: 'right' }}>
              &nbsp;
            </div>
            <div className="col-lg-12 col-12">
              <div className="ant-table">
                <div className="ant-table-container">
                  <div className="ant-table-content">
                    <DataTableExtensions
                      columns={dataTable.columns}
                      data={dataTable.rows}
                      export={false}
                      print={false}
                    >

                      <DataTable
                        noHeader
                        className="tbl-ActionCenter"
                        defaultSortField="id"
                        defaultSortAsc={false}
                        pagination
                        highlightOnHover
                        // onRowDoubleClicked
                        selectableRows
                      // onRowSelected
                      />
                    </DataTableExtensions>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dp-cashier-icon__wrapper">
            <img src="/assets/img/content/cashier.svg" alt="kasiyer" />
          </div>
        </div>
      </div>
    </>
  );
}
