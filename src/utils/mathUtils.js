import { evaluate } from 'mathjs';

export const calculate = (expression) => {
  try {
    return evaluate(expression);
  } catch (error) {
    return 'Error';
  }
};

export const formatNumber = (num) => {
  if (typeof num !== 'number' || !isFinite(num)) return 'Error';
  
  // Handle very large or very small numbers
  if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
    return num.toExponential(6);
  }
  
  // Format with appropriate decimal places
  const formatted = num.toString();
  if (formatted.includes('e')) {
    return num.toExponential(6);
  }
  
  return formatted;
};

export const mathConstants = {
  PI: Math.PI,
  E: Math.E,
  PHI: (1 + Math.sqrt(5)) / 2, // Golden ratio
};

export const scientificFunctions = {
  sin: (x) => Math.sin(x),
  cos: (x) => Math.cos(x),
  tan: (x) => Math.tan(x),
  asin: (x) => Math.asin(x),
  acos: (x) => Math.acos(x),
  atan: (x) => Math.atan(x),
  log: (x) => Math.log10(x),
  ln: (x) => Math.log(x),
  sqrt: (x) => Math.sqrt(x),
  cbrt: (x) => Math.cbrt(x),
  pow: (x, y) => Math.pow(x, y),
  exp: (x) => Math.exp(x),
  abs: (x) => Math.abs(x),
  floor: (x) => Math.floor(x),
  ceil: (x) => Math.ceil(x),
  round: (x) => Math.round(x),
};
