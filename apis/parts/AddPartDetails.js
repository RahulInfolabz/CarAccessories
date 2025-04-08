const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function AddPartType(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("PartTypes");

    const { carId, name, description, image } = req.body;

    await collection.insertOne({
      carId: ObjectId.createFromHexString(carId),
      name,
      description,
      image,
      status: "active",
      timestamp: new Date(),
    });

    return res.status(200).json({ message: "Part Type Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddPartType };
