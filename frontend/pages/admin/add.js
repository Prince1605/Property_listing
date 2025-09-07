import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AddProperty() {
  const [property, setProperty] = useState({ title: "", price: "", location: "", image: "", description: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (!storedToken) router.push("/admin/login");
    else setToken(storedToken);
  }, []);

const handleAdd = async (e) => {
  e.preventDefault();

  // Providing Validation Taki Agar Details na dali Jaye to Property na add ho 
  if (!property.title || !property.price || !property.location || !property.image || !property.description) {
    setMessage("Please fill all fields!");
    return;
  }

  if (!token) return setMessage("Please login first");

// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify(property),
// });
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});


  const data = await res.json();
  if (res.ok) {
    setMessage("Property added successfully!");
    setProperty({ title: "", price: "", location: "", image: "", description: "" });
  } else {
    setMessage(data.message || "Error adding property");
  }
};


  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Title" value={property.title} onChange={e => setProperty({ ...property, title: e.target.value })} className="w-full mb-2 p-2 border rounded" />
        <input type="number" placeholder="Price" value={property.price} onChange={e => setProperty({ ...property, price: e.target.value })} className="w-full mb-2 p-2 border rounded" />
        <input type="text" placeholder="Location" value={property.location} onChange={e => setProperty({ ...property, location: e.target.value })} className="w-full mb-2 p-2 border rounded" />
        <input type="text" placeholder="Image URL" value={property.image} onChange={e => setProperty({ ...property, image: e.target.value })} className="w-full mb-2 p-2 border rounded" />
        <textarea placeholder="Description" value={property.description} onChange={e => setProperty({ ...property, description: e.target.value })} className="w-full mb-2 p-2 border rounded" />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Add Property</button>
      </form>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
}
