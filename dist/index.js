"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const common_1 = require("./common/common");
const common_enums_1 = require("./common/common.enums");
const common_types_1 = require("./common/common.types");
const core_1 = require("./modules/core/core");
let helper = new common_1.common(common_enums_1.environmentEnum.enum.production);
let setting;
let settingsInit = () => {
    try {
        setting = common_types_1.settings.parse({
            environment: common_enums_1.environmentEnum.enum.production
        });
        process.argv.forEach((val) => {
            if (val === '-d' || val === '--development')
                setting.environment = common_enums_1.environmentEnum.enum.development;
        });
        helper.envMutate(setting.environment);
    }
    catch (e) {
        helper.error(e);
        electron_1.app.quit();
    }
};
settingsInit();
helper.log('root', 'setting', setting);
electron_1.app.on('ready', () => {
    let main = new core_1.core(setting, helper);
    main.launch();
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
