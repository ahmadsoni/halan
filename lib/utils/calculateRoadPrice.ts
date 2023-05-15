function calculateRoadPrice(hargaBensin: number, jarakTempuh: number): number {
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

  const konsumsiBensinPerKm = 0.1; // asumsi konsumsi bensin per kilometer adalah 0.1 liter
  const totalBensin = jarakTempuh * konsumsiBensinPerKm;
  const hargaJalan = totalBensin * hargaBensin;

  return hargaJalan;
}

export default calculateRoadPrice;
