import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    // 📦 Type of transaction
    transactionType: {
      type: String,
      enum: ["Incoming", "Outgoing"], // Incoming = money received, Outgoing = money spent
      required: true,
    },

    //Admin--> library (renovation,new books,maintaince)
    //student-->library(duedate,lost)

    // 🧾 Category helps in filtering & reporting
    category: {
      type: String,
      enum: [
        "OverdueFine",
        "LostBookFine",
        "BookPurchase",
        "Maintenance",
        "NewArrival",
        "Donation",
        "Other",
      ],
      required: true,
    },

    // 💸 Amount of the transaction
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // 📅 Date of transaction
    date: {
      type: Date,
      default: Date.now,
    },

    // 🧍‍♂️ For student-related payments (like fines)
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    // 📚 If related to a borrow record (fine)
    borrowRecord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BorrowRecord",
    },

    // 📗 If related to a specific book (purchase or loss)
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },

    // 🧾 Mode of payment
    paymentMode: {
      type: String,
      enum: ["Cash", "Card", "Online", "UPI", "BankTransfer", "Other"],

    },

    // 💵 Payment status (mainly for incoming)
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },

    // 🧑‍💼 Approved or added by staff
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📘 Optional notes or description

    //info in others what purpose
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
