import mongoose, {Schema} from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required : true  
    },
    username :{
        type: String,
        required : true, 
        unique : true,
    },
    password :{
        type :Number,
        required : true, 
    },
    token:{
        type: String,
    }

}
)

const User = mongoose.model("User", userSchema);

export {user} ;
