import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Tabs, Radio } from 'antd';
import { Service } from '../services';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import { notify } from '../components';

export const IdentityQuery = ({ onComplete, transactionGuid }) => {
  const { TabPane } = Tabs;
  const [activeIndentityType, setActiveIndentityType] = useState(1);
  const [indentityCardRadio, setIndentityCardRadio] = useState(false);

  useEffect(() => {

  }, []);

  const onComplateIdentityStep = () => {
    //Yeni kimlik tabı aktifse
    if (activeIndentityType == 1) {

      if (indentityCardRadio) {
        window.location.href = "https://www.techsigndoc.com/tr/idread.html?guid=" + transactionGuid;
      }
      else {
        notify.error('Lütfen kartı cihaza takınız ve işaretlemeyi yapınız.');
      }
    }
    //Eski kimlik tabı aktifse
    else {
      // var model = {};

      // Service.Customer.create.then(response => {
      //   if (!response.error) {
      //     onComplete();
      //     notify.info("Müşteri kaydı başarıyla tamamlanmıştır.");
      //   } else {
      //     notify.error(response.message);
      //   }
      // });
    }
  }

  const onCreateCustomer = (formData) => {
    var model = {
      TransactionGuid: transactionGuid,
      FirstName: formData.firstName,
      LastName: formData.lastName,
      IdentityType: 0,
      IdentityNumber: formData.identityNumber
    };

    Service.Customer.create(model).then(response => {
      if (!response.error) {
        onComplete();
        notify.info("Müşteri kaydı başarıyla tamamlanmıştır.");
      } else {
        notify.error(response.message);
      }
    });
  }
  const onCreateCustomerFailed = (e) => { }

  const onTabChange = (activeKey) => {
    setActiveIndentityType(activeKey);
  }

  const onRadioChange = (e) => {
    setIndentityCardRadio(e.target.checked);
  }
  return (
    <>
      <Tabs defaultActiveKey="1" onChange={(activeKey) => onTabChange(activeKey)}>
        <TabPane tab="Yeni Kimlik" key="1">
          <Radio onChange={(e) => onRadioChange(e)}>Kimlik kartını  cihaza taktım.</Radio>
          <Button type="primary" htmlType="button" onClick={() => onComplateIdentityStep()}>
            Kaydı Tamamla
          </Button>
        </TabPane>
        <TabPane tab="Eski Kimlik" key="2">
          <Form
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onCreateCustomer}
            onFinishFailed={onCreateCustomerFailed}
          >
            <Form.Item
              label="İsim"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Lütfen isim giriniz!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Soyisim"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: 'Lütfen soyisim giriniz!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="TC Kimlik No"
              name="identityNumber"
              rules={[
                {
                  required: true,
                  message: 'Lütfen T.C. No giriniz!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Kaydı Tamamla
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </>
  );
};
