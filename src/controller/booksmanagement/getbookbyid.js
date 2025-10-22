import books from "../../models/books.js";

const getbookbyid=async(req,res)=>{

try {


    const {id}=req.query;    

    const data=await books.findById(id);

     if(!data){
              return  res.status(200).json({sucess:true,message:"Book id is invalid "})
        }


    res.status(200).json({sucess:true,message:"Book is retrived successfully",result:data});


} catch (error) {
    console.log("Error",error);
    res.status(500).json({sucess:false,message:"Internal server error"})
}


}
export default getbookbyid;