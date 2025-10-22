import borrow from "../models/borrow.js";
import books from "../models/books.js";
import register from "../models/register.js";

// ============================
// 📍 1️⃣ Create Borrow Record
// ============================

export const createBorrow = async (req, res) => {
  try {
    const {
      bookid,
      studendid,
      approveid,
      borrowdate,
      expectedreturndate,
      noofdays,
    } = req.body;

    // Check if student & book exist
    const book = await books.findById(bookid);
    const student = await register.findById(studendid);

    if (!book || !student)
      return res.status(404).json({ success: false, message: "Book or Student not found" });

    // Check if book available
    if (book.copies <= 0)
      return res.status(400).json({ success: false, message: "Book not available" });

    // Create borrow record
    const newBorrow = await borrow.create({
      bookid,
      studendid,
      approveid,
      borrowdate: borrowdate || new Date(),
      expectedreturndate,
      noofdays,
      status: "borrowed",
    });

    // Decrease book count
    book.copies -= 1;
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: newBorrow,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error borrowing book" });
  }
};



// ============================
// 📍 2️⃣ Update Borrow Record
// ============================
// Cases: "return", "duedate", "lost", "renew", "duedate+lost"
// ============================

export const updateBorrow = async (req, res) => {
  try {
    const { borrowId } = req.params;
    const { caseType, approveid } = req.body;

    const record = await borrow.findById(borrowId);
    if (!record) return res.status(404).json({ success: false, message: "Borrow record not found" });

    // Fetch book to update copies if needed
    const book = await books.findById(record.bookid);

    switch (caseType) {
      // ✅ Case 1: Book Returned
      case "return":
        record.returndate = new Date();
        record.returnapprovedby = approveid;
        record.status = "returned";
        if (book) {
          book.copies += 1;
          await book.save();
        }
        break;

      // ✅ Case 2: Book is Due (not returned yet)
      case "duedate":
        record.status = "duedate";
        record.penalty.haspeanlty = true;
        record.penalty.reason = "Due Date Exceeded";
        record.penalty.amount = calculatePenalty(record.expectedreturndate);
        break;

      // ✅ Case 3: Book Lost
      case "lost":
        record.status = "lost";
        record.penalty.haspeanlty = true;
        record.penalty.reason = "Book Lost";
        record.penalty.amount = calculateLostPenalty(book.price);
        break;

      // ✅ Case 4: Renew
      case "renew":
        const { newduedate } = req.body;
        record.status = "renewed";
        record.renewdate = new Date();
        record.renewdapprovedby = approveid;
        record.renewhistory.push({
          renewdate: new Date(),
          newduedate,
          approveby: approveid,
        });
        record.expectedreturndate = newduedate;
        break;

      // ✅ Case 5: Due Date + Lost
      case "duedate+lost":
        record.status = "lost";
        record.penalty.haspeanlty = true;
        record.penalty.reason = "Book Lost after Due Date";
        record.penalty.amount =
          calculatePenalty(record.expectedreturndate) + calculateLostPenalty(book.price);
        break;

      default:
        return res.status(400).json({ success: false, message: "Invalid case type" });
    }

    await record.save();
    res.status(200).json({ success: true, message: `${caseType} updated successfully`, data: record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error updating borrow record" });
  }
};



// ============================
// 📍 Helper Functions
// ============================

// Penalty for due date (₹10 per day after expected return)
const calculatePenalty = (expectedDate) => {
  const today = new Date();
  const daysLate = Math.ceil((today - new Date(expectedDate)) / (1000 * 60 * 60 * 24));
  return daysLate > 0 ? daysLate * 10 : 0;
};

// Penalty for lost book = full price * 1.2 (20% extra)
const calculateLostPenalty = (price) => {
  return price ? price * 1.2 : 200; // fallback penalty if price not found
};
