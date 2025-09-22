// Length conversions (meters as base unit)
export const lengthConversions = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
};

// Volume conversions (liters as base unit)
export const volumeConversions = {
  milliliter: 0.001,
  liter: 1,
  cubicMeter: 1000,
  gallon: 3.78541,
  quart: 0.946353,
  pint: 0.473176,
  cup: 0.236588,
  fluidOunce: 0.0295735,
};

// Weight/Mass conversions (kilograms as base unit)
export const weightConversions = {
  gram: 0.001,
  kilogram: 1,
  pound: 0.453592,
  ounce: 0.0283495,
  ton: 1000,
  stone: 6.35029,
};

// Temperature conversions
export const convertTemperature = (value, from, to) => {
  let celsius;
  
  // Convert to Celsius first
  switch (from) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * 5/9;
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    default:
      return value;
  }
  
  // Convert from Celsius to target
  switch (to) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return (celsius * 9/5) + 32;
    case 'kelvin':
      return celsius + 273.15;
    default:
      return celsius;
  }
};

// Energy conversions (joules as base unit)
export const energyConversions = {
  joule: 1,
  kilojoule: 1000,
  calorie: 4.184,
  kilocalorie: 4184,
  wattHour: 3600,
  kilowattHour: 3600000,
  btu: 1055.06,
};

// Area conversions (square meters as base unit)
export const areaConversions = {
  squareMeter: 1,
  squareKilometer: 1000000,
  squareCentimeter: 0.0001,
  squareInch: 0.00064516,
  squareFoot: 0.092903,
  squareYard: 0.836127,
  acre: 4046.86,
  hectare: 10000,
};

// Speed conversions (meters per second as base unit)
export const speedConversions = {
  meterPerSecond: 1,
  kilometerPerHour: 0.277778,
  milePerHour: 0.44704,
  footPerSecond: 0.3048,
  knot: 0.514444,
};

// Time conversions (seconds as base unit)
export const timeConversions = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2629746, // Average month
  year: 31556952, // Average year
};

// Power conversions (watts as base unit)
export const powerConversions = {
  watt: 1,
  kilowatt: 1000,
  horsepower: 745.7,
  btuPerHour: 0.293071,
};

export const convertUnit = (value, from, to, conversionTable) => {
  if (from === to) return value;
  
  const fromFactor = conversionTable[from];
  const toFactor = conversionTable[to];
  
  if (!fromFactor || !toFactor) return value;
  
  // Convert to base unit, then to target unit
  const baseValue = value * fromFactor;
  return baseValue / toFactor;
};
