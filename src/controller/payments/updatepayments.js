 import Transaction from "../models/transaction.js";
 
 const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {paymentMode,paymentStatus} = req.body;

    const updated = await Transaction.findByIdAndUpdate(id, paymentMode,paymentStatus, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export default updateTransaction;