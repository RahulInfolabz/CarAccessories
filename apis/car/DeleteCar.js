const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function DeleteCar(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("Cars");

    const { car_id } = req.body;

    const result = await collection.updateOne(
      { _id: ObjectId.createFromHexString(car_id) },
      { $set: { status: "inactive" } }
    );

    if (result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Car status updated" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "No changes made" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { DeleteCar };
