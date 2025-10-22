import borrow from "../models/borrow&return.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";
import Student from "../models/student.js"; // if you have separate Student model
import Attendance from "../models/attendance.js"; // if you track logins by attendance

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    /* ================================
       1️⃣ BORROW STATISTICS
    ================================ */
    const totalBorrowed = await borrow.countDocuments({ status: "borrowed" });
    const totalReturned = await borrow.countDocuments({ status: "returned" });
    const totalLost = await borrow.countDocuments({ status: "lost" });

    const monthlyBorrowStats = await borrow.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    /* ================================
       2️⃣ USER LOGIN TRACKING
       (assuming you log each login in Attendance or Session)
    ================================ */
    const monthlyLoginStats = await Attendance.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          logins: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const totalStudents = await Student.countDocuments();
    const totalUsers = await User.countDocuments();

    /* ================================
       3️⃣ PAYMENT TRACKING (from Transaction)
    ================================ */
    const totalIncoming = await Transaction.aggregate([
      { $match: { transactionType: "Incoming" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalOutgoing = await Transaction.aggregate([
      { $match: { transactionType: "Outgoing" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const monthlyPaymentStats = await Transaction.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          totalIncoming: {
            $sum: {
              $cond: [
                { $eq: ["$transactionType", "Incoming"] },
                "$amount",
                0,
              ],
            },
          },
          totalOutgoing: {
            $sum: {
              $cond: [
                { $eq: ["$transactionType", "Outgoing"] },
                "$amount",
                0,
              ],
            },
          },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    /* ================================
       🧾 FINAL RESPONSE
    ================================ */
    res.status(200).json({
      success: true,
      data: {
        borrowStats: {
          totalBorrowed,
          totalReturned,
          totalLost,
          monthlyBorrowStats,
        },
        userStats: {
          totalStudents,
          totalUsers,
          monthlyLoginStats,
        },
        paymentStats: {
          totalIncoming: totalIncoming[0]?.total || 0,
          totalOutgoing: totalOutgoing[0]?.total || 0,
          monthlyPaymentStats,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error loading dashboard stats.",
      error: error.message,
    });
  }
};
