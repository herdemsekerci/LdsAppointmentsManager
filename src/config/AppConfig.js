export const AppointmentManager = {
  config: {
    /**
   * [GENERAL]
   */
    // eslint-disable-next-line func-names, prefer-arrow-callback, no-unused-vars
    debug: /param/.test(function (param) { }),
  },
  api: {
    release: {
      url: 'https://5f724ddc6833480016a9b8bf.mockapi.io/api',
    },
    debug: {
      url: 'https://5f724ddc6833480016a9b8bf.mockapi.io/api',
    },
    user: url => (AppointmentManager.config.debug ? AppointmentManager.api.debug.url.concat(url) : AppointmentManager.api.release.url.concat(url)),
  },
  service: {
    user: {},
    appointment: {},
  },
  utilities: {
    authorizedHeader: () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        return { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` };
      }
      return { 'Content-Type': 'application/json' };
    },
    user: () => (JSON.parse(localStorage.getItem('user'))),
    userToken: () => (JSON.parse(localStorage.getItem('user')).token),
  },
};

AppointmentManager.service.user = {
  login: AppointmentManager.api.user('/login'),
  checkLogin: AppointmentManager.api.user('/checkLogin')
};

AppointmentManager.service.appointment = {
  get: AppointmentManager.api.user('/getApointments'),
  create: AppointmentManager.api.user('/getApointments'),
  update: AppointmentManager.api.user('/getApointments'),
};

 