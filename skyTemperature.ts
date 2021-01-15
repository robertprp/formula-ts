/**
 * Roberto Perez 2020
 * Under MIT License
 *
 */

 
/**
 *
 * @param temperature (C)
 * @param cloudiness (from 0 to 8)
 * @return Sky Temperature
 */
function getSkyTemperature(temperature:number, cloudiness:number) {
    return temperature - ((8 - cloudiness) / 8) * 18 - 2;
}

export default getSkyTemperature;
