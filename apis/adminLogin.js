const ConnectMongoDB = require("../DB/db_connect");

async function AdminLogin(req, res) {
  try {
    const db = await ConnectMongoDB();

    const collection = db.collection("admin");

    const { email, password } = req.body;
    const user = await collection.findOne({ email, password });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    res.status(200).json({
      user,
      success: true,
      message: "AdminLogin Successful",
    });
  } catch (error) {
    console.log("Adminlogin.js: ", error);
    res.status(500).json({ success: false, message: "AdminLogin Failed" });
  }
}

module.exports = { AdminLogin };
