/// <amd-module name="main"/>
define("main", ["require", "exports", "current", "forecast", "helper"], function (require, exports, current_1, forecast_1, helper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = void 0;
    /**
     * Main running class for the template
     *
     * @export
     * @class main
     */
    class main {
        /**
         * Creates an instance of main.
         * @param {any} clientdata Clent data from data.json
         *
         * @memberOf main
         */
        constructor(clientdata) {
            /**
             * Check to see if the screen settings are still the default values
             *
             * @private
             * @returns {boolean} Returns false if they are not the default values. Otherwise true
             *
             * @memberOf main
             */
            this.screen_is_default = () => {
                if (this.screen__settings.width > -1 && this.screen__settings.height > -1)
                    return false;
                return true;
            };
            /**
             * Populate the settings configuraiton
             *
             * @private
             *
             * @memberOf main
             */
            this.settings__config = () => {
                if (typeof this.client__data !== 'undefined') {
                    let w = this.client__data.screen.screen_width;
                    if (typeof w === 'string')
                        w = parseInt(w);
                    this.screen__settings.width = w;
                    let h = this.client__data.screen.screen_height;
                    if (typeof h === 'string')
                        h = parseInt(h);
                    this.screen__settings.height = h;
                    if (this.screen__settings.height > this.screen__settings.width)
                        this.screen__settings.is_lans = false;
                }
            };
            /**
             * Handling of the template orientation
             *
             * @private
             *
             * @memberOf main
             */
            this.orientation__config = () => {
                // INFO: Handling of the pixel resolution of the screen being displayed upon
                document.body.style.height = this.screen__settings.height.toString() + 'px';
                document.body.style.maxHeight = document.body.style.height;
                document.body.style.minHeight = document.body.style.height;
                document.body.style.width = this.screen__settings.width.toString() + 'px';
                document.body.style.maxWidth = document.body.style.width;
                document.body.style.minWidth = document.body.style.width;
                // INFO: Handling of the port or lans layout (default is lans)
                if (!this.screen__settings.is_lans) {
                    // DEV: remove hidden from port and add hidden to lans
                    let headdings = Array.from(document.getElementsByClassName('container__location'));
                    let contents = Array.from(document.getElementsByClassName('container__details'));
                    headdings.forEach((headding) => {
                        if (headding.classList.contains('container__location--lans'))
                            headding.classList.add('hidden');
                        if (headding.classList.contains('container__location--port'))
                            headding.classList.remove('hidden');
                    });
                    contents.forEach((content) => {
                        if (content.classList.contains('container__details--lans'))
                            content.classList.add('hidden');
                        if (content.classList.contains('container__details--port'))
                            content.classList.remove('hidden');
                    });
                }
            };
            /**
             * Show the template if the data has loaded
             *
             * @private
             *
             * @memberOf main
             */
            this.show__template = () => {
                Array.from(document.getElementsByClassName('container'))
                    .forEach((container) => {
                    if (container.classList.contains('hidden'))
                        container.classList.remove('hidden');
                });
                setTimeout(() => {
                    this.current.fit__text();
                    this.five.fit__text();
                }, 30);
            };
            /**
             * Post message to check if the local stroage data can be found
             *
             * @private
             *
             * @memberOf main
             */
            this.check__storage = () => {
                this.current.check();
                this.five.check();
            };
            /**
             * Retrieve the applicable weather data from local storage
             *
             * @private
             *
             * @memberOf main
             */
            this.retrieve__weather = () => {
                this.current.run(this.screen__settings.is_lans);
                this.five.run(this.screen__settings.is_lans);
            };
            this.base__clear = () => {
                // DEV: Location Label
                Array.from(document.getElementsByClassName('container__location--label'))
                    .forEach((location__container) => {
                    location__container.innerHTML = '';
                });
            };
            this.base__apply = () => {
                this.base__clear();
                // DEV: Location Label
                Array.from(document.getElementsByClassName('container__location--label'))
                    .forEach((location__container) => {
                    location__container.innerHTML = this.helper.toTitleCase(this.client__data.screen.user_screens_weather_location);
                });
            };
            /**
             * Running of the actual template
             *
             *
             * @memberOf main
             */
            this.run = () => {
                this.settings__config();
                if (!this.screen_is_default()) {
                    this.orientation__config();
                    this.base__apply();
                    this.check__storage();
                    this.retrieve__weather();
                    this.show__template();
                }
                else {
                    // TODO: Implement event handling to trigger the transition to the next advert
                }
            };
            this.helper = new helper_1.helper();
            this.client__data = clientdata;
            this.screen__settings = {
                width: -1,
                height: -1,
                is_lans: true
            };
            this.five = new forecast_1.forecast();
            this.current = new current_1.current();
        }
    }
    exports.main = main;
    window.addEventListener("message", (event) => {
        console.log('window ::: event', event);
        if (typeof event.data === 'object') {
            if (typeof event.data.type !== 'undefined') {
                if (typeof event.data.value !== 'undefined') {
                    localStorage.setItem(event.data.attribute, event.data.value);
                }
            }
        }
    }, false);
});
