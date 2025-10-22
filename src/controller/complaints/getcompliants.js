import Complaint from "../models/complaint.js";
 const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("raisedBy", "name email")
      .populate("handledBy", "name email")
      .populate("book", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching complaints.",
      error: error.message,
    });
  }
};
export default getAllComplaints;