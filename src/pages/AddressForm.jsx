import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PlacesAutocomplete from "react-places-autocomplete";

export default function AddressForm() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const navigate = useNavigate();
  const { state: truck } = useLocation();

   console.log("Truck state:", truck);


   if (!truck) {
    return (
      <div className="text-center p-6">
        <h2 className="text-lg text-red-600">Truck info missing</h2>
        <a href="/" className="text-blue-600 underline">Go back to select a truck</a>
      </div>
    );
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickup || !drop) return alert("Please enter both addresses");

    navigate("/confirmation", {
      state: { ...truck, pickup, drop },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Enter Address Details</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">Pickup Address</label>
          <PlacesAutocomplete value={pickup} onChange={setPickup} onSelect={setPickup}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({ className: "w-full border px-3 py-2 rounded", placeholder: "Enter pickup..." })}
                />
                <div>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((s, idx) => (
                    <div key={idx} {...getSuggestionItemProps(s)} className="bg-white px-3 py-1 border-b">
                      {s.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Drop Address</label>
          <PlacesAutocomplete value={drop} onChange={setDrop} onSelect={setDrop}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({ className: "w-full border px-3 py-2 rounded", placeholder: "Enter drop..." })}
                />
                <div>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((s, idx) => (
                    <div key={idx} {...getSuggestionItemProps(s)} className="bg-white px-3 py-1 border-b">
                      {s.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded">Continue</button>
      </form>
    </div>
  );
}
// This component allows users to enter pickup and drop addresses using Places Autocomplete