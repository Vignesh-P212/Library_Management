import recordlogut from "../sattendance/loguttracker.js"
const logout = async (req, res) => {
try {
  
recordlogut(req.user._id);
res.clearCookie("token",{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"strict",
    maxAge:24*60*60*1000}).status(200).json({sucess:true,message:"Logout successfully"});
// res.status(200).json({sucess:true,message:"Logout successfully"});

} catch (error) {
    console.log("Error",error);
    res.status(500).json({sucess:false,message:"Internal server error"})    
}
}
export default logout;  