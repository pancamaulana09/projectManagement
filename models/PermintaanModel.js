import mongoose from "mongoose";

const Permintaan = mongoose.Schema({
    noPrab: {
      type: String,
      required: true,
    },
    namaSales: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    noPNWRN: {
      type: String,
      required: true
    },
    nilaiPNWRN: {
      type: String,
      required: true
    },
    noSPK: {
      type: String,
      required: true
    },
    nilaiSPK:{
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true
    },
    kategori: {
        type: String,
        required: true
    },
    keterangan: {
      type: String,
      required: true
    }
  });

export default mongoose.model("Permintaan", Permintaan);
