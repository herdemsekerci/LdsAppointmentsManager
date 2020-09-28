import React, { useState, useEffect } from 'react';
import { Button, DatePicker, ConfigProvider, Radio } from 'antd';
import { Card, Modal, notify } from '../components';
import ValidForm from 'react-valid-form-component';
import { Service } from '../services';
import swal from 'sweetalert';
import moment from 'moment';
import locale from 'antd/lib/locale/tr_TR';
import { Loading } from 'react-loading-ui';


export const Contract = ({ transactionGuid }) => {

  useEffect(() => {
    Service.Contract.create(transactionGuid).then((response) => {
      debugger;
      if (!response.error) {
        notify.info("Sözleşme başarıyla hazırlandı.");
      } else {
        notify.error("Sözleşme oluşturulurken hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.");
      }
    });
  }, []);

  const signContract = () => {
    Service.Contract.sign(transactionGuid).then((response) => {
      if (!response.error) {
        window.location.href = "https://www.techsigndoc.com/tr/signing.html?document_token=" + response.data + "&guid=" + transactionGuid;
      } else {
        notify.error("İmza işleminde hata meydana geldi lütfen daha sonra tekrar deneyiniz.");
      }
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-8">
          <h6>Sözleşme İşlemleri</h6>
        </div>
      </div>
      <Card Title="" className="pb-2 mt-4">
        <Button type="primary" htmlType="button" onClick={() => signContract()}>
          Sözleşmeyi İmzala
        </Button>
      </Card>
    </>
  );
};
