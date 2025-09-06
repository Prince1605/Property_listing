import Link from "next/link";

export default function PropertyCard({ property }) {
  return (
   <div className="border rounded shadow p-4 bg-white">
  <img
    src={property.image}
    alt={property.title}
    className="w-full h-48 object-cover mb-2 rounded"
  />
  <h2 className="text-xl font-semibold text-gray-900">{property.title}</h2>
  <p className="text-gray-600">{property.location}</p>
  <p className="text-gray-800 font-bold">₹ {property.price.toLocaleString()}</p>
  <Link href={`/property/${property.id}`}>
    <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded">
      View Details
    </button>
  </Link>
</div>
  );
}
