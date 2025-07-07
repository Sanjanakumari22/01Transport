const truckData = {
  'ACE / DOST / PICKUP (1.5 TON)': { mileage: 12, baseFare: 500 },
  'EICHER 14FT (3.5 TON)': { mileage: 6, baseFare: 1500 },
  'EICHER 17FT (5 TON)': { mileage: 5, baseFare: 1800 },
  '32FT CONTAINER (16 TON)': { mileage: 3.5, baseFare: 2500 },
};

export async function calculateFare(pickup, drop, truckType, fuelPrice) {
  const distance = await getDistanceInKm(pickup, drop);
  const { mileage, baseFare } = truckData[truckType] || { mileage: 5, baseFare: 1000 };
  const estimatedFare = ((distance / mileage) * fuelPrice) + baseFare;
  return Math.round(estimatedFare);
}

async function getDistanceInKm(pickup, drop) {
  const apiKey = "AIzaSyADp2rp8AR-McC-KJaFpSIdcZVyV8RoQ18";
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${AIzaSyADp2rp8AR-McC-KJaFpSIdcZVyV8RoQ18}&destinations=${AIzaSyADp2rp8AR-McC-KJaFpSIdcZVyV8RoQ18}&key=${AIzaSyADp2rp8AR-McC-KJaFpSIdcZVyV8RoQ18}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === 'OK') {
    const meters = data.rows[0].elements[0].distance.value;
    return meters / 1000;
  } else {
    throw new Error("Unable to fetch distance");
  }
}
