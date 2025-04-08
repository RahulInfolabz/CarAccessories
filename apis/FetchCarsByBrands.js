const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../DB/db_connect");

async function FetchCarsByBrands(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("Cars");

    const { brandId } = req.params;

    const data = await collection
      .find({ "brandId._id": ObjectId.createFromHexString(brandId) })
      .toArray();

    if (data.length == 0) {
      return res.status(404).json({ message: "No Data Found" });
    } else {
      return res
        .status(200)
        .json({ message: "Data Fetched", total: data.length, Cars: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { FetchCarsByBrands };
