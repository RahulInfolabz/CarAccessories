const { ObjectId } = require("mongodb");
const ConnectMongoDB = require("../../DB/db_connect");

async function GetInquiriesByCarId(req, res) {
  try {
    const db = await ConnectMongoDB();
    const inquiriesCollection = db.collection("Inquiries");

    const { carId } = req.body;

    if (!carId) {
      return res
        .status(400)
        .json({ success: false, message: "Car ID is required" });
    }

    const pipeline = [
      {
        $match: { carId: ObjectId.createFromHexString(carId) },
      },
      {
        $lookup: {
          from: "Cars",
          localField: "carId",
          foreignField: "_id",
          as: "carDetails",
        },
      },
      {
        $unwind: "$carDetails",
      },
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          message: 1,
          status: 1,
          timestamp: 1,
          carName: "$carDetails.name",
        },
      },
      {
        $sort: { timestamp: -1 },
      },
    ];

    const result = await inquiriesCollection.aggregate(pipeline).toArray();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { GetInquiriesByCarId };
