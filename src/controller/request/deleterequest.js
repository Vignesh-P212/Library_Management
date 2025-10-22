export const deleteBookRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await BookRequest.findById(id);

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    // Only admin or original student can delete
    if (req.user.role !== "admin" && req.user.id !== request.requestedBy.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized action." });
    }

    await request.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book request deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};