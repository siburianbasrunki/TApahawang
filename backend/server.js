const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./dbconnect");
const villaApi = require("./api/villa");
const donasiApi = require("./api/donasi");
const transportasiApi = require("./api/trasnportasi");
const merchApi = require("./api/merch");
const volunteerApi = require("./api/volunteer");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", villaApi);
app.use("/api", donasiApi);
app.use("/api", transportasiApi);
app.use("/api", merchApi);
app.use("/api", volunteerApi);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
