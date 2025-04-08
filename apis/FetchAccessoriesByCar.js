const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../DB/db_connect");

async function FetchAccessoriesByCars(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("Packages");

    const { carId } = req.params;

    const data = await collection
      .find({ "carId": ObjectId.createFromHexString(carId) })
      .toArray();

    if (data.length == 0) {
      return res.status(404).json({ message: "No Data Found" });
    } else {
      return res.status(200).json({
        message: "Data Fetched",
        total: data.length,
        Acessories: data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { FetchAccessoriesByCars };
