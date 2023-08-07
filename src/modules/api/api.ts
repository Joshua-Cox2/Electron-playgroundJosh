import { BrowserWindow } from "electron"
import express from 'express'
import { join } from 'path'
import { common } from "../../common/common"
import { optionTemplateEnum } from "../../common/common.enums"
import { TSettings } from "../../common/common.types"
import { menu } from "../menu/menu"
import { TResponseBase, responseBase } from "./api.types"
import { BACKGROUND_TRANSPARENT } from "../../common/common.defaults"

export class api {
    private apiApp: express.Application

    constructor(private settings: TSettings, private helper: common, private application: BrowserWindow, private menus: menu) {
        this.apiApp = express()
        this.routes()
        this.listen()
    }

    private responseDefault = (): TResponseBase => {
        return responseBase.parse({})
    }

    private listen = (): void => {
        this.apiApp.listen(this.settings.port, this.settings.apiDomain, () => {
            this.helper.log('api', `Server is running on ${this.settings.apiDomain}:${this.settings.port}`)
        })
    }

    private routes = (): void => {
        this.apiApp.get('/', (req: express.Request, res: express.Response) => {
            res.send('Hello World!')
        })
        this.apiApp.get('/about', (req: express.Request, res: express.Response) => {
            this.menus.overlayLoad(join(__dirname, '../', optionTemplateEnum.enum.about), true)
            let response: TResponseBase = this.responseDefault()
            if (!this.menus.overlayConfigured())
            {
                response.error = true
                response.errorMsg = 'Unable to open about module'
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
    }
}