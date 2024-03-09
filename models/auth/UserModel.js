import mongoose from "mongoose";

const UserSchema= mongoose.Schema({
    name: {
      type: String,
      required: true,
      
    },
    email:{
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: 6
    },
    role : {
        type: String,
        required: true,
        default: "sales"
    }
  });

export default mongoose.model("User", UserSchema);
