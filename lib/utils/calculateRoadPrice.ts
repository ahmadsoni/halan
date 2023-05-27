import fuelEfficiencyData from '../core/services/fuelEfficiencyData .json';
function calculateRoadPrice(
  hargaBensin: number,
  jarakTempuh: number,
  jenisMobil: string,
): number {
  // convert to number harga besin
  hargaBensin = Number(hargaBensin);
  if (
    isNaN(hargaBensin) ||
    isNaN(jarakTempuh) ||
    hargaBensin <= 0 ||
    jarakTempuh <= 0
  ) {
    throw new Error('Harga bensin dan jarak tempuh harus lebih dari 0');
  }
  const selectedVehicle = fuelEfficiencyData.find(
    data => data.id === jenisMobil,
  );
  if (!selectedVehicle) {
    throw new Error('Data kendaraan tidak ditemukan');
  }

  // menghitung konsumsi bensin per km
  const konsumsiBensinPerKm = 1 / selectedVehicle.fuelEfficiency; // liter/km
  const totalBensin = jarakTempuh * konsumsiBensinPerKm;

  // menghitung harga jalan
  const hargaJalan = totalBensin * hargaBensin;

  return hargaJalan;
}

export default calculateRoadPrice;
