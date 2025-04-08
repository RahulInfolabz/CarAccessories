const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function EditAccessory(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("Accessories");

    const {
      accessory_id,
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

    const existing = await collection.findOne({
      _id: ObjectId.createFromHexString(accessory_id),
    });

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Accessory not found" });
    }

    const updatedData = {
      carId: carId ? ObjectId.createFromHexString(carId) : existing.carId,
      name: name || existing.name,
      code: code || existing.code,
      colors: colors || existing.colors,
      weight: weight || existing.weight,
      brand: brand || existing.brand,
      gaurantee: gaurantee || existing.gaurantee,
      price: price || existing.price,
      stock: stock || existing.stock,
      images: images || existing.images,
      description: description || existing.description,
    };

    const result = await collection.updateOne(
      { _id: ObjectId.createFromHexString(accessory_id) },
      { $set: updatedData }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        success: true,
        message: "Accessory updated successfully",
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

module.exports = { EditAccessory };
