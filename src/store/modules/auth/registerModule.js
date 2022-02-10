import emelAxios from '@/axios/emelAxios.js';
import alerts from '@/helpers/request/alerts';
import statusesKeys from '@/helpers/alertBox/statusesKeys';

export default {
  actions: {
    register: async ({ commit, getters }, registerData) => {
      let primaryAddressLine1 = `${registerData.street ??
        ''} ${registerData.houseNumber ?? ''}/${registerData.flatNumber ?? ''}`;

      const primaryAddressLine1Keys = ['street', 'houseNumber', 'flatNumber'];

      if (primaryAddressLine1Keys.some((key) => !registerData[key]))
        primaryAddressLine1 = '';

      await emelAxios
        .post(
          'customer',
          {
            customer_name: registerData.firstName,
            customer_surname: registerData.lastName,
            password: registerData.password,
            company_name: registerData.company ?? '',
            vat_no: registerData.nip ?? '',
            email: registerData.email,
            phone: registerData.phone ?? '',
            // discount: 0,
            country: registerData.country,
            wholesale: Number(registerData.hurt),
            // address: [
            //   {
            //     status: 257,
            //     address_line_1: primaryAddressLine1,
            //     address_line_2: "",
            //     zip: registerData.zipCode ?? "",
            //     city: registerData.city ?? "",
            //     country: registerData.country ?? "",
            //   },
            //   {
            //     status: 2,
            //     address_line_1: `${registerData.addressCompany ?? ""}`,
            //     address_line_2: "",
            //     zip: registerData.zipCodeCompany ?? "",
            //     city: registerData.cityCompany ?? "",
            //     country: registerData.countryCompany ?? "",
            //   },
            // ],
          },
          {
            headers: {
              'x-sid': getters.xSid,
            },
          }
        )
        .then((res) => {
          const userData = res.data.data;
          commit('user', userData);
          commit('alertBox', {
            status: statusesKeys.success,
            message: alerts[
              Boolean(registerData.hurt)
                ? 'registerHurtSuccess'
                : 'registerSuccess'
            ].replace('{email}', registerData.email),
          });
        })
        .catch((err) =>
          commit('alertBox', {
            status: statusesKeys.error,
            message: err.response.data.error,
          })
        );
    },
  },
};
