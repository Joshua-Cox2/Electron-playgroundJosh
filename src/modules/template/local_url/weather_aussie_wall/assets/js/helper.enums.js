/// <amd-module name="helper.enums"/>
define("helper.enums", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.iconMapId = exports.iconMapValue = exports.icons = void 0;
    /**
     * List of svg weather icons used with reference to [Open Weather - Weather Conditions]{@link https://openweathermap.org/weather-conditions}
     *
     * @export
     * @enum {number}
     */
    var icons;
    (function (icons) {
        /**
         * ID/s: 802
         * Icon/s: 03d, 03n
         */
        icons["cloudy"] = "cloudy.svg";
        /**
         * ID/s: 7XX
         * Icon/s: 50d, 50n
         */
        icons["mist"] = "mist.svg";
        /**
         * ID/s: 801
         * Icon/s: 02n
         */
        icons["night_cloudy"] = "night_cloudy.svg";
        /**
         * ID/s: 500 - 504
         * Icon/s: 10n
         */
        icons["night_raining"] = "night_raining.svg";
        /**
         * ID/s: 800
         * Icon/s: 01n
         */
        icons["night"] = "night.svg";
        /**
         * ID/s: 500 - 504
         * Icon/s: 10d
         */
        icons["partly_cloudy_rain"] = "partially_cloudy_rain.svg";
        /**
         * ID/s: 801
         * Icon/s: 02d
         */
        icons["partly_cloudy"] = "partially_cloudy.svg";
        /**
         * ID/s: 300 - 321, 520 - 531
         * Icon/s: 09d, 09n
         */
        icons["rain"] = "rain.svg";
        /**
         * ID/s: 600 - 622
         * Icon/s: 13d, 13n
         */
        icons["snow"] = "snow.svg";
        /**
         * ID/s: 800
         * Icon/s: 01d
         */
        icons["sunny"] = "sunny.svg";
        /**
         * ID/s: 200 - 232
         * Icon/s: 11d, 11n
         */
        icons["thunder"] = "thunder.svg";
        /**
         * ID/s: 803 - 804
         * Icon/s: 04d, 04n
         */
        icons["very_cloudy"] = "very_cloudy.svg";
    })(icons = exports.icons || (exports.icons = {}));
    /**
     * SVG icon mapping to icon values from [Open Weather - Weather Conditions]{@link https://openweathermap.org/weather-conditions}
     *
     * @export
     * @enum {number}
     */
    var iconMapValue;
    (function (iconMapValue) {
        iconMapValue["01d"] = "sunny.svg";
        iconMapValue["01n"] = "night.svg";
        iconMapValue["02d"] = "partially_cloudy.svg";
        iconMapValue["02n"] = "night_cloudy.svg";
        iconMapValue["03d"] = "cloudy.svg";
        iconMapValue["03n"] = "cloudy.svg";
        iconMapValue["04d"] = "very_cloudy.svg";
        iconMapValue["04n"] = "very_cloudy.svg";
        iconMapValue["09d"] = "rain.svg";
        iconMapValue["09n"] = "rain.svg";
        iconMapValue["10d"] = "partially_cloudy_rain.svg";
        iconMapValue["10n"] = "night_raining.svg";
        iconMapValue["11d"] = "thunder.svg";
        iconMapValue["11n"] = "thunder.svg";
        iconMapValue["13d"] = "snow.svg";
        iconMapValue["13n"] = "snow.svg";
        iconMapValue["50d"] = "mist.svg";
        iconMapValue["50n"] = "mist.svg";
    })(iconMapValue = exports.iconMapValue || (exports.iconMapValue = {}));
    /**
     * SVG icon mapping to icon ids from [Open Weather - Weather Conditions]{@link https://openweathermap.org/weather-conditions}
     *
     * NOTE: Does not support night time. Only day time.
     * @deprecated
     * @export
     * @enum {number}
     */
    var iconMapId;
    (function (iconMapId) {
        iconMapId["id_200"] = "thunder.svg";
        iconMapId["id_201"] = "thunder.svg";
        iconMapId["id_202"] = "thunder.svg";
        iconMapId["id_210"] = "thunder.svg";
        iconMapId["id_211"] = "thunder.svg";
        iconMapId["id_212"] = "thunder.svg";
        iconMapId["id_221"] = "thunder.svg";
        iconMapId["id_230"] = "thunder.svg";
        iconMapId["id_231"] = "thunder.svg";
        iconMapId["id_232"] = "thunder.svg";
        iconMapId["id_300"] = "rain.svg";
        iconMapId["id_301"] = "rain.svg";
        iconMapId["id_302"] = "rain.svg";
        iconMapId["id_310"] = "rain.svg";
        iconMapId["id_311"] = "rain.svg";
        iconMapId["id_312"] = "rain.svg";
        iconMapId["id_313"] = "rain.svg";
        iconMapId["id_314"] = "rain.svg";
        iconMapId["id_321"] = "rain.svg";
        iconMapId["id_500"] = "partially_cloudy_rain.svg";
        iconMapId["id_501"] = "partially_cloudy_rain.svg";
        iconMapId["id_502"] = "partially_cloudy_rain.svg";
        iconMapId["id_503"] = "partially_cloudy_rain.svg";
        iconMapId["id_504"] = "partially_cloudy_rain.svg";
        iconMapId["id_511"] = "snow.svg";
        iconMapId["id_520"] = "rain.svg";
        iconMapId["id_521"] = "rain.svg";
        iconMapId["id_522"] = "rain.svg";
        iconMapId["id_531"] = "rain.svg";
        iconMapId["id_600"] = "snow.svg";
        iconMapId["id_601"] = "snow.svg";
        iconMapId["id_602"] = "snow.svg";
        iconMapId["id_611"] = "snow.svg";
        iconMapId["id_612"] = "snow.svg";
        iconMapId["id_613"] = "snow.svg";
        iconMapId["id_615"] = "snow.svg";
        iconMapId["id_616"] = "snow.svg";
        iconMapId["id_620"] = "snow.svg";
        iconMapId["id_621"] = "snow.svg";
        iconMapId["id_622"] = "snow.svg";
        iconMapId["id_700"] = "mist.svg";
        iconMapId["id_701"] = "mist.svg";
        iconMapId["id_711"] = "mist.svg";
        iconMapId["id_721"] = "mist.svg";
        iconMapId["id_731"] = "mist.svg";
        iconMapId["id_741"] = "mist.svg";
        iconMapId["id_751"] = "mist.svg";
        iconMapId["id_761"] = "mist.svg";
        iconMapId["id_762"] = "mist.svg";
        iconMapId["id_771"] = "mist.svg";
        iconMapId["id_781"] = "mist.svg";
        iconMapId["id_800"] = "sunny.svg";
        iconMapId["id_801"] = "partially_cloudy.svg";
        iconMapId["id_802"] = "cloudy.svg";
        iconMapId["id_803"] = "very_cloudy.svg";
        iconMapId["id_804"] = "very_cloudy.svg";
    })(iconMapId = exports.iconMapId || (exports.iconMapId = {}));
});
