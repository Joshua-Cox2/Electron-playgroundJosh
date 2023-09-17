import { app } from "electron";
import { join } from "path";
import { common } from "./common/common";
import { environmentEnum } from "./common/common.enums";
import { TSettings, settings } from "./common/common.types";
import { core } from "./modules/core/core";

/**
 * Instance of the common helper class
 * @date 8/8/2023 - 9:41:59 AM
 *
 * @type {*}
 */
let helper = new common(environmentEnum.enum.production)
/**
 * Settings object
 * @date 8/8/2023 - 9:41:59 AM
 *
 * @type {(TSettings | undefined)}
 */
let setting: TSettings | undefined

/**
 * Settings object initialization
 * @date 8/8/2023 - 9:41:58 AM
 */
let settingsInit = () => {
    try {
        setting = settings.parse({
            environment: environmentEnum.enum.production
        })
        console.log(process.argv)
        process.argv.forEach((val: string) => {
            if (val === '-d' || val === '--development')
                setting.environment = environmentEnum.enum.development
            if (val.startsWith('--template-dir=')) {
                setting.templateDir = val.replace('--template-dir=', '')
                setting.templateDir = join(__dirname, '../', setting.templateDir)
            }
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