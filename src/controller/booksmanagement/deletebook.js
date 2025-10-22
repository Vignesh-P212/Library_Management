import books from "../../models/books.js";

const deletbook=async(req,res)=>{

try {


    const {id}=req.params;    

    const data=await books.findByIdAndDelete(id);

     if(!data){
              return  res.status(200).json({sucess:true,message:"Book id is invalid "})
        }


    res.status(200).json({sucess:true,message:"Book is deleted successfully",result:data});


} catch (error) {
    console.log("Error",error);
    res.status(500).json({sucess:false,message:"Internal server error"})
}


}
export default deletbook;