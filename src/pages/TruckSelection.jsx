import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TruckCard from "../components/TruckCard";

const trucks = [
  { name: "ACE / DOST", capacity: "1.5 TON", img: "/truck1.jpg", size: 1.5 },
  { name: "EICHER 14FT", capacity: "3.5 TON", img: "/truck2.avif", size: 3.5 },
  { name: "EICHER 17FT", capacity: "5 TON", img: "/truck3.jpg", size: 5 },
  { name: "EICHER 19FT", capacity: "7 TON", img: "/truck4.avif", size: 7 },
  { name: "20FT CONTAINER", capacity: "6.5 TON", img: "/truck5.jpg", size: 6.5 },
];

export default function TruckSelection() {
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(20);
  const navigate = useNavigate();

  const filteredTrucks = trucks.filter(
    (t) => t.size >= minSize && t.size <= maxSize
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-3">Select a Truck</h2>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="number"
          className="border px-2 py-1 w-20"
          value={minSize}
          onChange={(e) => setMinSize(Number(e.target.value))}
          placeholder="Min"
        />
        <input
          type="number"
          className="border px-2 py-1 w-20"
          value={maxSize}
          onChange={(e) => setMaxSize(Number(e.target.value))}
          placeholder="Max"
        />
      </div>

      <div className="bg-white border rounded max-h-96 overflow-y-auto">
        {filteredTrucks.map((truck, index) => (
          <TruckCard
            key={index}
            truck={truck}
            onClick={() => navigate("/address", { state: truck })}
          />
        ))}
      </div>
    </div>
  );
}
// This component allows users to select a truck based on size filters