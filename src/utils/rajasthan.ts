export const RAJASTHAN_DISTRICTS = [
  'Jaipur',
  'Jodhpur',
  'Udaipur',
  'Kota',
  'Ajmer',
  'Bikaner',
  'Alwar',
  'Bhilwara',
  'Sikar',
  'Bharatpur',
  'Pali',
  'Sri Ganganagar',
  'Chittorgarh',
  'Jhunjhunu',
  'Nagaur',
  'Hanumangarh',
  'Tonk',
  'Dausa',
  'Barmer',
  'Jaisalmer',
  'Sawai Madhopur',
  'Bundi',
  'Jhalawar',
  'Churu',
  'Rajsamand',
  'Dungarpur',
  'Banswara',
  'Dholpur',
  'Sirohi',
  'Pratapgarh',
  'Karauli',
  'Jalore',
  'Balotra',
  'Beawar',
  'Didwana-Kuchaman',
  'Kotputli-Behror',
  'Khairthal-Tijara',
  'Phalodi',
  'Salumbar',
  'Sanchore',
  'Shahpura'
].sort();

/**
 * Validates whether a 6-digit PIN code belongs to Rajasthan.
 * In India's postal system, Rajasthan PIN codes range from 301000 to 345999.
 * (Prefixes 30, 31, 32, 33, 34).
 */
export function isValidRajasthanPincode(pincode: string): boolean {
  const clean = pincode.trim();
  if (!/^\d{6}$/.test(clean)) {
    return false;
  }
  const prefix = clean.substring(0, 2);
  return ['30', '31', '32', '33', '34'].includes(prefix);
}

/**
 * Validates Indian 10-digit mobile number format
 * Accepts with or without +91 or 0 prefix
 */
export function isValidIndianPhone(phone: string): boolean {
  const clean = phone.replace(/[\s\-()]/g, '');
  // Matches 10 digits starting with 6, 7, 8, or 9
  // Or +91 followed by 10 digits
  return /^(\+91|91|0)?[6-9]\d{9}$/.test(clean);
}

/**
 * Formats a phone number cleanly to +91 XXXXX XXXXX for display
 */
export function formatIndianPhone(phone: string): string {
  const clean = phone.replace(/[\s\-()]/g, '');
  const digits = clean.slice(-10);
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
}
