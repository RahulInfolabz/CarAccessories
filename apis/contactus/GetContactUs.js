const ConnectMongoDB = require("../../DB/db_connect");

async function GetAllContactUs(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("ContactUs");

    const contactUsList = await collection
      .find({})
      .sort({ timestamp: -1 }) // Latest first
      .toArray();

    return res.status(200).json({
      success: true,
      data: contactUsList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { GetAllContactUs };
