const { typePhoneNumber } = require("../constants");
const formatter = require("../utils/formatPhoneServices");
const { updateCrmEntityFields, getCrmEntity } = require("../utils/updateStage");

const formatephone = async (req, res) => {
  const { country = "UA", typecrm, id } = req.query;

  if (!id || !typecrm) {
    res.code = 401;
    return res.json({ message: "Bad request" });
  }

  const data = await getCrmEntity({ id }, typecrm);
  const { PHONE: phones = [] } = data;

  if (!data) {
    res.code = 404;
    return res.json({ message: "Can not find" });
  }

  if (!phones || phones.length === 0) {
    res.code = 401;
    return res.json({ message: "Can not find phone" });
  }

  let needChangeCrm = false;
  let arrayPhones = phones.map((phone) => phone.VALUE);
  let arrayToDelete = phones.map((phone) => ({ ...phone, VALUE: "" }));

  const formateElse = (phone, typePhoneNumber) => {
    const resultNational = formatter(phone.VALUE, country, typePhoneNumber);

    if (resultNational && !arrayPhones.includes(resultNational)) {
      needChangeCrm = true;

      const newPhone = {
        VALUE: resultNational,
        VALUE_TYPE: phone.VALUE_TYPE,
      };
      phones.push(newPhone);
    }
    return needChangeCrm;
  };

  phones.map((phone, index) => {
    const international = formatter(
      phone.VALUE,
      country,
      typePhoneNumber.mininternational
    );
    if (international && !arrayPhones.includes(international)) {
      needChangeCrm = true;
      phones[index].VALUE = international;
    }
    needChangeCrm = formateElse(phone, typePhoneNumber.national);
    needChangeCrm = formateElse(phone, typePhoneNumber.international);
    needChangeCrm = formateElse(phone, typePhoneNumber.nationalplus);
  });

  const uniquePhones = Array.from(
    new Set(phones.map(({ VALUE }) => VALUE))
  ).map((value) => ({
    VALUE: value,
    VALUE_TYPE: phones.find((phone) => phone.VALUE === value).VALUE_TYPE,
  }));
  const fields = {
    PHONE: uniquePhones,
  };

  if (!needChangeCrm) {
    res.code = 401;
    console.log("🚀 ~ file: Nothing edit ");
    return res.json({ message: "nothing edit " });
  }
  //   console.log("🚀 ~ file: formatePnone.js:86 ~ fields:", fields);
  // remove all phone

  await updateCrmEntityFields(
    { dealId: id, fields: { PHONE: arrayToDelete } },
    typecrm
  );

  await updateCrmEntityFields({ dealId: id, fields }, typecrm);

  res.code = 200;
  res.json({ fields });
};

module.exports = { formatephone };
