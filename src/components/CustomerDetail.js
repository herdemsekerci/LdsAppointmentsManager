import React, { useEffect, useState } from 'react';
// import { Button, DatePicker, ConfigProvider, Radio } from 'antd';
import { Card } from '.';
import { Select, Button, DatePicker, Space, ConfigProvider, Form, Input } from 'antd';
import 'moment/locale/tr';
import locale from 'antd/es/locale/tr_TR';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import { Service } from '../services';
import { notify } from './Notify';

export const CustomerDetail = ({ onComplete, transactionGuid }) => {
  const { Option } = Select;
  const dateFormat = 'DD/MM/YYYY';

  const [cities, setCities] = useState([]);
  const [town, setTown] = useState([]);
  const [district, setDistrict] = useState([]);

  const GetCities = () => {
    Service.Address.getCities().then(response => {
      if (!response.error) {
        setCities(response.data);
      } else {
        notify.error(response.message);
      }
    });
  };

  const GetTown = cityId => {
    Service.Address.getTown(cityId).then(response => {
      if (!response.error) {
        setTown(response.data);
      }
    });
  };


  const GetDistrict = townId => {
    Service.Address.getDistrict(townId).then(response => {
      if (!response.error) {
        setDistrict(response.data);
      }
    });
  };


  useEffect(() => {
    GetCities();
  }, []);


  function onChangeCity(value) {
    GetTown(value);
  }

  function onChangeTown(value) {
    GetDistrict(value);
  }

  const saveCustomerInformation = formData => {
    const postData = {
      'TransactionGuid': transactionGuid,
      'CityID': formData.City,
      'TownID': formData.Town,
      'DistrictID': formData.District,
      'Email': formData.Email,
      'Address': formData.address,
      'BirthDate': formData.BirthDate._d,
      'PlaceOfBirth': formData.birthPlace,
    };
    Service.Customer.SetDetail(postData).then(response => {
      if (!response.error) {
        onComplete();
      } else {
        notify.error(response.message);
      }
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-8">
          <h6>Müşteri Bilgileri</h6>
        </div>
      </div>
      <Card Title="" className="pb-2 mt-4 xd-admin-donate-history">
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={saveCustomerInformation}
          onFinishFailed={() => { }}
        >

          <div className="row">
            <div className="col-6">
              <Form.Item
                label="İl"
                name="City"
                rules={[
                  {
                    required: true,
                    message: 'Lütfen il seçiniz!',
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: 350 }}
                  placeholder="İl Seçiniz"
                  optionFilterProp="children"
                  onChange={onChangeCity}
                >
                  {
                    cities.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="Mahalle"
                name="District"
                rules={[
                  {
                    required: true,
                    message: 'Lütfen mahalle seçiniz!',
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: 350 }}
                  placeholder="Mahalle Seçiniz"
                >
                  {
                    district.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                  }
                </Select>
              </Form.Item>


              <Form.Item
                label="Doğum Tarihi"
                name="BirthDate"
                rules={[
                  {
                    required: true,
                    message: 'Lütfen doğum tarihi seçiniz!',
                  },
                ]}
              >
                {/* <ConfigProvider>
                  <Space direction="vertical" size={12}>
                    <DatePicker defaultValue={moment(new Date(), dateFormat)} format={dateFormat} />
                  </Space>
                </ConfigProvider> */}
                <DatePicker format={dateFormat} />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="İlçe"
                name="Town"
                rules={[
                  {
                    required: true,
                    message: 'Lütfen ilçe seçiniz!',
                  },
                ]}
              >
                <Select
                  onChange={onChangeTown}
                  allowClear
                  placeholder="İlçe Seçiniz"
                  style={{ width: 350 }}
                  showSearch
                >
                  {
                    town.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  {
                    required: true,
                    message: 'Lütfen email giriniz!',
                    pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Doğum Yeri"
                name="birthPlace"
                rules={[
                  {
                    required: true,
                    message: 'Lütfen doğum yeri bilgisini giriniz!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Adres"
            name="address"
            rules={[
              {
                required: true,
                message: 'Lütfen adres bilgisini giriniz!',
              },
            ]}
          >
            <TextArea rows="5" cols="20" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Kaydı Tamamla
          </Button>
        </Form>
      </Card>

    </>
  );
};
