import Property from "../models/Property.js";

//Get all properties
export const getProperties = async (req, res) => {
  const properties = await Property.find({});
  res.json(properties);
};

// Get property by ID
export const getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (property) res.json(property);
  else res.status(404).json({ message: "Property not found" });
};

// Add new property (Admin only) -> isko kewal admin add kar skta hy 
export const addProperty = async (req, res) => {
  const { title, price, location, image, description } = req.body;
  const newProperty = new Property({ title, price, location, image, description });
  const saved = await newProperty.save();
  res.status(201).json(saved);
};
