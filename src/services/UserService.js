import { AppointmentManager } from '../config/AppConfig';
import { Fetch } from '../components';

export const UserService = {

  /**
* [AUTH]
* @param {object} data
*/
  Auth(data) {
    const requestOptions = {
      method: 'POST',
      headers: AppointmentManager.utilities.authorizedHeader(),
      body: JSON.stringify(data),
    };
    return Fetch(AppointmentManager.service.user.login, requestOptions);
  },


  /**
* [GET]
*/
  Get() {
    const requestOptions = {
      method: 'GET',
      headers: AppointmentManager.utilities.authorizedHeader(),
    };
    const url = `${AppointmentManager.service.user.get}`;
    return Fetch(url, requestOptions);
  },


  /**
* [GET_AVATAR]
*/
  GetAvatar() {
    const requestOptions = {
      method: 'GET',
      headers: AppointmentManager.utilities.authorizedHeader(),
    };
    const url = `${AppointmentManager.service.user.getAvatar}`;
    return Fetch(url, requestOptions);
  },
 
  /**
* [UPDATE]
* @param {object} data
*/
  Update(data) {
    const requestOptions = {
      method: 'POST',
      headers: AppointmentManager.utilities.authorizedHeader(),
      body: JSON.stringify(data),
    };
    return Fetch(AppointmentManager.service.user.update, requestOptions);
  },

  /**
  * [PASSWORD_CHANGE]
  * @param {object} data
  */
  PasswordChange(data) {
    const requestOptions = {
      method: 'POST',
      headers: AppointmentManager.utilities.authorizedHeader(),
      body: JSON.stringify(data),
    };
    return Fetch(AppointmentManager.service.user.passwordChange, requestOptions);
  },


  /**
* [UPLOAD IDENTITY]
* @param {IFormFile} IdentityFront
* @param {IFormFile} IdentityBack
*/
  UploadIdentity(data) {
    const requestOptions = {
      method: 'POST',
      headers: AppointmentManager.utilities.authorizedHeader(),
      body: JSON.stringify(data),
    };
    return Fetch(AppointmentManager.service.user.uploadIdentity, requestOptions);
  },


  /**
* [CheckLogin]
*/
  CheckLogin() {
    const requestOptions = {
      method: 'GET',
      headers: AppointmentManager.utilities.authorizedHeader(),
    };
    return fetch(AppointmentManager.service.user.checkLogin, requestOptions)
      .then(response => {
        if (response.ok) {
          return true;
        }
        return false;
      })
      .then(json => json)
      .catch(() => false);
  },
  /**
  * [LOGOUT]
  */
  Logout() {
    debugger;
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
};
