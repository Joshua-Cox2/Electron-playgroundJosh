"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const common_1 = require("./common/common");
const common_enums_1 = require("./common/common.enums");
const core_1 = require("./modules/core/core");
const settings = {
    apiDomain: '127.0.0.1',
    environment: common_enums_1.environmentEnum.enum.production,
};
process.argv.forEach((val) => {
    if (val === '-d' || val === '--development')
        settings.environment = common_enums_1.environmentEnum.enum.development;
});
const helper = new common_1.common(settings.environment);
electron_1.app.on('ready', () => {
    let main = new core_1.core(settings, helper);
    main.launch();
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
