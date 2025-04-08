const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function EditPartType(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("PartTypes");

    const { part_type_id, carId, name, description, images } = req.body;

    const existing = await collection.findOne({
      _id: ObjectId.createFromHexString(part_type_id),
    });

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Part Type not found" });
    }

    const updatedData = {
      carId: carId ? ObjectId.createFromHexString(carId) : existing.carId,
      name: name || existing.name,
      description: description || existing.description,
      images: images || existing.images,
    };

    const result = await collection.updateOne(
      { _id: ObjectId.createFromHexString(part_type_id) },
      { $set: updatedData }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        success: true,
        message: "Part Type updated successfully",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No changes made",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { EditPartType };
