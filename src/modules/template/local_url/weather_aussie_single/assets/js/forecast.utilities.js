/// <amd-module name="forecast.utilities"/>
define("forecast.utilities", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.temp__average = exports.wether__priority = void 0;
    /**
     * Determines if the new weather condition id is a higher priority compared to the existing weather condition id.
     *
     * NOTE: This is based off the [OpenWeatherMap by Dirk on openHAB]{@link https://community.openhab.org/t/openweathermap-daily-forecast-of-weather-condition-using-free-api/71764} and then further refined using the actual [Open Weather - Weather Conditions]{@link https://openweathermap.org/weather-conditions}
     *
     * @export
     * @param {number} current__value
     * @param {number} new__value
     * @returns {boolean}
     */
    function wether__priority(current__value, new__value) {
        let current__position = priority__list.indexOf(current__value);
        let new__position = priority__list.indexOf(new__value);
        if (new__position > current__position)
            return true;
        return false;
    }
    exports.wether__priority = wether__priority;
    /**
     * Accepts a list of temperatures and returns the average of these temperatures
     *
     * @export
     * @param {number[]} temps__list List of temperature values
     * @returns {number} The average temperature value based on the list
     */
    function temp__average(temps__list) {
        let sum = 0;
        temps__list.forEach((temp) => sum += temp);
        return sum / temps__list.length;
    }
    exports.temp__average = temp__average;
    /**
     * Collection of the weather conditions with their sub-conditions ordered by priority from least invasive to most invasive
     *
     * @type {weather_collection__order}
     */
    const priority__collection = {
        clear: [
            800
        ],
        clouds: [
            801,
            802,
            803,
            804
        ],
        drizzle: [
            300,
            321,
            301,
            302,
            310,
            311,
            312,
            313,
            314
        ],
        rain: [
            500,
            501,
            502,
            503,
            504,
            520,
            521,
            522,
            531,
            511
        ],
        snow: [
            600,
            601,
            602,
            611,
            612,
            613,
            615,
            616,
            620,
            621,
            622
        ],
        atmosphere: [
            700,
            711,
            721,
            731,
            741,
            751,
            761,
            762,
            771,
            781
        ],
        thunderstorm: [
            200,
            201,
            202,
            210,
            211,
            230,
            231,
            232,
            212,
            221
        ]
    };
    /**
     * List of the weather conditions ordered by priority from least invasive to most invasive
     *
     * @type {number[]}
     */
    const priority__list = [
        800,
        801,
        802,
        803,
        804,
        300,
        321,
        301,
        302,
        310,
        311,
        312,
        313,
        314,
        500,
        501,
        502,
        503,
        504,
        520,
        521,
        522,
        531,
        511,
        600,
        601,
        602,
        611,
        612,
        613,
        615,
        616,
        620,
        621,
        622,
        700,
        711,
        721,
        731,
        741,
        751,
        761,
        762,
        771,
        781,
        200,
        201,
        202,
        210,
        211,
        230,
        231,
        232,
        212,
        221
    ];
});
