import React, { useState } from 'react';
import { Button, DatePicker, ConfigProvider } from 'antd';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable from 'react-data-table-component';
import { DataTableColumns } from '../config/DataTableColumns';
import { Card, Modal, notify } from '../components';
import ValidForm from 'react-valid-form-component';
import { Service } from '../services';
import swal from 'sweetalert';
import moment from 'moment';
import locale from 'antd/lib/locale/tr_TR';


export const ShoppingCart = () => {
  const [productDataTable, setProductDataTable] = useState({ rows: [], columns: DataTableColumns.ShoppingCartProductDT });
  const [installmentDataTable, setInstallmentProductDataTable] = useState({ rows: [], columns: DataTableColumns.ShoppingCartInstallmentDT });

  const [modal, setModal] = useState(false);

  const [productDetailData, setProductDetailData] = useState({ barcode: '', productGroup: '', groupLimit: 0, brand: '', productName: '', description: '' });
  const [selectedInstallment, setSelectedInstallment] = useState('');


  const addProduct = () => {
    setModal(true);
  };

  const addProductSave = (formData, valid) => {
    if (valid) {
      const postData = { ...formData };
      postData.productGroup = productDetailData.productGroup;
      postData.groupLimit = productDetailData.groupLimit;
      postData.brand = productDetailData.brand;
      postData.productName = productDetailData.productName;
      postData.description = productDetailData.description;
      let productGroupTotalQuantity = 0;

      productDataTable.rows.filter(f => f.productGroup === postData.productGroup).forEach(element => { productGroupTotalQuantity += parseInt(element.quantity); });

      // eslint-disable-next-line radix

      //Önceden eklenen ürün kontrolü yapılıyor
      if (productDataTable.rows.filter(f1 => f1.barcode === postData.barcode).length !== 0) {
        notify.error('Bu ürün mevcut sepetinizde bulunmaktadır.');
        return false;
      }

      //Limit kontrolü yapılıyor
      productGroupTotalQuantity += parseInt(postData.quantity);
      if ((productGroupTotalQuantity <= postData.groupLimit)) {

        const model = productDataTable.rows.map(item => ({ Barcode: item.barcode, Piece: item.quantity }));

        //yeni eklenenide diziye ekliyoruz
        model.push({ Barcode: postData.barcode, Piece: postData.quantity });

        Service.Transaction.CalculateInterest({ ProductDetails: model }).then(response => {
          if (!response.error) {
            setProductDataTable({ ...productDataTable, rows: [...productDataTable.rows, postData] });
            setInstallmentProductDataTable({ ...installmentDataTable, rows: response.data });
            setModal(false);
            console.log('res :>> ', response);
          } else {
            notify.error(response.message);
          }
        });

      } else {
        notify.error('Bu ürün grubuna ait limit değeri max. ' + productDetailData.groupLimit + ' ');
      }
    }
  };

  const productDetail = barcode => {
    if (barcode !== '') {
      Service.Transaction.GetProductDetail(barcode).then(response => {
        if (!response.error) {
          setProductDetailData({ barcode, productGroup: response.data.groupName, groupLimit: response.data.groupLimit, brand: response.data.brandName, productName: response.data.name, description: response.data.description });
        } else {
          notify.error(response.message);
          setProductDetailData({ barcode: '', productGroup: '', brand: '', productName: '', description: '' });
        }
      });
    }
  };

  const onDelete = barcode => {
    swal({
      title: "Emin misiniz ?",
      text: "Ürünü silmek istiyor musunuz ?",
      icon: "warning",
      buttons: ["Hayır", "Evet"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let copyDtRows = productDataTable.rows;
        copyDtRows = copyDtRows.filter(f => f.barcode !== barcode);
        setProductDataTable({ ...productDataTable, rows: copyDtRows });

        if (copyDtRows.length === 0) {
          setInstallmentProductDataTable({ ...installmentDataTable, rows: [] });
        }
        else {

          const model = copyDtRows.rows.map(item => ({ Barcode: item.barcode, Piece: item.quantity }));

          Service.Transaction.CalculateInterest({ ProductDetails: model }).then(response => {
            if (!response.error) {
              setInstallmentProductDataTable({ ...installmentDataTable, rows: response.data });
            } else {
              notify.error(response.message);
            }
          });
        }
      }
    });
  };

  const saveBasket = () => {
    if (productDataTable.rows.length == 0) {
      notify.error('Sepet boş. Lütfen ürün ekleyiniz!');
    }

    if (selectedInstallment === '') {
      notify.error('Lütfen taksit seçiniz!');
    }



  }

  const onRowClicked = (e, t) => {
    console.log('t :>> ', t.target);
  }

  const onSelected = (guid) => {
    setSelectedInstallment(guid);
  }

  return (
    <>
      <div className="row">
        <div className="col-8">
          <h6>Alışveriş Sepeti</h6>
        </div>
        {/* <div className="col-2 text-center">
          <ConfigProvider locale={locale}>
            <DatePicker
              defaultValue={moment().add(1, 'M')}
              format="DD-MM-YYYY"
            />
          </ConfigProvider>
        </div>
        <div className="col-2 text-center">
          <Button type="primary" onClick={addProduct}>Ürün Ekle</Button>
        </div> */}
      </div>
      <div className="row">
        <div className="col-2">
          İlk Ödeme Tarihi :
        </div>
        <div className="col-2 text-center">
          <ConfigProvider locale={locale}>
            <DatePicker
              defaultValue={moment().add(1, 'M')}
              format="DD-MM-YYYY"
            />
          </ConfigProvider>
        </div>
        <div className="col-6">
        </div>
        <div className="col-2 text-center">
          <Button type="primary" onClick={addProduct}>Ürün Ekle</Button>
        </div>
      </div>
      <Card Title="Ürünler" className="pb-2 mt-4 xd-admin-donate-history">
        <div className="row">
          <div className="col-md-12">
            <DataTableExtensions
              columns={productDataTable.columns(onDelete)}
              data={productDataTable.rows}
              export={false}
              print={false}
              filter={false}
            >
              <DataTable
                noHeader
                className="tbl-Companies"
                defaultSortField="id"
                defaultSortAsc={false}
                pagination={false}
                highlightOnHover
                noDataComponent={"Henüz ürün seçimi yapılmadı."}
              />
            </DataTableExtensions>
          </div>
        </div>
      </Card>

      <Card Title="Taksit Seçenekleri" className="pb-2 mt-4">
        <div className="row">
          <div className="col-md-12">
            <DataTableExtensions
              columns={installmentDataTable.columns(onSelected)}
              data={installmentDataTable.rows}
              export={false}
              print={false}
              filter={false}
            >
              <DataTable
                noHeader
                className="tbl-Installment"
                defaultSortField="id"
                defaultSortAsc={false}
                pagination={false}
                highlightOnHover
                noDataComponent={"Henüz ürün seçimi yapılmadı."}
                onRowClicked={onRowClicked}
              //selectableRows
              //onRowDoubleClicked={CompanyDetail}
              />
            </DataTableExtensions>
          </div>
        </div>
      </Card>

      <div className="row mt-5">
        <div className="col-10"></div>
        <div className="col-2">
          <Button type="primary" onClick={saveBasket}>Sepeti Kaydet</Button>
        </div>
      </div>

      <Modal Title="Ürün Ekle" Show={modal} onClose={() => setModal(false)}>
        <div className="row mt-1 mb-1">
          <div className="col-md-12">
            <ValidForm id="addProductSaveForm" className="form-horizontal m-t-10" nosubmit novalid onSubmit={(form, formData, valid) => addProductSave(formData, valid)}>
              <div className="form-group row ml-1 mr-1">
                <label htmlFor="barcodeLbl" className="col-sm-4 col-form-label">Barkod</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="barcode" name="barcode" placeholder="Barkod giriniz" onBlur={e => productDetail(e.target.value)} autoComplete="off" required />
                </div>
              </div>

              <div className="form-group row ml-1 mr-1">
                <label htmlFor="productGrpLbl" className="col-sm-4 col-form-label">Ürün Grubu</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="productGroup" name="productGroup" value={productDetailData.productGroup} readOnly />
                </div>
              </div>

              <div className="form-group row ml-1 mr-1">
                <label htmlFor="brandLbl" className="col-sm-4 col-form-label">Marka</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="brand" name="brand" value={productDetailData.brand} readOnly />
                </div>
              </div>

              <div className="form-group row ml-1 mr-1">
                <label htmlFor="productNameLbl" className="col-sm-4 col-form-label">Ürün Adı</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="productName" name="productName" value={productDetailData.productName} readOnly />
                </div>
              </div>

              <div className="form-group row ml-1 mr-1">
                <label htmlFor="quantityLbl" className="col-sm-4 col-form-label">Adet</label>
                <div className="col-sm-8">
                  <input type="number" className="form-control" id="quantity" name="quantity" placeholder="Adet giriniz" autoComplete="off" required />
                </div>
              </div>

              <div className="form-group row ml-1 mr-1">
                <label htmlFor="quantityLbl" className="col-sm-4 col-form-label">Açıklama</label>
                <div className="col-sm-8">
                  <textarea rows="3" cols="10" className="form-control" id="description" name="description" value={productDetailData.description} readOnly />
                </div>
              </div>

              <div className="form-group row ml-1 mr-1">
                <div className="col-12 text-center">
                  {/* <Button type="primary" block={true}>Ürün Ekle</Button> */}
                  <button type="submit" className="btn btn-primary btn-xs w-md waves-effect waves-light">Ürün Ekle</button>
                </div>
              </div>
            </ValidForm>
          </div>
        </div>
      </Modal>
    </>
  );
};
