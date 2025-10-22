import mongoose from "mongoose";

const bookRequestSchema = new mongoose.Schema(
  {
    // 🧾 Book name or title being requested
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // ✍️ Author name (optional but helpful)
    author: {
      type: String,
      trim: true,
    },

    // 📘 Optional category or genre
    category: {
      type: String,
      trim: true,
    },

    // 🧑‍🎓 Student who created the request 
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    // 💬 Short reason or note for why they want this book
    reason: {
      type: String,
      trim: true,
    },

    // 👍 List of students who upvoted this request
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // 🔢 Cached total vote count for quick sorting/filtering
    voteCount: {
      type: Number,
      default: 0,
    },

    // 🗓️ Status of the request
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Pending"],
      default: "Pending",
    },

    // 🧑‍💼 If processed, who handled it emplolyyee whonchanged the status
    handledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 🗒️ Optional admin note
    adminNote: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BookRequest", bookRequestSchema);
