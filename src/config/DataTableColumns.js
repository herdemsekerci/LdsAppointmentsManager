/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
import React from 'react';

export const DataTableColumns = {

  Appointments: [

    {
      name: 'Başlık',
      selector: 'title',
      sortable: true,
      center: true,
    },
    {
      name: 'Lokasyon',
      selector: 'location',
      sortable: true,
      center: true,
    },
    {
      name: 'Tarih',
      selector: 'date',
      sortable: true,
      center: true,
    },
    {
      name: 'Düzenle',
      selector: 'id',
      width: '160px',
      cell: d => (
        <span>
          <a href={`/UpdateAppointment/${d.id}`} target="_blank">
            <button type="button" className="btn btn-info btn-sm waves-effect waves-light ml-2" title="Düzenle">
              <i className="fas fa-info-circle mr-1" />
              Düzenle
            </button>
          </a>
        </span>
      ),
    },
     
  ]
};
