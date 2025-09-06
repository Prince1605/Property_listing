import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/properties/${id}`)
        .then(res => res.json())
        .then(data => setProperty(data));
    }
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
  <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
  <img
    src={property.image}
    alt={property.title}
    className="w-full h-80 object-cover rounded mb-4"
  />
  <h1 className="text-3xl font-bold mb-2 text-gray-900">{property.title}</h1>
  <p className="text-gray-700 mb-2">{property.location}</p>
  <p className="text-gray-800 font-semibold mb-4">₹ {property.price.toLocaleString()}</p>
  <p className="text-gray-600">{property.description}</p>
</div>

  );
}
