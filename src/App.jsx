import { BrowserRouter, Routes, Route } from "react-router-dom";
import TruckSelection from "./pages/TruckSelection";
import AddressForm from "./pages/AddressForm";
import Confirmation from "./pages/confirmation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TruckSelection />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
