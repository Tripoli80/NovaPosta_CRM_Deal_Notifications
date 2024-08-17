const libphonenumber = require("libphonenumber-js");
const { typePhoneNumber } = require("../constants");
const { updateCrmEntityFields } = require("./updateStage");
function formatter(number, country = "UA", type = typePhoneNumber.national) {
  const { findPhoneNumbersInText } = libphonenumber;

  const phones = findPhoneNumbersInText(number, country);

  if (phones.length > 0) {
    const phone = phones[0];
    let formatedPhone;

    switch (type) {
      case typePhoneNumber.international:
        formatedPhone = phone.number.number;
        break;
      case typePhoneNumber.national:
        formatedPhone = `0${phone.number.nationalNumber}`;
        break;
      case typePhoneNumber.nationalplus:
        formatedPhone = `80${phone.number.nationalNumber}`;

        break;
      case typePhoneNumber.mininternational:
        formatedPhone = `${phone.number.countryCallingCode}${phone.number.nationalNumber}`;

        break;
      default:
        formatedPhone = number;
        break;
    }

    if (formatedPhone == number) {
      return false;
    }

    return formatedPhone;
  } else {
    return false;
  }
}
module.exports = formatter;
