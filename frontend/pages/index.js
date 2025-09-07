import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const router = useRouter();
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) router.push("/admin/login");

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`)
    .then(res => res.json())
    .then(data => setProperties(data))
    .catch(err => console.error("Error fetching properties:", err));
}, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("adminToken");
  //   if (!token) router.push("/admin/login"); // redirect to login page if not logged in

  //   fetch("http://localhost:5000/api/properties")
  //     .then(res => res.json())
  //     .then(data => setProperties(data));
  // }, []);

  const handleAddClick = () => {
    router.push("/admin/add"); // navigate to add property page
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Property Listings</h1>
        <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Property
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
}
