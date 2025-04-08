const ConnectMongoDB = require("../../DB/db_connect");

async function AddContactUs(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("ContactUs");

    const { name, email, phone, message } = req.body;

    await collection.insertOne({
      name,
      email,
      phone,
      message,
      status: "pending",
      timestamp: new Date(),
    });

    return res.status(200).json({ message: "Contact Inquiry Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddContactUs };
