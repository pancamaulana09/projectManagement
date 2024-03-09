import express from "express";
import {
  getCustomers,
  getCustomersById,
  saveCustomer,
  updateCustomer,
  deleteCustomer
} from "../controller/CustomerController.js";

import {
  getPermintaan
} from "../controller/PermintaanController.js"
import {
  getProjects
}  from '../controller/ProjectController.js'
const router = express.Router();


// sales  
//Customer route
router.get("/admin/customers", getCustomers);
router.get("/sales/customers/:id", getCustomersById);
router.post("/sales/customers", saveCustomer);
router.patch('/sales/customer/:id', updateCustomer);
router.delete('/sales/customer/:id', deleteCustomer);
// permintaan
router.get("/admin/permintaan",getPermintaan);

// projects
router.get("/admin/dashboard",getProjects)

export default router;
