/// <amd-module name="current"/>
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("current", ["require", "exports", "helper", "dompurify", "./textFit"], function (require, exports, helper_1, dompurify_1, textFit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.current = void 0;
    textFit_1 = __importDefault(textFit_1);
    /**
     * Class that handles the current weather data
     *
     * @class current
     */
    class current {
        /**
         * Creates an instance of current.
         *
         * @memberOf current
         */
        constructor() {
            /**
             * Load the current weather data from local storage
             *
             * @private
             *
             * @memberOf current
             */
            this.load = () => {
                this.current = undefined;
                let tmp = JSON.parse(localStorage.getItem('single'));
                if (tmp !== null)
                    this.current = tmp;
            };
            /**
             * Apply the details of the curent weather data
             *
             * @private
             *
             * @memberOf current
             */
            this.apply = () => {
                // DEV: Current temperature
                if (this.lans) {
                    let elem = document.getElementById('current__temp--lans');
                    elem.innerHTML = Math.round(this.current.main.temp) + '<i class="wi wi-degrees"></i>';
                }
                else {
                    let elem = document.getElementById('current__temp--port');
                    elem.innerHTML = Math.round(this.current.main.temp) + '<i class="wi wi-degrees"></i>';
                }
                // DEV: Current status
                if (this.lans) {
                    let elem = document.getElementById('current__status--lans');
                    elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.toTitleCase(this.current.weather[0].description));
                }
                else {
                    let elem = document.getElementById('current__status--port');
                    elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.toTitleCase(this.current.weather[0].description));
                }
                // DEV: Max temp
                if (this.lans) {
                    let elem = document.getElementById('current__max--lans');
                    elem.innerHTML = Math.round(this.current.main.temp_max) + '<i class="wi wi-degrees"></i>';
                }
                else {
                    let elem = document.getElementById('current__max--port');
                    elem.innerHTML = Math.round(this.current.main.temp_max) + '<i class="wi wi-degrees"></i>';
                }
                // DEV: Min temp
                if (this.lans) {
                    let elem = document.getElementById('current__min--lans');
                    elem.innerHTML = Math.round(this.current.main.temp_min) + '<i class="wi wi-degrees"></i>';
                }
                else {
                    let elem = document.getElementById('current__min--port');
                    elem.innerHTML = Math.round(this.current.main.temp_min) + '<i class="wi wi-degrees"></i>';
                }
                // DEV: Current icon
                if (this.lans) {
                    let elem = document.getElementById('current__icon--lans');
                    elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.icon__get(this.current.weather[0].icon));
                }
                else {
                    let elem = document.getElementById('current__icon--port');
                    elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.icon__get(this.current.weather[0].icon));
                }
            };
            /**
             * Check the local storage
             *
             *
             * @memberOf current
             */
            this.check = () => {
                window.parent.postMessage({ "type": "localStorage", "attribute": "single" }, '*');
            };
            /**
             * Fit the descriptions to the width of the card
             *
             *
             * @memberOf current
             */
            this.fit__text = () => {
                if (this.lans)
                    (0, textFit_1.default)(document.getElementById('current__status--lans'), this.helper.textFit__config_lans);
                else
                    (0, textFit_1.default)(document.getElementById('current__status--port'), this.helper.textFit__config_port);
            };
            /**
             * Running of the current weather data handling
             *
             * @param {boolean} [lans=true] Flag for if in lanscape or portrait orientation
             *
             * @memberOf current
             */
            this.run = (lans = true) => {
                this.lans = lans;
                this.load();
                this.apply();
            };
            this.lans = true;
            this.helper = new helper_1.helper();
            this.hidden = false;
        }
    }
    exports.current = current;
});
