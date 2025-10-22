import books from "../../models/books.js";

const updatebook=async(req,res)=>{

try {

    const{id}=req.params;
    const{title,authourname,publisher,publishedyear,language,category,description,price,totalcopies,isbn  }=req.body;


    if(!title||!authourname||!publishedyear||!totalcopies){
       return res.status(400).json({sucess:false,message:"All the fields are required "});
    }

    const data={
        title,
        authourname,
        publisher,
        publishedyear,
        language,
        category,
        description,
        price,
        totalcopies,
        isbn,
        addedby:req.user._id
    }

//    const newdata= await books.findByIdAndUpdate(id,data,{
//     new:true,
//     runValidators:true
//    })

//    if(!newdata){
//      return res.status(400).json({sucess:false,message:"Book updation is failed check the id"});
//    }

//    newdata.updatedby.push({
//     date:new Date(),
//     user:req.user._id
//    });

//    await newdata.save();


   const update2=await books.findByIdAndUpdate(id,{
    ...data,
    $push:{
        updatedby:{
            date:new Date(),
            user:req.user._id
        },
    },
},
    {
    new:true,
    runValidators:true
   })




    res.status(200).json({sucess:true,message:"Book is updated successfully",update2});


} catch (error) {
    console.log("Error",error);
    res.status(500).json({sucess:false,message:"Internal server error"})
}


}
export default updatebook;