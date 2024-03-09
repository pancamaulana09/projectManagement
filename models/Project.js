import mongoose from "mongoose";

const Project = mongoose.Schema({
    idSpk: {
      type: String,
      required: true,
    },
    idProjek: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    wip: {
      type: String,
      required: true
    },
    keteranganPengawas: {
      type: String,
      required: true
    },
  });

export default mongoose.model("Project", Project);
