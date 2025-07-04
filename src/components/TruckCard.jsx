export default function TruckCard({ truck, onClick }) {
  return (
    <div
      className="flex items-center p-3 border-b cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <img src={truck.img} alt={truck.name} className="h-10 w-14 mr-4 object-contain" />
      <p>{truck.name} ({truck.capacity})</p>
    </div>
  );
}
