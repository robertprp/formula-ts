/**
 * Roberto Perez 2020
 * Under MIT License
 *
 */

// Constants
const ARRAY_A = [6.116441, 6.004918]
const ARRAY_M = [7.59138, 7.337936]
const ARRAY_TN = [240.726, 229.3975]
const KELVIN_CONSTANT = 273.15
const AIR_AH_CONSTANT = 2.16679
const G_KG_CONSTANT = 1.204
/**
 * Generates Absolute Humidity
 * In order to transform absolute humidity to Grams/KiloGrams (g/kg), divide return value by 1.204
 * @param temperature (C)
 * @param relativeHumidity (%)
 * @returns absolute humidity (g/m3)
 */
function getAbsoluteHumidity(temperature: number, relativeHumidity: number) {
  let pw = getWaterVapourSaturation(temperature) * relativeHumidity / 100;
  return (AIR_AH_CONSTANT * pw * 100) / (KELVIN_CONSTANT + temperature);
}

function getAbsoluteHumidityInGramsPerKGrams(temperature: number, relativeHumidity: number) {
  return getAbsoluteHumidity(temperature, relativeHumidity) / G_KG_CONSTANT;
}
/**
* Generates Water Vapour Saturation
* @param temperature (C)
* @returns water Vapour Saturation
*/
function getWaterVapourSaturation(temperature: number) {
  let index = temperature > 50 ? 1 : 0;
  let a = ARRAY_A[index]
  let m = ARRAY_M[index]
  let Tn = ARRAY_TN[index]

  let el = (m*temperature) / (temperature + Tn)
  return a * Math.pow(10, el);
}

export default getAbsoluteHumidity;
