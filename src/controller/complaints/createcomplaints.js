import Complaint from "../models/complaint.js";
import createNotification from "../notification/createnotification.js";

 const createComplaint = async (req, res) => {
  try {
    const { category, subject, description, book, transaction } = req.body;

    const complaint = await Complaint.create({
      raisedBy: req.user._id, // assuming you have user info in req.user
      userType: req.user.role === "student" ? "Student" : "User",
      category,
      subject,
      description,
      book,
      transaction,
      status:"pending"
    });

  await createNotification({
  recipient: adminId,
  sender: req.user._id,
  type: "Complaint",
  title: "New Complaint Raised",
  message: `${req.user.name} raised a new complaint: ${subject}`,
  relatedId: complaint._id,
  relatedModel: "Complaint",
});

    res.status(201).json({
      success: true,
      message: "Complaint raised successfully.",
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating complaint.",
      error: error.message,
    });
  }
};

export default createComplaint;
