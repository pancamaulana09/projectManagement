import Permintaan from "../models/PermintaanModel.js";



// get all data perminatan 
export const getPermintaan = async (req, res) => {
  try {
    const permintaan = await Permintaan.find();
    res.json(permintaan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





