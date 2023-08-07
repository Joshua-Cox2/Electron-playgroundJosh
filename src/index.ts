import { app } from "electron";
import { common } from "./common/common";
import { environmentEnum } from "./common/common.enums";
import { TSettings, settings } from "./common/common.types";
import { core } from "./modules/core/core";

let helper = new common(environmentEnum.enum.production)
let setting: TSettings | undefined

let settingsInit = () => {
    try {
        setting = settings.parse({
            environment: environmentEnum.enum.production
        })
        process.argv.forEach((val: string) => {
            if (val === '-d' || val === '--development')
                setting.environment = environmentEnum.enum.development
        })
        helper.envMutate(setting.environment)
    } catch (e: any) {
        helper.error(e)
        app.quit()
    }
}
    
settingsInit()

helper.log('root', 'setting', setting)

app.on('ready', () => {
    let main = new core(setting, helper)
    main.launch()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})