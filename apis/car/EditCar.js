const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function EditCar(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("Cars");

    const { car_id, brandId, name, year, images, description } = req.body;

    const existing = await collection.findOne({
      _id: ObjectId.createFromHexString(car_id),
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    const updatedCar = {
      brandId: brandId
        ? ObjectId.createFromHexString(brandId)
        : existing.brandId,
      name: name || existing.name,
      year: year || existing.year,
      images: images || existing.images,
      description: description || existing.description,
    };

    const result = await collection.updateOne(
      { _id: ObjectId.createFromHexString(car_id) },
      { $set: updatedCar }
    );

    if (result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Car updated successfully" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "No changes were made" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { EditCar };
