export const getAllBookRequests = async (req, res) => {
  try {
    const { status, sortBy } = req.query;

    const filter = {};
    if (status) filter.status = status;//{status:pending} //{}

    const sortOptions = {};
    if (sortBy === "votecount") sortOptions.voteCount = -1;
    else sortOptions.createdAt = -1;

// vote count 5 20 17 13 4 2
//createdat 5  17/10 16/10 16/10 15/10



    const requests = await BookRequest.find(filter)
      .populate("requestedBy", "name rollNo")
      .populate("handledBy", "name role")
      .sort(sortOptions);

    res.status(200).json({
      success: true,
      total: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};






















export const getBookRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await BookRequest.findById(id)
      .populate("requestedBy", "name rollNo")
      .populate("handledBy", "name role");

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};