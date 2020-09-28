import { Loading, SetDefault } from 'react-loading-ui';

export const Fetch = (url, requestOptions, noloding = true) => {
  SetDefault({ title: 'Yükleniyor.', text: 'Lütfen bekleyiniz.' });
  if (noloding) {
    Loading();
  }

  return (fetch(url, requestOptions)
    .then(response => {
      debugger;
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        localStorage.removeItem('user');
        window.location.href = "/Login";
      } else {
        throw new Error();
      }
      return false;
    })
    .then(json => {
      debugger;
      if (noloding) {
        Loading();
      }
      return json;
    })
    .catch((e,f) => {
      console.log(e);
      if (noloding) {
        Loading();
      }
      return false;
    })
  );
};
