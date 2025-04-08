const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function EditCarBrand(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("Brands");

    const { brand_id, name, logo, country, description } = req.body;

    // Fetch existing data
    const existing = await collection.findOne({
      _id: ObjectId.createFromHexString(brand_id),
    });

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    const updatedData = {
      name: name || existing.name,
      logo: logo || existing.logo,
      country: country || existing.country,
      description: description || existing.description,
    };

    const result = await collection.updateOne(
      { _id: ObjectId.createFromHexString(brand_id) },
      { $set: updatedData }
    );

    if (result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Brand updated successfully" });
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

module.exports = { EditCarBrand };
