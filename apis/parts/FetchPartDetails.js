const ConnectMongoDB = require("../../DB/db_connect");

async function FetchPartDetails(req, res) {
  try {
    const db = await ConnectMongoDB();
    const collection = db.collection("PartTypes");
    const data = await collection.find({ status: "active" }).toArray();

    if (data.length == 0) {
      return res.status(404).json({ message: "No Data Found" });
    } else {
      return res.status(200).json({ message: "Data Fetched", data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { FetchPartDetails };
