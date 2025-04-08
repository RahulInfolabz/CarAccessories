const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function DeleteAccessoryStatus(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("Accessories");

    const { accessory_id } = req.body;

    const result = await collection.updateOne(
      { _id: ObjectId.createFromHexString(accessory_id) },
      { $set: { status: "inactive" } }
    );

    if (result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Status updated successfully" });
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

module.exports = { DeleteAccessoryStatus };
