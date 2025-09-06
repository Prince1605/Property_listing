import { useState } from "react";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [property, setProperty] = useState({
    title: "",
    price: "",
    location: "",
    image: "",
    description: ""
  });

  // ---------------- ADMIN LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      setMessage("Login successful!");
    } else {
      setMessage(data.message);
    }
  };

  // ---------------- ADD PROPERTY ----------------
  const handleAddProperty = async (e) => {
    e.preventDefault();
    if (!token) return setMessage("Please login first!");
    const res = await fetch("http://localhost:5000/api/properties", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(property)
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Property added successfully!");
      setProperty({ title:"", price:"", location:"", image:"", description:"" });
    } else {
      setMessage(data.message || "Error adding property");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="mb-6">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-2 p-2 border"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-2 p-2 border"/>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
      </form>

      {token && (
        <>
          <h2 className="text-xl font-bold mb-2">Add New Property</h2>
          <form onSubmit={handleAddProperty}>
            <input type="text" placeholder="Title" value={property.title} onChange={e=>setProperty({...property,title:e.target.value})} className="w-full mb-2 p-2 border"/>
            <input type="number" placeholder="Price" value={property.price} onChange={e=>setProperty({...property,price:e.target.value})} className="w-full mb-2 p-2 border"/>
            <input type="text" placeholder="Location" value={property.location} onChange={e=>setProperty({...property,location:e.target.value})} className="w-full mb-2 p-2 border"/>
            <input type="text" placeholder="Image URL" value={property.image} onChange={e=>setProperty({...property,image:e.target.value})} className="w-full mb-2 p-2 border"/>
            <textarea placeholder="Description" value={property.description} onChange={e=>setProperty({...property,description:e.target.value})} className="w-full mb-2 p-2 border"/>
            <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Add Property</button>
          </form>
        </>
      )}

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
