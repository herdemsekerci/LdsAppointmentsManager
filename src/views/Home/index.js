/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from 'reactstrap';

export function Home() {
  return (
    <>
      <div className="dp-content-grid">
        <div className="container kt-grid__item kt-align-center dp-action__page">
          <div className="row">
          
            <div className="col-lg-6 col-12">
              <a href="/CreateAppointment" className="dp-iconbox">
                <Card>
                  <CardBody>
                    <div className="dp-iconbox__body">
                      <div className="dp-iconbox__icon">
                        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="search-plus" className="svg-inline--fa fa-search-plus fa-w-16 kt-svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <g className="fa-group">
                            <path className="fa-secondary" fill="currentColor" d="M208 80a128 128 0 1 1-90.51 37.49A127.15 127.15 0 0 1 208 80m0-80C93.12 0 0 93.12 0 208s93.12 208 208 208 208-93.12 208-208S322.88 0 208 0z" opacity="0.4" />
                            <path className="fa-primary" fill="currentColor" d="M292 180h-56v-56a12 12 0 0 0-12-12h-32a12 12 0 0 0-12 12v56h-56a12 12 0 0 0-12 12v32a12 12 0 0 0 12 12h56v56a12 12 0 0 0 12 12h32a12 12 0 0 0 12-12v-56h56a12 12 0 0 0 12-12v-32a12 12 0 0 0-12-12zm213 262.7L405.3 343a24 24 0 0 0-17-7H372l-36 36v16.3a24 24 0 0 0 7 17l99.7 99.7a23.9 23.9 0 0 0 33.9 0l28.3-28.3a24.11 24.11 0 0 0 .1-34z" />
                          </g>
                        </svg>
                      </div>
                      <div className="dp-iconbox__desc">
                        <h3 className="dp-iconbox__title">
                          Yeni Randevu
                        </h3>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </a>
            </div>
            <div className="col-lg-6 col-12">
              <a href="/Appointment" className="dp-iconbox">
                <Card>
                  <CardBody>
                    <div className="dp-iconbox__body">
                      <div className="dp-iconbox__icon">
                        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="money-check" className="svg-inline--fa fa-money-check fa-w-20 kt-svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                          <g className="fa-group">
                            <path className="fa-secondary" fill="currentColor" d="M0 448a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V128H0zm448-208a16 16 0 0 1 16-16h96a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-96a16 16 0 0 1-16-16zm0 120a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H456a8 8 0 0 1-8-8zM64 264a8 8 0 0 1 8-8h304a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8zm0 96a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8z" opacity="0.4" />
                            <path className="fa-primary" fill="currentColor" d="M568 352H456a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm-192-96H72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm-128 96H72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zM624 32H16A16 16 0 0 0 0 48v48h640V48a16 16 0 0 0-16-16z" />
                          </g>
                        </svg>
                      </div>
                      <div className="dp-iconbox__desc">
                        <h3 className="dp-iconbox__title">
                          Randevular
                        </h3>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </a>
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
