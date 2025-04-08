const express = require("express");
const cors = require("cors");
const { AddAccessory } = require("./apis/accessory/AddAccessory");
const { AddCar } = require("./apis/car/AddCar");
const { AddBrand } = require("./apis/carBrands/AddCarBrand");
const { AddCarInquiry } = require("./apis/carInquiry/AddCarInq");
const { AddPartType } = require("./apis/parts/AddPartDetails");
const { FetchAccessoriesByCars } = require("./apis/FetchAccessoriesByCar");
const { FetchCarsByBrands } = require("./apis/FetchCarsByBrands");
const { AdminLogin } = require("./apis/adminLogin");
const { AddContactUs } = require("./apis/contactus/AddContactUs");
const { EditCarBrand } = require("./apis/carBrands/EditCarBrand");
const { DeleteBrandStatus } = require("./apis/carBrands/DeleteCarBrand");
const { EditCar } = require("./apis/car/EditCar");
const { DeleteCar } = require("./apis/car/DeleteCar");
const { EditPartType } = require("./apis/parts/EditPartDetails");
const { DeletePartType } = require("./apis/parts/DeletePartDetails");
const { DeleteAccessoryStatus } = require("./apis/accessory/DeleteAccessory");
const { EditAccessory } = require("./apis/accessory/EditAccessory");
const { GetAllContactUs } = require("./apis/contactus/GetContactUs");
const { GetInquiriesByCarId } = require("./apis/carInquiry/GetCarWiseInquiry");
const { FetchCarBrands } = require("./apis/carBrands/FetchCarBrands");
const { FetchCar } = require("./apis/car/FetchCar");
const { FetchPartDetails } = require("./apis/parts/FetchPartDetails");
const { FetchAccessory } = require("./apis/accessory/FetchAccessory");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 8000;
app.use(cors());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.post("/admin/login", AdminLogin);

app.post("/addcarbrand", AddBrand);
app.post("/editcarbrand", EditCarBrand);
app.post("/deletecarbrand", DeleteBrandStatus);
app.get("/fetchCarBrands", FetchCarBrands);

app.post("/addcar", AddCar);
app.post("/editcar", EditCar);
app.post("/deletecar", DeleteCar);
app.get("/fetchcars", FetchCar);

app.post("/addpartdetail", AddPartType);
app.post("/editpartdetail", EditPartType);
app.post("/deletepartdetail", DeletePartType);
app.get("/fetchpartdetail", FetchPartDetails);

app.post("/addaccessory", AddAccessory);
app.post("/editaccessory", EditAccessory);
app.post("/deleteaccessory", DeleteAccessoryStatus);
app.get("/getaccessory", FetchAccessory);

app.post("/addcontactus", AddContactUs);
app.get("/getAllContactUs", GetAllContactUs);

app.post("/addcarinq", AddCarInquiry);
app.post("/getCatWiseInquiry", GetInquiriesByCarId);

// Fetch Car Accessories
app.get("/fetchCarsByBrands/:brandId", FetchCarsByBrands);
app.get("/fetchAccessoriesByCar/:carId", FetchAccessoriesByCars);

app.listen(port, () => {
  console.log("Server started on port", port);
});
