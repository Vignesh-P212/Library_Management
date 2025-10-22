import borrow from "../../models/borrow&return.js";
import books from "../../models/books.js";
import register from "../../models/register.js";
import user from "../../models/user.js";

 const deleteborrow = async (req, res) => {
  try {
    const { id } = req.params;

    const exist = await borrow.findById(id);
    if (!exist) {
      return res.status(404).json({ success: false, message: "Borrow record not found" });
    }

    const book = await books.findById(exist.bookid);
    const student = await register.findById(exist.studendid);

    // If the book was still marked as borrowed or renewed, restore book copies and student limit



    if (exist.status === "borrowed" || exist.status === "renewed") {
      if (book) {
        book.totalcopies += 1;
        await book.save();
      }
      if (student) {
        student.limit += 1;
        await student.save();
      }
    }

    // Finally delete the borrow record
    await borrow.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Borrow record deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting borrow record" });
  }
};
export default deleteborrow;