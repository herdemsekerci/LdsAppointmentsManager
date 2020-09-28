/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Card } from '../../components';
import { Button, Row, Col } from "reactstrap";
import { Service } from '../../services';

export const UpdateAppointment = props => {
  debugger;
  const id = props.match.params.id;
  
  const [appointment, setAppointment] = useState({ title: null, location: null, date: null });

  const onCreate = () => {
    Service.Appointment.Update(appointment).then(response => {
      window.location.href = "/Appointment";
    });
  }

  
  useEffect(() => {
    Service.Appointment.GetAppointment(id).then(response => {
      if (response) {
        setAppointment(response)
      }
    });
  }, []);

  const handleData = e => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="dpm-page__wrapper">
        <div className="row mb-3">
          <div className="col-md-12">
            <Card Title="Randevu Düzenle" className="pb-2 mt-4">
              <Row className="form-group">
                <label
                  htmlFor="example-text-input"
                  className="col-sm-2 col-form-label"
                >
                  Başlık
                    </label>
                <Col sm={10}>
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    id="example-text-input"
                    value={appointment.title}
                    onChange={handleData}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <label
                  htmlFor="example-search-input"
                  className="col-sm-2 col-form-label"
                >
                  Randevu Tarihi
                    </label>
                <Col sm={10}>
                  <input
                    className="form-control"
                    type="search"
                    id="example-search-input"
                    value={appointment.date}
                    name="date"
                    onChange={handleData}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <label
                  htmlFor="example-search-input"
                  className="col-sm-2 col-form-label"
                >
                  Randevu Yeri
                    </label>
                <Col sm={10}>
                  <input
                    className="form-control"
                    type="search"
                    id="example-search-input"
                    value={appointment.location}
                    name="location"
                    onChange={handleData}
                  />
                </Col>
              </Row>

              <Button
                color="primary"
                className="btn btn-primary waves-effect waves-light"
                onClick={() => onCreate()}
              >Kaydet</Button>

            </Card>
          </div>
        </div>
      </div>
    </>
  );
}