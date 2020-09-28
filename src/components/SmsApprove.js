/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Spin, Progress } from 'antd';
import MaskedInput from 'antd-mask-input';
import { InfoCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Service } from '../services';

const CounterComponent = () => {
  const [percent, setPercent] = useState(100);
  const [counter, setCounter] = useState(180);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCounter(counter - 1);
        setPercent(parseFloat(((counter - 1) * 100) / 180));
      }, 1000);
    } else {
      clearTimeout();
    }
  }, [counter]);
  return (<Progress className="ml-3" type="circle" percent={percent} width={70} format={() => `${counter}`} />);
};


// eslint-disable-next-line react/prop-types
export const SmsApprove = ({ onComplete, setTransactionGuid }) => {
  const [phone, setPhone] = useState({});
  const [passwordSend, setPasswordSend] = useState(false);
  const [checkReceive, setCheckReceive] = useState(0);


  const onChange = e => {
    setPhone({
      [e.target.name]: e.target.value,
    });
  };

  const customerSetCheckReceive = updateData => {
    setCheckReceive(updateData);
  };

  const [startCk, setStartCk] = useState(false);
  const [ck, setCk] = useState(0);

  useEffect(() => {
    if (startCk) {
      setTimeout(() => { setCk(1); }, 5000);
    }
  }, [startCk]);

  useEffect(() => {
    if (ck > 0 && ck < 180 && checkReceive === 1) {
      setTimeout(() => {
        Service.Sms.checkReceive(phone.phone).then(response => {
          // handle response
          if (!response.error) {
            customerSetCheckReceive(response.data);
          }
          setCk(ck + 1);
        });
      }, 1000);
    }
  }, [ck]);

  const reset = () => {
    setStartCk(false);
    setCk(0);
    customerSetCheckReceive(1);
  };


  useEffect(() => {
    if (checkReceive === 2) {
      onComplete();
    }
  }, [checkReceive]);

  const sendPassword = () => {
    // eslint-disable-next-line no-alert
    reset();

    phone.phone = phone.phone.replace("(", "").replace(")", "").replace(/\s/g, "");
    Service.Sms.send(phone.phone).then(response => {
      if (!response.error) {
        setPasswordSend(true);
        setStartCk(true);
        setTransactionGuid(response.data);
      }
    });
  };

  const onFinishFailed = () => {

  };

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={sendPassword}
        onFinishFailed={onFinishFailed}
      >
        <Input.Group>
          <Form.Item
            label="Cep telefonu"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Lütfen müşterinin cep telefonu numarasını giriniz.',
              },
            ]}
          >
            <MaskedInput mask="(111) 111 11 11" name="phone" id="phone" onChange={e => onChange(e)} autoComplete="off" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Şifre Gönder
          </Button>
        </Input.Group>
      </Form>
      {
        passwordSend ? (
          checkReceive === 1 && ck < 180 ? (
            <>
              <label className="mt-3">
                <InfoCircleOutlined />
                {' '}
                <strong>Sms onayı bekleniyor... </strong>
                <Spin className="ml-2" />
              </label>
              <CounterComponent />
            </>
          ) : (checkReceive === 2 ? (
            <>
              <label className="mt-3">
                <InfoCircleOutlined />
                {' '}
                <strong>Sms doğrulandı</strong>
                <CheckCircleOutlined className="ml-2" />
              </label>
            </>
          ) : (checkReceive === 4 ? (
            <>
              <label className="mt-3">
                <InfoCircleOutlined />
                {' '}
                <strong>Sms doğrulanamadı.</strong>
                <CloseCircleOutlined className="ml-2" />
              </label>
            </>
          ) : (
              <>
                <label className="mt-3">
                  <InfoCircleOutlined />
                  {' '}
                  <strong>Sms doğrulanamadı.</strong>
                  <CloseCircleOutlined className="ml-2" />
                </label>
              </>
            )))
        )
          :
          <></>
      }
    </>
  );
};
