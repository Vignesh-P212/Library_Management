import Notification from "../../models/notification.js";

 const createNotification = async ({
  recipient,
  sender,
  type,
  title,
  message,
  relatedId,
  relatedModel,
  reminderDate,
}) => {
  try {
    const notification = new Notification({
      recipient, // to address
      sender, // from address
      type,
      title,
      message,
      relatedId,
      relatedModel,
      reminderDate,
      isRead:false
    });

    await notification.save();
    console.log("🔔 Notification created:", title);
    return notification;
  } catch (error) {
    console.error("❌ Error creating notification:", error.message);
  }
};

export default createNotification;


// await createNotification({
//   recipient: req.user._id,
//   sender: req.user._id,
//   type: "Complaint",
//   title: "New Complaint Raised",
//   message: `${req.user.name} raised a new complaint: ${subject}`,
//   relatedId: complaint._id,
//   relatedModel: "Complaint",
// });
