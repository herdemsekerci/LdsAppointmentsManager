/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext } from 'react';
import ValidForm from 'react-valid-form-component';
import { Redirect, Link } from 'react-router-dom';
import { Loading } from 'react-loading-ui';
import { notify } from '../../components';
import { Service } from '../../services';
import { AuthContext } from '../../contexts/AuthContext';


export function Login() {

  const { auth, setAuth, redirectUrl, setRedirectUrl, setlayoutOptions } = useContext(AuthContext);
  const [redirect, setRedirect] = useState();
  const [formData, setFormData] = useState({
    Password: '',
    Email: '',
  });

  const handleFormData = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

  const onLogin = (formData, valid) => {
    if (valid) {
      Loading();
      Service.User.Auth(formData).then(response => {
        Loading();
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(response));
        setAuth(true);
        if (redirectUrl) {
          setRedirectUrl(null);
        }
        else {
          window.location.href = "/";
        }
      });
    }
  };


  return (
    <>
      {
        auth ?
          <Redirect to={redirect || '/login'} />
          : (
            <div className="intro-three dp-login">
              <div className="intro-three--contents login-form">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <div className="form-wrapper">
                        <div className="card-header">
                          <h4 className="text-center">Üye Girişi</h4>
                        </div>
                        <ValidForm id="loginForm" className="form-horizontal m-t-10" nosubmit novalid onSubmit={(form, formData, valid) => onLogin(formData, valid)}>
                          <div className="card">
                            <div className="card-body">
                              <div className="form-group">
                                <input type="text" id="email" name="email" placeholder="E-posta Adresiniz / TC Kimlik Numaranız" className="form-control" required />
                              </div>
                              <div className="form-group">
                                <input type="password" id="password" name="password" placeholder="Şifreniz" className="form-control" required />
                              </div>
                              <div className="form-action d-flex justify-content-between">
                                <div className="custom-control custom-checkbox checkbox-secondary">
                                  <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                  <label className="custom-control-label" htmlFor="customCheck3">Beni Hatırla</label>
                                </div>
                                <Link to="#" className="color-secondary">Şifremi Unuttum</Link>
                              </div>
                              <div className="form-group text-center m-bottom-20">
                                <button type="submit" className="btn btn-secondary">Giriş Yap</button>
                              </div>


                            </div>
                          </div>
                        </ValidForm>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="intro-three--img">
                <img src="./assets/img/content/login.png" alt="" />
              </div>
            </div>
          )
      }
    </>
  );
}
