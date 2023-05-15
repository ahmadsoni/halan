function convertMilesToKilometers(miles: string): number {
  const milesValue = parseFloat(miles);
  if (isNaN(milesValue)) {
    throw new Error('Invalid miles value');
  }

  const kilometers = milesValue * 1.60934;
  return Number(kilometers.toFixed(2));
}

export default convertMilesToKilometers;
