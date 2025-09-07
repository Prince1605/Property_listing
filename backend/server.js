import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ CORS setup
app.use(cors({
  origin: ["http://localhost:3000", "https://property-listing-five-green.vercel.app"],
  credentials: true
}));
app.use(express.json());

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("Mongo Error:", err));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// Dummy data
const properties = [
  { id: 1, title: "2BHK Flat in Noida", price: 2500000, location: "Sector 62, Noida", image: "/images/1stProperty.jpg", description: "Spacious 2BHK with parking and security." },
  { id: 2, title: "Villa in Delhi", price: 7500000, location: "South Delhi", image: "/images/2property.jpg", description: "Luxury villa with modern amenities and private garden." }
];

// ✅ Admin login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@test.com" && password === "admin123") {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "secret123", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ✅ Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || "secret123", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// ✅ Routes
app.post("/api/properties", authenticateToken, (req, res) => {
  const newProperty = {
    id: properties.length + 1,
    title: req.body.title,
    price: req.body.price,
    location: req.body.location,
    description: req.body.description,
    image: req.body.image
  };
  properties.push(newProperty);
  res.json(newProperty);
});

app.get("/api/properties", (req, res) => res.json(properties));
app.get("/api/properties/:id", (req, res) => {
  const property = properties.find(p => p.id === parseInt(req.params.id));
  if (property) res.json(property);
  else res.status(404).json({ message: "Property not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
