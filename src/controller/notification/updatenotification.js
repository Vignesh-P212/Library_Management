import Notify from "../../models/notify.js";
export const markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user._id;

    const notification = await Notification.findOne({
      _id: notificationId,
      recipient: userId,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found or unauthorized.",
      });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating notification.",
      error: error.message,
    });
  }
};

//a=5
//$set{a:20}


//clearall 
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Notification.updateMany(
      { recipient: userId, isRead: false },//7  
      { $set: { isRead: true } }
    );




    res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
      updatedCount: result.modifiedCount,//7 notification cleared
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating notifications.",
      error: error.message,
    });
  }
};
