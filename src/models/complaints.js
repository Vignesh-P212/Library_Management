import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    // 🧾 Who raised the complaint (Student or Employee)
    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "userType", // dynamic reference (Student or User)
      required: true,
    },

    // created 

    // 👤 To differentiate between student & employee
    userType: {
      type: String,
      enum: ["Student", "User"], // 'User' = employee/staff/admin
      required: true,
    },

    // 🏷️ Type/category of complaint
    category: {
      type: String,
      enum: [
        "BookIssue",       // Missing, damaged, or wrong book
        "SystemIssue",     // App or system related
        "FineDispute",     // Disagreement on fines
        "StaffBehaviour",  // Complaint about staff
        "Maintenance",     // Cleanliness, lights, AC, etc.
        "Other",
      ],
      required: true,
    },

    // 📝 Complaint subject (short title)
    subject: {
      type: String,
      required: true,
      trim: true,
    },

    // 🧠 Detailed description of the issue
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // 📎 Optional related book or transaction
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },

    // 🗓️ Status tracking
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending",
    },

    // 🧑‍💼 Staff who handled/resolved it
    handledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    //aprove or reject 
    // 💬 Admin/staff remarks on resolution
    response: {
      type: String,
      trim: true,
    },

    // 📅 Optional resolution date
    resolvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
