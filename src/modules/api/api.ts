import { BrowserWindow } from "electron"
import express from 'express'
import { join } from 'path'
import { common } from "../../common/common"
import { optionTemplateEnum } from "../../common/common.enums"
import { TSettings } from "../../common/common.types"
import { menu } from "../menu/menu"
import { TResponseBase, TResponseDataJson, responseBase } from "./api.types"
import cors from 'cors'
/**
 * API Class
 * @date 8/8/2023 - 9:42:31 AM
 *
 * @export
 * @class api
 * @typedef {api}
 */
export class api {
    /**
     * Express api object
     * @date 8/8/2023 - 9:42:31 AM
     *
     * @private
     * @type {express.Application}
     */
    private apiApp: express.Application

    /**
     * Creates an instance of api.
     * @date 8/8/2023 - 9:42:31 AM
     *
     * @constructor
     * @param {TSettings} settings
     * @param {common} helper
     * @param {BrowserWindow} application
     * @param {menu} menus
     */
    constructor(private settings: TSettings, private helper: common, private application: BrowserWindow, private menus: menu) {
        this.apiApp = express()
        this.apiApp.use(cors())
        this.routes()
        this.listen()
    }

    /**
     * Default response object
     * @date 8/8/2023 - 9:42:31 AM
     *
     * @returns {TResponseBase}
     */
    private responseDefault = (): TResponseBase => {
        return responseBase.parse({})
    }

    /**
     * API bindings configuration
     * @date 8/8/2023 - 9:42:31 AM
     */
    private listen = (): void => {
        this.apiApp.listen(this.settings.port, this.settings.apiDomain, () => {
            this.helper.log('api', `Server is running on ${this.settings.apiDomain}:${this.settings.port}`)
        })
    }

    /**
     * API routes configuration
     * @date 8/8/2023 - 9:42:31 AM
     */
    private routes = (): void => {
        this.apiApp.get('/', (req: express.Request, res: express.Response) => {
            res.send('Hello World!')
        })
        this.apiApp.get('/open/about', (req: express.Request, res: express.Response) => {
            this.menus.overlayLoad(join(__dirname, '../', optionTemplateEnum.enum.about), true)
            let response: TResponseBase = this.responseDefault()
            if (!this.menus.overlayConfigured()) {
                response.error = true
                response.errorMsg = 'Unable to open about module'
            }
            res.json(response)
        })
        this.apiApp.get('/open/apollo', (req: express.Request, res: express.Response) => {
            this.menus.overlayLoad(join(__dirname, '../../../', optionTemplateEnum.enum.overview), true)
            let response: TResponseBase = this.responseDefault()
            if (!this.menus.overlayConfigured()) {
                response.error = true
                response.errorMsg = 'Unable to open Apollo'
            }
            res.json(response)
        })
        this.apiApp.get('/close', (req: express.Request, res: express.Response) => {
            let response: TResponseBase = this.responseDefault()
            let tmp = this.menus.overlayGet()
            if (tmp !== undefined)
                tmp.close()
            this.application.close()
            res.json(response)
        })
        this.apiApp.get('/close/overlay', (req: express.Request, res: express.Response) => {
            let response: TResponseBase = this.responseDefault()
            let tmp = this.menus.overlayGet()
            if (tmp !== undefined)
                tmp.close()
            else {
                response.error = true
                response.errorMsg = 'Overlay is not in use'
            }
            res.json(response)
        })
        this.apiApp.get('/close/application', (req: express.Request, res: express.Response) => {
            let response: TResponseBase = this.responseDefault()
            this.application.close()
            res.json(response)
        })
        this.apiApp.get('/load/dataJson', (req: express.Request, res: express.Response) => {
            let response: TResponseDataJson = {
                error: false,
                errorMsg: '',
                data: undefined
            }
            // INFO: Check if the data.json file exists within the template directory
            if (this.settings.templateDir === undefined || this.settings.templateDir === "") {
                response.error= true
                response.errorMsg = 'Template is not declared. Unable to load the json data.'
            }

            if (!response.error && !this.helper.fileExists(this.settings.templateDir)) {
                response.error = true
                response.errorMsg = 'Template directory could nt be located. Unable to load the json data.'
            }

            if (!response.error && !this.helper.fileExists(`${this.settings.templateDir}/data.json`)) {
                response.error = true
                response.errorMsg = 'Jason data was not found within the template folder'
            }

            if (!response.error)
                response.data = JSON.parse(this.helper.loadFile(`${this.settings.templateDir}/data.json`).replace('var clientData =', ''))
            res.json(response)
        })
    }
}
