const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function DeletePartType(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("PartTypes");

    const { part_type_id } = req.body;

    const result = await collection.updateOne(
      { _id: ObjectId.createFromHexString(part_type_id) },
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

module.exports = { DeletePartType };
