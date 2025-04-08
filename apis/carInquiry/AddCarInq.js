const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function AddCarInquiry(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("Inquiries");

    const { name, email, phone, accessoryId, message } = req.body;

    await collection.insertOne({
      accessoryId: ObjectId.createFromHexString(accessoryId),
      name,
      email,
      phone,
      message,
      status: "Pending",
      timestamp: new Date(),
    });

    return res.status(200).json({ message: "Inquiry Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddCarInquiry };
