const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function AddAccessory(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("Accessories");

    const {
      carId,
      name,
      code,
      colors,
      weight,
      brand,
      gaurantee,
      price,
      stock,
      images,
      description,
    } = req.body;

    await collection.insertOne({
      carId: ObjectId.createFromHexString(carId),
      name,
      code,
      colors,
      weight,
      brand,
      gaurantee,
      price,
      stock,
      images,
      description,
      status: "active",
      timestamp: new Date(),
    });

    return res.status(200).json({ message: "Accessory Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddAccessory };
