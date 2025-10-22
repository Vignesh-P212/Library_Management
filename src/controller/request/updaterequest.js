export const updateBookRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;
    const handledBy = req.user.id; // assuming admin logged in

    const updatedRequest = await BookRequest.findByIdAndUpdate(
      id,
      { status, adminNote, handledBy },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    res.status(200).json({
      success: true,
      message: "Book request updated successfully.",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};