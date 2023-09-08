import { BrowserWindow } from "electron"
import express from 'express'
import { join } from 'path'
import { common } from "../../common/common"
import { optionTemplateEnum } from "../../common/common.enums"
import { TSettings } from "../../common/common.types"
import { menu } from "../menu/menu"
import { TResponseBase, responseBase } from "./api.types"
import { BACKGROUND_TRANSPARENT } from "../../common/common.defaults"

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
            let response: TResponseBase = this.responseDefault()
            response.error = false
            response.errorMsg = ''
            let located: boolean = false
            // INFO: Check if the data.json file exists within the template directory
            // HACK: Return error for now. This will be changed when the file retrieval and check is implemented
            if (!located) {
                response.error = true
                response.errorMsg = 'loading and checking of data.json to be implemented'
            }
            res.json(response)
        })
    }
}
