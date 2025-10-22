export const toggleUpvote = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;

    const request = await BookRequest.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    const alreadyVoted = request.upvotes.includes(studentId);

    if (alreadyVoted) {
      // Remove vote
      request.upvotes.pull(studentId);
      request.voteCount -= 1;
    } else {
      // Add vote
      request.upvotes.push(studentId);
      request.voteCount += 1;
    }

    await request.save();

    res.status(200).json({
      success: true,
      message: alreadyVoted
        ? "Upvote removed successfully."
        : "Upvote added successfully.",
      data: request,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};