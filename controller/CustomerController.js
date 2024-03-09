import Customer from "../models/CustomerModel.js";

export const getCustomers = async (req, res) => {
  try {
    const Customers = await Customer.find();
    res.json(Customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomersById = async (req, res) => {
  try {
    const Customers = await Customer.findById(req.params.id);
    res.json(Customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveCustomer = async (req, res) => {
    const customer = new Customer(req.body);
    try {
      const insertCustomer = await customer.save(); 
      res.status(201).json(insertCustomer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  export const updateCustomer = async (req, res) => {
    try {
      const updatedCusotomer = await Customer.updateOne({_id:req.params.id}, {$set: req.body});
      res.status(201).json(insertCustomer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  export const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer= await Customer.deleteOne({_id:req.params.id});
        res.status(200).json(deleteCustomer);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

  