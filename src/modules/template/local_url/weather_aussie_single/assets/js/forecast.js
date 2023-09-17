/// <amd-module name="forecast"/>
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("forecast", ["require", "exports", "helper", "luxon", "dompurify", "forecast.utilities", "./textFit"], function (require, exports, helper_1, luxon_1, dompurify_1, forecast_utilities_1, textFit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.forecast = void 0;
    textFit_1 = __importDefault(textFit_1);
    /**
     * Class the handles the forecast weather data
     *
     * @class forecast
     */
    class forecast {
        /**
         * Creates an instance of forecast.
         *
         * @memberOf forecast
         */
        constructor() {
            /**
             * Array containing the upcoming three dates from the current system date
             *
             * @private
             * @type {DateTime[]}
             * @memberOf forecast
             */
            this.days__index = [];
            /**
             * Resetting of the three__days object
             *
             * @private
             * @returns {three__days_pre}
             *
             * @memberOf forecast
             */
            this.three__days__reset = () => {
                return {
                    one: [],
                    two: [],
                    three: []
                };
            };
            /**
             * Resetting of the forecasts object
             *
             * @private
             * @returns {days__post}
             *
             * @memberOf forecast
             */
            this.forecasts__reset = () => {
                return {
                    one: {
                        min: undefined,
                        max: undefined,
                        average: undefined,
                        weather: undefined,
                        date: undefined,
                        display: false
                    },
                    two: {
                        min: undefined,
                        max: undefined,
                        average: undefined,
                        weather: undefined,
                        date: undefined,
                        display: false
                    },
                    three: {
                        min: undefined,
                        max: undefined,
                        average: undefined,
                        weather: undefined,
                        date: undefined,
                        display: false
                    }
                };
            };
            /**
             * Load the forecast data from local storage
             *
             * @private
             *
             * @memberOf forecast
             */
            this.load = () => {
                this.five = undefined;
                let tmp = JSON.parse(localStorage.getItem('5DF'));
                if (tmp !== null)
                    this.five = tmp;
            };
            /**
             * Determine the dates required for the forecast data for the upcoming three days from the current date
             *
             * @private
             *
             * @memberOf forecast
             */
            this.days__get = () => {
                this.days__index = [];
                let today = luxon_1.DateTime.now().set({ hour: 0, minute: 0, second: 0 });
                for (let i = 1; i <= 3; i++)
                    this.days__index.push(today.plus({ days: i }));
            };
            /**
             * Collation of the forecast information and only sotre the info pertaining to each of the three required days
             *
             * @private
             *
             * @memberOf forecast
             */
            this.collate__forecasts = () => {
                this.three__days = this.three__days__reset();
                if (this.days__index.length === 3 && typeof this.five !== 'undefined') {
                    this.five.list.forEach(fcast => {
                        let fcast__dt = luxon_1.DateTime.fromFormat(fcast.dt_txt, 'yyyy-MM-dd HH:mm:ss');
                        this.days__index.forEach((day, index) => {
                            if (day.year === fcast__dt.year && day.month === fcast__dt.month && day.day === fcast__dt.day) {
                                switch (index) {
                                    case 0:
                                        this.three__days.one.push(fcast);
                                        break;
                                    case 1:
                                        this.three__days.two.push(fcast);
                                        break;
                                    case 2:
                                        this.three__days.three.push(fcast);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        });
                    });
                }
            };
            /**
             * Parse the forecasts for each of the applicable upcoming days and retreieve the applicable information
             *
             * @private
             *
             * @memberOf forecast
             */
            this.forecasts__parse = () => {
                this.forecasts = this.forecasts__reset();
                this.days__index.forEach((day, index) => {
                    let collation = this.collation__get(index);
                    if (collation !== false) {
                        switch (index) {
                            case 0:
                                // INFO: First upcoming day
                                let temps__one = [];
                                // DEV: Date handling
                                this.forecasts.one.date = day;
                                collation.forEach(prediction => {
                                    temps__one.push(prediction.main.temp);
                                    // DEV: Min temp handling
                                    if (typeof this.forecasts.one.min === 'undefined' ||
                                        (prediction.main.temp < this.forecasts.one.min))
                                        this.forecasts.one.min = prediction.main.temp;
                                    // DEV: Max temp handling
                                    if (typeof this.forecasts.one.max === 'undefined' ||
                                        (prediction.main.temp > this.forecasts.one.max))
                                        this.forecasts.one.max = prediction.main.temp;
                                    // DEV: Weather handling
                                    if (typeof this.forecasts.one.weather === 'undefined' ||
                                        (0, forecast_utilities_1.wether__priority)(this.forecasts.one.weather.id, prediction.weather[0].id))
                                        this.forecasts.one.weather = prediction.weather[0];
                                });
                                // DEV: Average temp calculation
                                this.forecasts.one.average = (0, forecast_utilities_1.temp__average)(temps__one);
                                break;
                            case 1:
                                // INFO: Second upcoming day
                                let temps__two = [];
                                // DEV: Date handling
                                this.forecasts.two.date = day;
                                collation.forEach(prediction => {
                                    temps__two.push(prediction.main.temp);
                                    // DEV: Min temp handling
                                    if (typeof this.forecasts.two.min === 'undefined' ||
                                        (prediction.main.temp < this.forecasts.two.min))
                                        this.forecasts.two.min = prediction.main.temp;
                                    // DEV: Max temp handling
                                    if (typeof this.forecasts.two.max === 'undefined' ||
                                        (prediction.main.temp > this.forecasts.two.max))
                                        this.forecasts.two.max = prediction.main.temp;
                                    // DEV: Weather handling
                                    if (typeof this.forecasts.two.weather === 'undefined' ||
                                        (0, forecast_utilities_1.wether__priority)(this.forecasts.two.weather.id, prediction.weather[0].id))
                                        this.forecasts.two.weather = prediction.weather[0];
                                });
                                // DEV: Average temp calculation
                                this.forecasts.two.average = (0, forecast_utilities_1.temp__average)(temps__two);
                                break;
                            case 2:
                                // INFO: Third upcoming day
                                let temps__three = [];
                                // DEV: Date handling
                                this.forecasts.three.date = day;
                                collation.forEach(prediction => {
                                    temps__three.push(prediction.main.temp);
                                    // DEV: Min temp handling
                                    if (typeof this.forecasts.three.min === 'undefined' ||
                                        (prediction.main.temp < this.forecasts.three.min))
                                        this.forecasts.three.min = prediction.main.temp;
                                    // DEV: Max temp handling
                                    if (typeof this.forecasts.three.max === 'undefined' ||
                                        (prediction.main.temp > this.forecasts.three.max))
                                        this.forecasts.three.max = prediction.main.temp;
                                    // DEV: Weather handling
                                    if (typeof this.forecasts.three.weather === 'undefined' ||
                                        (0, forecast_utilities_1.wether__priority)(this.forecasts.three.weather.id, prediction.weather[0].id))
                                        this.forecasts.three.weather = prediction.weather[0];
                                });
                                // DEV: Average temp calculation
                                this.forecasts.three.average = (0, forecast_utilities_1.temp__average)(temps__three);
                                break;
                            default:
                                break;
                        }
                    }
                });
            };
            /**
             * Update the display value of each of the three forecast days
             *
             * @private
             *
             * @memberOf forecast
             */
            this.update__forcasts_display = () => {
                if (typeof this.forecasts.one.average !== 'undefined' &&
                    typeof this.forecasts.one.min !== 'undefined' &&
                    typeof this.forecasts.one.max !== 'undefined' &&
                    typeof this.forecasts.one.date !== 'undefined' &&
                    typeof this.forecasts.one.weather !== 'undefined')
                    this.forecasts.one.display = true;
                if (typeof this.forecasts.two.average !== 'undefined' &&
                    typeof this.forecasts.two.min !== 'undefined' &&
                    typeof this.forecasts.two.max !== 'undefined' &&
                    typeof this.forecasts.two.date !== 'undefined' &&
                    typeof this.forecasts.two.weather !== 'undefined')
                    this.forecasts.two.display = true;
                if (typeof this.forecasts.three.average !== 'undefined' &&
                    typeof this.forecasts.three.min !== 'undefined' &&
                    typeof this.forecasts.three.max !== 'undefined' &&
                    typeof this.forecasts.three.date !== 'undefined' &&
                    typeof this.forecasts.three.weather !== 'undefined')
                    this.forecasts.three.display = true;
            };
            /**
             * Determines if each of the applicable upcoming forecasts will have their information displayed
             *
             * @private
             *
             * @memberOf forecast
             */
            this.determine__display = () => {
                this.all__hidden = false;
                if (this.lans) {
                    // DEV: First forecast card
                    let elem = document.getElementById('one--lans');
                    if (this.forecasts.one.display) {
                        if (elem.classList.contains('hidden'))
                            elem.classList.remove('hidden');
                    }
                    else {
                        if (!elem.classList.contains('hidden'))
                            elem.classList.add('hidden');
                    }
                    // DEV: Second forecast card
                    elem = document.getElementById('two--lans');
                    if (this.forecasts.two.display) {
                        if (elem.classList.contains('hidden'))
                            elem.classList.remove('hidden');
                    }
                    else {
                        if (!elem.classList.contains('hidden'))
                            elem.classList.add('hidden');
                    }
                }
                else {
                    // DEV: First forecast card
                    let elem = document.getElementById('one--port');
                    if (this.forecasts.one.display) {
                        if (elem.classList.contains('hidden'))
                            elem.classList.remove('hidden');
                    }
                    else {
                        if (!elem.classList.contains('hidden'))
                            elem.classList.add('hidden');
                    }
                    // DEV: Second forecast card
                    elem = document.getElementById('two--port');
                    if (this.forecasts.two.display) {
                        if (elem.classList.contains('hidden'))
                            elem.classList.remove('hidden');
                    }
                    else {
                        if (!elem.classList.contains('hidden'))
                            elem.classList.add('hidden');
                    }
                    // DEV: Third forecast card
                    elem = document.getElementById('three--port');
                    if (this.forecasts.three.display) {
                        if (elem.classList.contains('hidden'))
                            elem.classList.remove('hidden');
                    }
                    else {
                        if (!elem.classList.contains('hidden'))
                            elem.classList.add('hidden');
                    }
                }
                if (!this.forecasts.one.display &&
                    !this.forecasts.two.display &&
                    !this.forecasts.three.display)
                    this.all__hidden = true;
            };
            /**
             * Apply the details for the forecast details
             *
             * @private
             *
             * @memberOf forecast
             */
            this.apply = () => {
                if (this.forecasts.one.display) {
                    // INFO: Day one details
                    // DEV: Average icon
                    if (this.lans) {
                        let elem = document.getElementById('one__icon--lans');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.icon__get(this.forecasts.one.weather.icon, this.five.city.sunrise, this.five.city.sunset));
                    }
                    else {
                        let elem = document.getElementById('one__icon--port');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.icon__get(this.forecasts.one.weather.icon, this.five.city.sunrise, this.five.city.sunset));
                    }
                    // DEV: Day
                    if (this.lans) {
                        let elem = document.getElementById('one__day--lans');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.forecasts.one.date.toFormat('ccc').toUpperCase());
                    }
                    else {
                        let elem = document.getElementById('one__day--port');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.forecasts.one.date.toFormat('cccc').toUpperCase());
                    }
                    // DEV: Status
                    if (this.lans) {
                        let elem = document.getElementById('one__status--lans');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.toTitleCase(this.forecasts.one.weather.description));
                    }
                    else {
                        let elem = document.getElementById('one__status--port');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.toTitleCase(this.forecasts.one.weather.description));
                    }
                    // DEV: Max temp
                    if (this.lans) {
                        let elem = document.getElementById('one__max--lans');
                        elem.innerHTML = Math.round(this.forecasts.one.max) + '<i class="wi wi-degrees"></i>';
                    }
                    else {
                        let elem = document.getElementById('one__max--port');
                        elem.innerHTML = Math.round(this.forecasts.one.max) + '<i class="wi wi-degrees"></i>';
                    }
                    // DEV: Min temp
                    if (this.lans) {
                        let elem = document.getElementById('one__min--lans');
                        elem.innerHTML = Math.round(this.forecasts.one.min) + '<i class="wi wi-degrees"></i>';
                    }
                    else {
                        let elem = document.getElementById('one__min--port');
                        elem.innerHTML = Math.round(this.forecasts.one.min) + '<i class="wi wi-degrees"></i>';
                    }
                }
                if (this.forecasts.two.display) {
                    // INFO: Day two details
                    // DEV: Average icon
                    if (this.lans) {
                        let elem = document.getElementById('two__icon--lans');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.icon__get(this.forecasts.two.weather.icon, this.five.city.sunrise, this.five.city.sunset));
                    }
                    else {
                        let elem = document.getElementById('two__icon--port');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.icon__get(this.forecasts.two.weather.icon, this.five.city.sunrise, this.five.city.sunset));
                    }
                    // DEV: Day
                    if (this.lans) {
                        let elem = document.getElementById('two__day--lans');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.forecasts.two.date.toFormat('ccc').toUpperCase());
                    }
                    else {
                        let elem = document.getElementById('two__day--port');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.forecasts.two.date.toFormat('cccc').toUpperCase());
                    }
                    // DEV: Status
                    if (this.lans) {
                        let elem = document.getElementById('two__status--lans');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.toTitleCase(this.forecasts.two.weather.description));
                    }
                    else {
                        let elem = document.getElementById('two__status--port');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.toTitleCase(this.forecasts.two.weather.description));
                    }
                    // DEV: Max temp
                    if (this.lans) {
                        let elem = document.getElementById('two__max--lans');
                        elem.innerHTML = Math.round(this.forecasts.two.max) + '<i class="wi wi-degrees"></i>';
                    }
                    else {
                        let elem = document.getElementById('two__max--port');
                        elem.innerHTML = Math.round(this.forecasts.two.max) + '<i class="wi wi-degrees"></i>';
                    }
                    // DEV: Min temp
                    if (this.lans) {
                        let elem = document.getElementById('two__min--lans');
                        elem.innerHTML = Math.round(this.forecasts.two.min) + '<i class="wi wi-degrees"></i>';
                    }
                    else {
                        let elem = document.getElementById('two__min--port');
                        elem.innerHTML = Math.round(this.forecasts.two.min) + '<i class="wi wi-degrees"></i>';
                    }
                }
                if (this.forecasts.three.display) {
                    // INFO: Day three details
                    // DEV: Average icon
                    if (!this.lans) {
                        let elem = document.getElementById('three__icon--port');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.icon__get(this.forecasts.three.weather.icon, this.five.city.sunrise, this.five.city.sunset));
                    }
                    // DEV: Day
                    if (!this.lans) {
                        let elem = document.getElementById('three__day--port');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.forecasts.three.date.toFormat('cccc').toUpperCase());
                    }
                    // DEV: Status
                    if (!this.lans) {
                        let elem = document.getElementById('three__status--port');
                        elem.innerHTML = (0, dompurify_1.sanitize)(this.helper.toTitleCase(this.forecasts.three.weather.description));
                    }
                    // DEV: Max temp
                    if (!this.lans) {
                        let elem = document.getElementById('three__max--port');
                        elem.innerHTML = Math.round(this.forecasts.three.max) + '<i class="wi wi-degrees"></i>';
                    }
                    // DEV: Min temp
                    if (!this.lans) {
                        let elem = document.getElementById('three__min--port');
                        elem.innerHTML = Math.round(this.forecasts.three.min) + '<i class="wi wi-degrees"></i>';
                    }
                }
            };
            /**
             * Check the local storage
             *
             *
             * @memberOf forecast
             */
            this.check = () => {
                window.parent.postMessage({ "type": "localStorage", "attribute": "5DF" }, '*');
            };
            /**
             * Fit the descriptions to the width of the card
             *
             *
             * @memberOf forecast
             */
            this.fit__text = () => {
                if (this.forecasts.one.display) {
                    if (this.lans)
                        (0, textFit_1.default)(document.getElementById('one__status--lans'), this.helper.textFit__config_lans);
                    else
                        (0, textFit_1.default)(document.getElementById('one__status--port'), this.helper.textFit__config_port);
                }
                if (this.forecasts.two.display) {
                    if (this.lans)
                        (0, textFit_1.default)(document.getElementById('two__status--lans'), this.helper.textFit__config_lans);
                    else
                        (0, textFit_1.default)(document.getElementById('two__status--port'), this.helper.textFit__config_port);
                }
                if (this.forecasts.three.display) {
                    if (!this.lans)
                        (0, textFit_1.default)(document.getElementById('three__status--port'), this.helper.textFit__config_port);
                }
            };
            /**
             * Running of the current weather data handling
             *
             * @param {boolean} [lans=true] Flag for if in lanscape or portrait orientation
             *
             * @memberOf forecast
             */
            this.run = (lans = true) => {
                this.lans = lans;
                this.load();
                this.days__get();
                this.collate__forecasts();
                this.forecasts__parse();
                this.update__forcasts_display();
                this.determine__display();
                this.apply();
            };
            this.lans = true;
            this.helper = new helper_1.helper();
            this.three__days = this.three__days__reset();
            this.forecasts = this.forecasts__reset();
            this.all__hidden = false;
        }
        /**
         * Retrieve the collated forecast data for the desired index
         *
         * @private
         * @param {number} idx index of the required data. This is based on the index of the days location within the days__index array
         * @returns {(false | any[])} return false if the index is invalid. Otherwise the collated forecast data is returned
         *
         * @memberOf forecast
         */
        collation__get(idx) {
            if (idx < 0 || idx > 2)
                return false;
            if (idx === 0)
                return this.three__days.one;
            if (idx === 1)
                return this.three__days.two;
            return this.three__days.three;
        }
    }
    exports.forecast = forecast;
});
