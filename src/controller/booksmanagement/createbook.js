import books from "../../models/books.js";

const book=async(req,res)=>{

try {


    const{title,authourname,publisher,publishedyear,language,category,description,price,totalcopies,isbn  }=req.body;


    if(!title||!authourname||!publishedyear||!totalcopies){
       return res.status(400).json({sucess:false,message:"All the fields are required "});
    }

    const existbook=await books.findOne({isbn:isbn});
    if(existbook){
         return res.status(400).json({sucess:false,message:"Book is already available please update the count"});
    }

    const data=new books({
        title,
        authourname,
        publisher,
        publishedyear,
        language,
        category,
        description,
        price,
        totalcopies,
        availablecopies:totalcopies,
        isbn,
        addedby:req.user._id
    })    
    await data.save();


    res.status(200).json({sucess:true,message:"Book is created successfully"},data);


} catch (error) {
    console.log("Error",error);
    res.status(500).json({sucess:false,message:"Internal server error"})
}


}
export default book;