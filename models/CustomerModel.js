import mongoose from "mongoose";

const Customer= mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    kota: {
      type: String,
      required: true
    },
    namaPICRS: {
      type: String,
      required: true
    },
    noHpPICRS: {
      type: String,
      required: true
    },
    namaAdminRS:{
      type: String,
      required: true,
    },
    noHpAdminRS: {
      type: String,
      required: true
    }
  });

export default mongoose.model("Customer", Customer);
