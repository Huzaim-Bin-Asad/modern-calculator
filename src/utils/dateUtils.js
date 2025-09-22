import { 
  differenceInDays, 
  differenceInWeeks, 
  differenceInMonths, 
  differenceInYears,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  subDays,
  subWeeks,
  subMonths,
  subYears,
  format,
  parseISO,
  isValid
} from 'date-fns';

export const calculateDateDifference = (date1, date2, unit = 'days') => {
  try {
    const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
    const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
    
    if (!isValid(d1) || !isValid(d2)) {
      throw new Error('Invalid date');
    }
    
    switch (unit) {
      case 'days':
        return Math.abs(differenceInDays(d1, d2));
      case 'weeks':
        return Math.abs(differenceInWeeks(d1, d2));
      case 'months':
        return Math.abs(differenceInMonths(d1, d2));
      case 'years':
        return Math.abs(differenceInYears(d1, d2));
      default:
        return Math.abs(differenceInDays(d1, d2));
    }
  } catch (error) {
    return null;
  }
};

export const addToDate = (date, amount, unit = 'days') => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(d)) {
      throw new Error('Invalid date');
    }
    
    switch (unit) {
      case 'days':
        return addDays(d, amount);
      case 'weeks':
        return addWeeks(d, amount);
      case 'months':
        return addMonths(d, amount);
      case 'years':
        return addYears(d, amount);
      default:
        return addDays(d, amount);
    }
  } catch (error) {
    return null;
  }
};

export const subtractFromDate = (date, amount, unit = 'days') => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(d)) {
      throw new Error('Invalid date');
    }
    
    switch (unit) {
      case 'days':
        return subDays(d, amount);
      case 'weeks':
        return subWeeks(d, amount);
      case 'months':
        return subMonths(d, amount);
      case 'years':
        return subYears(d, amount);
      default:
        return subDays(d, amount);
    }
  } catch (error) {
    return null;
  }
};

export const formatDate = (date, formatStr = 'yyyy-MM-dd') => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(d)) {
      throw new Error('Invalid date');
    }
    
    return format(d, formatStr);
  } catch (error) {
    return null;
  }
};
