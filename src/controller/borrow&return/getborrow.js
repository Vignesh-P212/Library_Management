import borrow from "../../models/borrow&return.js";
import books from "../../models/books.js";
import register from "../../models/register.js";
import user from "../../models/user.js";

// ✅ GET all borrows or single borrow by ID
export const getborrow = async (req, res) => {
  try {
    const { id } = req.params;

    // If id is provided → get specific borrow record
    // one borrow
    if (id) {
      const singleBorrow = await borrow
        .findById(id)
        .populate("bookid", "title author price")
        .populate("studendid", "name dept email phone")
        .populate("approveid", "name role")
        .populate("returnapprovedby", "name role")
        .populate("renewdapprovedby", "name role")
        .populate("renewhistory.approveby", "name role");

      if (!singleBorrow) {
        return res
          .status(404)
          .json({ success: false, message: "Borrow record not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Borrow record fetched", data: singleBorrow });
    }

    const data=await borrow.find();
//all 

    // If no id → fetch all records
    const allBorrows = await borrow.find()
      .populate("bookid", "title author price")
      .populate("studendid", "name dept email phone")
      .populate("approveid", "name role")
      .populate("returnapprovedby", "name role")
      .populate("renewdapprovedby", "name role")
      .populate("renewhistory.approveby", "name role");

    if (allBorrows.length === 0) {
      return res.status(200).json({ success: true, message: "No borrow records found", data: [] });
    }

    res.status(200).json({
      success: true,
      message: "All borrow records fetched successfully",
      data: allBorrows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching borrow data" });
  }
};
