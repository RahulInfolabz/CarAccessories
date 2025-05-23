const ConnectMongoDB = require("../../DB/db_connect");

async function AddContactUs(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("ContactUs");

    const { name, email, subject, phone, message } = req.body;

    await collection.insertOne({
      name,
      email,
      phone,
      subject,
      message,
      status: "pending",
      timestamp: new Date(),
    });

    return res
      .status(200)
      .json({ success: true, message: "Contact Inquiry Submitted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { AddContactUs };
