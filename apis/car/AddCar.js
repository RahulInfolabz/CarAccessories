const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function AddCar(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("Cars");

    const { brandId, name, year, images, description } = req.body;

    await collection.insertOne({
      brandId: ObjectId.createFromHexString(brandId),
      name,
      year,
      images,
      description,
      status: "active",
      timestamp: new Date(),
    });

    return res.status(200).json({ message: "Car Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddCar };
