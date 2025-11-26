import Notification from "../../models/notification.js";

 const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id; // assuming user is authenticated
    // my own id
    //to my id 


    // .sort(field:1)
    // 1 asc
    // -1 desc  

    // to user id notifiaction
    const notifications = await Notification.find({ recipient: userId ,isRead:false})
      .sort({ createdAt: -1 })
      .limit(7); // optional limit

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notifications.",
      error: error.message,
    });
  }
}
export default getNotifications;