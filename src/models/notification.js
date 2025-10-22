
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // 🧍‍♂️ Who should receive this notification (student or staff)
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // can be Student or Employee (you can use same base User model or union)
      required: true,
    },

    // 📣 Who triggered this notification (optional)
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    ///r-->admin  and sender--->student type compliant 
    //r---strudent and sender--->library type overdue

    // 🔔 Type of notification
    type: {
      type: String,
      enum: [
        "Complaint",//---admin
        "BookRequest",//---admin
        "RenewalReminder",//---student
        "OverdueNotice",//---strudent
        "FineAdded",//---studnet fine pending,paid
        "General",//---student 
      ],
      required: true,
    },

    // 📝 Title or short summary
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // 📄 Detailed message
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // 🧩 Link or reference to another entity (complaint, request, borrow record, etc.)
   

    // 👀 Has the user seen the notification?
    isRead: {
      type: Boolean,
      default: false,
    },
//false --- true 



    // 🗓️ Auto timestamps
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
