import { useLocation, useNavigate } from "react-router-dom";

export default function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p className="text-center p-10">No booking data found.</p>;

  const { name, capacity, img, pickup, drop } = state;
  const priceEstimate = 25 * 1320 * (parseFloat(capacity) || 1);

  return (
    <div className="max-w-xl mx-auto text-center p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmed ✅</h1>

      <img src={img} alt={name} className="mx-auto h-20 mb-2" />
      <p className="text-lg">{name}</p>
      <p>Capacity: {capacity}</p>

      <div className="mt-6 text-left">
        <p><strong>Pickup:</strong> {pickup}</p>
        <p><strong>Drop:</strong> {drop}</p>
        <p className="mt-2 text-xl font-bold text-green-600">
          ₹{priceEstimate.toLocaleString()} Estimated
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Book Another
      </button>
    </div>
  );
}
// This component displays the booking confirmation details including truck info, addresses, and estimated price.