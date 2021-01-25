/**
 * Roberto Perez 2020
 * Under MIT License
 *
 */

/**
 * Equation calculates Extratrestrial radiation. Solar radiation incident outside the earth's
    atmosphere is called extraterrestrial radiation. On average the extraterrestrial irradiance
    is 1367 Watts/meter2 (W/m2). This value varies by + or - 3 percent as the earth orbits the sun.
    The earth's closest approach to the sun occurs around January 4th and it is furthest
    from the sun around July 5th.
 * @param date (Date)
 * @param lat (float) // latitude
 * @param lon (float) // longitude
 * @returns Extraterrestrial irradiation
 */
function getExtraterrestrialIrradiation(date: Date, lat: number, lon: number) {
  let day = daysIntoYear(date);
  let ab = Math.cos((2 * Math.PI * (day - 1.0)) / 365.0);
  let bc = Math.sin((2 * Math.PI * (day - 1.0)) / 365.0);
  let cd = Math.cos(2 * ((2 * Math.PI * (day - 1.0)) / 365.0));
  let df = Math.sin(2 * ((2 * Math.PI * (day - 1.0)) / 365.0));
  let decl = degrees_to_rad(get_declination(day));
  let ha = degrees_to_rad(get_hour_angle(date, lon));
  let ZA =
    Math.sin(degrees_to_rad(lat)) * Math.sin(decl) +
    Math.cos(degrees_to_rad(lat)) * Math.cos(decl) * Math.cos(ha);

  return ZA > 0
    ? 1367.0 *
        ZA *
        (1.0001 + 0.034221 * ab + 0.00128 * bc + 0.000719 * cd + 0.000077 * df)
    : 0.0;
}

function degrees_to_rad(degrees: number) {
  return (degrees * Math.PI) / 180;
}
function get_declination(dayOfYear: number) {
  return 23.45 * Math.sin(((2 * Math.PI) / 365.0) * (dayOfYear - 81));
}
function get_hour_angle(date: Date, lon: number) {
  let solar_time = get_solar_time(date, lon);
  return 15.0 * (solar_time - 12.0);
}

function get_solar_time(date: Date, lon: number) {
  return (
    ((date.getUTCHours()) * 60 +
      date.getUTCMinutes() +
      4 * lon +
      equationOfTime(daysIntoYear(date))) /
    60
  );
}

function daysIntoYear(date: Date) {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
}

function equationOfTime(day: number) {
  let b = ((2 * Math.PI) / 364.0) * (day - 81);
  return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
}

/**
 * Generates Sun radiation applying cloudiness. Cloudines has to be in the bounds of [0-8]. Normally, it is given by a code in Oktas.
 * This is the sun radiaiton applying cloud coverage factor.
 * Global irradiance = Diffuse Irradiance + Direct Irradiance
 * @param extraterrestrialRadiation (W/m2)
 * @param cloudiness [0-8]
 * @returns Global Irradiance (W/m2)
 */
function getGlobalIrradiance(extraterrestrialRadiation: number, cloudiness: number) {
  return (extraterrestrialRadiation * (10 - cloudiness * 1.1)) / 11;
}

/**
 * Generates Diffuse Irradiance
 * @param globalIrradiance (W/m2)
 * @param extraterrestrialRadiation (W/m2)
 * @returns diffuse sun radiation
 */
function getDiffuseIrradiance(globalIrradiance: number, extraterrestrialRadiation: number) {
  return Math.min(globalIrradiance, extraterrestrialRadiation * 0.31);
}
/**
 * Generates Direct Irradiance
 * Global irradiance = Diffuse Irradiance + Direct Irradiance
 * @param globalIrradiance (W/m2)
 * @param diffuseIrradiance (W/m2)
 * @returns Direct Irradiance
 */
function getDirectIrradiance(globalIrradiance: number, diffuseIrradiance: number) {
  return globalIrradiance - diffuseIrradiance;
}

export default getExtraterrestrialRadiation;
