 import Transaction from "../models/transaction.js";
 
 const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id)
      .populate("student", "name email")
      .populate("book", "title author")
      .populate("approvedBy", "firstname lastname");

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export default getTransactionById