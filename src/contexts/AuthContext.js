/* eslint-disable react/prop-types */
import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { Layout } from '../views/Layout';
import { Service } from '../services';

let checkAuth = null;

export const AuthContext = React.createContext();
const AuthConsumer = AuthContext.Consumer;

const AuthProvider = props => {
  const [auth, setAuth] = useState();
  const [redirectUrl, setRedirectUrl] = useState();
  const [layoutOptions, setlayoutOptions] = useState(
    {
      header: true,
      footer: true,
      sidebar: true,
    },
  );

  useLayoutEffect(() => {
    checkAuth = true;
    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);



  const { children } = props;
  return (
    <AuthContext.Provider
      value={
        {
          auth,
          setAuth,
          layoutOptions,
          setlayoutOptions,
          redirectUrl,
          setRedirectUrl,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthConsumer>
      {({ auth, onLogout, menu }) => {
        let content = '';
        checkAuth = true;
        if (localStorage.getItem('user')) {
          content = (
            <Route
              render={props => (
                <Layout topbar footer sidebar onLogout={onLogout} menu={menu}>
                  <Component {...props} />
                </Layout>
              )}
              {...rest}
            />
          );
        } else {
          content = <Redirect to="/login" />;
        }
        return content;
      }}
    </AuthConsumer>
  );
};

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
};


const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthConsumer>
      {({ onLogout, menu }) => {
        let content = '';
        content = (
          <Route
            render={props => (
              <Layout topbar footer sidebar onLogout={onLogout} menu={menu}>
                <Component {...props} />
              </Layout>
            )}
            {...rest}
          />
        );
        return content;
      }}
    </AuthConsumer>
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
export { AuthConsumer, AuthProvider, AuthRoute, PublicRoute };
