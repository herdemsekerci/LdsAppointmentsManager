import React, { useState, useEffect } from 'react';
import { Tabs, Form, Input, Button, Checkbox, Card, Radio } from 'antd';
import { Modal, notify } from '../components';
import ValidForm from 'react-valid-form-component';
import { Service } from '../services';


export const CreditResult = ({ onComplete, transactionGuid }) => {

  const [creditValue, setCreditValue] = useState(0);

  useEffect(() => {
    Service.Customer.credit(transactionGuid).then(response => {
      if (!response.error) {
        setCreditValue(response.data);
        onComplete();
        notify.info("Müşterinin toplam kredisi başarıyla getirildi.");
      } else {
        notify.error("Hata meydana geldi.");
      }
    });
  }, []);

  return (
    <>
      <Form.Item name="phone" label="Kredi Tutarı"  >
        <Input addonBefore="Toplam" style={{ width: '100%' }} addonAfter="₺" value={creditValue} placeholder={creditValue} disabled />
      </Form.Item>
    </>
  );
};
