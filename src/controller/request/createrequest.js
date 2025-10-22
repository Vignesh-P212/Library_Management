import BookRequest from "../models/bookRequest.js";
import Student from "../models/student.js";
import User from "../models/user.js";


export const createBookRequest = async (req, res) => {
  try {
    const { title, author, category, reason } = req.body;
    const requestedBy = req.user.id; // assuming JWT middleware sets req.user

    const newRequest = await BookRequest.create({
      title,
      author,
      category,
      reason,
      requestedBy,
    });

    res.status(201).json({
      success: true,
      message: "Book request created successfully.",
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

