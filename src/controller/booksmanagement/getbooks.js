import books from "../../models/books.js";

const getbook=async(req,res)=>{

try {



    const data=await books.find();

     if(data.length===0){
              return  res.status(200).json({sucess:true,message:"No books Found "})
        }


    res.status(200).json({sucess:true,message:"Book is retrived successfully",result:data});


} catch (error) {
    console.log("Error",error);
    res.status(500).json({sucess:false,message:"Internal server error"})
}


}
export default getbook;