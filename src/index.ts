import { app } from "electron";
import { common } from "./common/common";
import { environmentEnum } from "./common/common.enums";
import { TSettings } from "./common/common.types";
import { core } from "./modules/core/core";

const settings: TSettings = {
    apiDomain: '127.0.0.1',
    environment: environmentEnum.enum.production,
}

process.argv.forEach((val: string) => {
    if (val === '-d' || val === '--development')
        settings.environment = environmentEnum.enum.development;
})

const helper = new common(settings.environment)

app.on('ready', () => {
    let main = new core(settings, helper)
    main.launch()
})

app.on('window-all-closed', () => {
    if (process.platform!== 'darwin') app.quit();
})