import mongoose from "mongoose";


const bookSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required:true,
            trim:true
        },
        author : {
            type:String,
            required:true,
            trim:true
        },
        status : {
            type:String,
            enum : ["reading" , "finished" , "wishlist"],
            default:"wishlist"
        }
    },{
        timestamps:true
    }
);

const Book = mongoose.model("Book" , bookSchema);

export default Book;