 import Transaction from "../models/transaction.js";
 
 const getTransactionById = async (req, res) => {
  try {
    
    
    const transaction = await Transaction.find()


    if (transaction.length==0) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export default getTransactionById