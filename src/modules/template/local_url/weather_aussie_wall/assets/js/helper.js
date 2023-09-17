/// <amd-module name="helper"/>
define("helper", ["require", "exports", "luxon", "helper.enums"], function (require, exports, luxon_1, helper_enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.helper = void 0;
    /**
     * Helper utilities class
     *
     * @class helper
     */
    class helper {
        /**
         * Creates an instance of helper.
         *
         * @memberOf helper
         */
        constructor() {
            /**
             * lter the icons displayed between night and day based on the current system time
             *
             * @private
             * @param {string} icon__value Desired icon to be used
             * @param {(number | undefined)} sunrise__value Sunrise value from the forecast local storage
             * @param {(number | undefined)} sunset__value Sunset value from the forecast local storage
             * @returns {string} Icon to actually be used based on the time of day
             *
             * @memberOf helper
             */
            this.alter__icon_time = (icon__value, sunrise__value = undefined, sunset__value = undefined) => {
                if (typeof sunrise__value === 'undefined' || typeof sunset__value === 'undefined')
                    return icon__value;
                let now = luxon_1.DateTime.now().toSeconds();
                let icon__am = icon__value.endsWith('d');
                if (icon__am && (now < sunrise__value || now > sunset__value))
                    icon__value = icon__value.replace('d', 'n');
                else if (!icon__am && (now > sunrise__value && now < sunset__value))
                    icon__value = icon__value.replace('n', 'd');
                return icon__value;
            };
            /**
             * Converts the provided string into title case
             *
             * @param {string} input Desired input string to be converted
             * @returns {string} The title case output of the input
             *
             * @memberOf helper
             */
            this.toTitleCase = (input) => {
                return input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            };
            /**
             * Console logging function for development
             *
             * @param {string} func__name Name of the function where the logging is being called from
             * @param {string} [variable=''] The label for the desired value
             * @param {(any | undefined)} [value=undefined] The data to be displayed within the console log if applicable
             *
             * @memberOf helper
             */
            this.devLog = (func__name, variable = '', value = undefined) => {
                if (this.development)
                    console.log(func__name + ' ::: ' + variable, value);
            };
            /**
             * Retrieve the svg icon to be displayed
             *
             * @param {string} icon__value the value of the icon to retrieve. For reference refer to [Open Weather - Weather Conditions]{@link https://openweathermap.org/weather-conditions}
             * @param {(number | undefined)} sunrise__value Sunrise value from the forecast local storage
             * @param {(number | undefined)} sunset__value Sunset value from the forecast local storage
             * @returns {string} The image tage containing the desired svg for display
             *
             * @memberOf helper
             */
            this.icon__get = (icon__value, sunrise__value = undefined, sunset__value = undefined) => {
                icon__value = this.alter__icon_time(icon__value, sunrise__value, sunset__value);
                let icon = undefined;
                let path = 'assets/icons/';
                switch (icon__value) {
                    case '01d':
                        icon = helper_enums_1.iconMapValue["01d"];
                        break;
                    case '01n':
                        icon = helper_enums_1.iconMapValue["01n"];
                        break;
                    case '02d':
                        icon = helper_enums_1.iconMapValue["02d"];
                        break;
                    case '02n':
                        icon = helper_enums_1.iconMapValue["02n"];
                        break;
                    case '03d':
                    case '03n':
                        icon = helper_enums_1.iconMapValue["03d"];
                        break;
                    case '04d':
                    case '04n':
                        icon = helper_enums_1.iconMapValue["04d"];
                        break;
                    case '09d':
                    case '09n':
                        icon = helper_enums_1.iconMapValue["09d"];
                        break;
                    case '10d':
                        icon = helper_enums_1.iconMapValue["10d"];
                        break;
                    case '10n':
                        icon = helper_enums_1.iconMapValue["10n"];
                        break;
                    case '11d':
                    case '11n':
                        icon = helper_enums_1.iconMapValue["11d"];
                        break;
                    case '13d':
                    case '13n':
                        icon = helper_enums_1.iconMapValue["13d"];
                        break;
                    case '50d':
                    case '50n':
                        icon = helper_enums_1.iconMapValue["50d"];
                        break;
                    default:
                        break;
                }
                if (typeof icon === 'undefined')
                    return '';
                return '<img src="' + path + icon + '" alt="">';
            };
            this.development = true;
            this.textFit__config_lans = {
                alignHoriz: true,
                multiLine: false,
                detectMultiLine: false,
                reProcess: false
            };
            this.textFit__config_port = {
                alignHoriz: false,
                multiLine: false,
                detectMultiLine: false,
                reProcess: false
            };
        }
    }
    exports.helper = helper;
});
