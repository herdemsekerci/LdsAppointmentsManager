import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = props => {
  const { children } = props;
  return (
    <main>
      <div id="wrapper" className={`dp-content ${window.location.pathname.replace('/', '').toLowerCase() || 'home'}-content`}>
        <>
          <Header />
          {children}
          {/* <Footer /> */}
        </>
      </div>
    </main>
  );
};


export { Layout };
