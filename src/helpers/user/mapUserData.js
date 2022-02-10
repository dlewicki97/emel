export default function mapUserData(userData) {
  return {
    accountUuid: userData.account_uuid,
    address: userData.address.map((address) => {
      return {
        addressLine1: address.address_line_1,
        addressLine2: address.address_line_2,
        city: address.city,
        country: address.country,
        status: address.status,
        zip: address.zip,
      };
    }),
    companyName: userData.company_name,
    country: userData.country,
    customerName: userData.customer_name,
    customerSurname: userData.customer_surname,
    discount: userData.discount,
    email: userData.email,
    phone: userData.phone,
    status: userData.status,
    vatNo: userData.vat_no,
    wholesale: userData.wholesale,
  };
}
