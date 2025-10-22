import Complaint from "../models/complaint.js";


 const updateComplaint = async (req, res) => {
  try {
    const { status, response } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    // Update fields
    if (status) complaint.status = status;
    if (response) complaint.response = response;
    if (status === "Resolved") complaint.resolvedAt = new Date();
    
    complaint.handledBy = req.user._id;

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully.",
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating complaint.",
      error: error.message,
    });
  }
};
export default updateComplaint;