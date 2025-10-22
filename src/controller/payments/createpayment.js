import Transaction from "../models/transaction.js";

//data is object
 const createTransaction = async (data) => {
  try {
    const transaction = new Transaction({
      transactionType: data.transactionType, // "Incoming" or "Outgoing"
      category: data.category, // e.g., "OverdueFine", "LostBookFine", etc.
      amount: data.amount,
      student: data.student || null,
      borrowRecord: data.borrowRecord || null,
      book: data.book || null,
      paymentMode: data.paymentMode || null,
      paymentStatus: data.paymentStatus || "Pending",
      approvedBy: data.approvedBy,
      description: data.description || "",
    });

    await transaction.save();
    console.log("✅ Transaction recorded successfully:", transaction._id);
    return transaction;
  } catch (error) {
    console.error("❌ Error creating transaction:", error.message);
    throw new Error("Failed to create transaction");
  }
};

export default createTransaction;

