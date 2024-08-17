const express = require("express");

const dotenv = require("dotenv");
const { formatephone } = require("./services/formatePnone");
const { checkDays } = require("./services/checkdays");
const { addTTN, add1CNumber } = require("./services/updateDeal");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/check_status/", checkDays);
app.post("/check_status/", checkDays);




// app.get("/ttn/", addTTN);
// app.get("/order/", add1CNumber);
// app.get("/formatephone", formatephone);
// app.post("/formatephone", formatephone);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
