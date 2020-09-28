import { AppointmentManager } from '../config/AppConfig';
import { Fetch } from '../components';

export const AppointmentService = {

  /**
* [GET]
*/
  Get() {
    const requestOptions = {
      method: 'GET',
      headers: AppointmentManager.utilities.authorizedHeader(),
    };
    const url = `${AppointmentManager.service.appointment.get}`;
    return Fetch(AppointmentManager.service.appointment.get, requestOptions);
  },
    Create(data) {
    const requestOptions = {
      method: 'POST',
      headers: AppointmentManager.utilities.authorizedHeader(),
      body: JSON.stringify(data)
    };
    const url = `${AppointmentManager.service.appointment.create}`;
    return Fetch(url, requestOptions);
  },
  Update(data) {
    const requestOptions = {
      method: 'PUT',
      headers: AppointmentManager.utilities.authorizedHeader(),
      body: JSON.stringify(data)
    };
  const url = `${AppointmentManager.service.appointment.get}/${data.id}`;
  return Fetch(url, requestOptions);
  },
  GetAppointment(id) {
    const requestOptions = {
      method: 'GET',
      headers: AppointmentManager.utilities.authorizedHeader(),
    };
  const url = `${AppointmentManager.service.appointment.get}/${id}`;
  return Fetch(url, requestOptions);
},
 
};
