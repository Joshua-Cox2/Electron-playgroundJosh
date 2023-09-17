import { existsSync, readFileSync } from "fs";
import { ZodError } from "zod";
import { environmentEnum } from "./common.enums";
import { TEnvironmentEnum } from "./common.types";

/**
 * Common helper class
 * @date 8/8/2023 - 9:42:39 AM
 *
 * @export
 * @class common
 * @typedef {common}
 */
export class common {
    /**
     * Creates an instance of common.
     * @date 8/8/2023 - 9:42:39 AM
     *
     * @constructor
     * @param {TEnvironmentEnum} env
     */
    constructor(private env: TEnvironmentEnum) {}

    /**
     * Check to see if the provided error is a Zod Error
     * @date 8/8/2023 - 9:42:38 AM
     *
     * @param {(ZodError | Error)} arg
     * @returns {arg is ZodError}
     */
    private isZodError = (arg: ZodError | Error): arg is ZodError =>{
        return (arg as ZodError).issues !== undefined;
    }

    /**
     * Generic error console display
     * @date 8/8/2023 - 9:42:38 AM
     *
     * @param {Error} arg
     */
    private defaultError = (arg: Error): void => {
        console.error(`ERROR ${arg.name} ::: ${arg.message}`, arg.stack)
    }

    /**
     * Zod Error console display
     * @date 8/8/2023 - 9:42:38 AM
     *
     * @param {ZodError} arg
     */
    private zodError = (arg: ZodError): void => {
        arg.errors.forEach((issue) => {
            console.error(`ERROR ${issue.code} ::: ${issue.message}, `, issue)
        })
    }

    /**
     * Environment setting mutation
     * @date 8/8/2023 - 9:42:38 AM
     *
     * @param {TEnvironmentEnum} env
     */
    public envMutate = (env: TEnvironmentEnum): void => {
        this.env = env
        console.log('helper ::: env', this.env)
    }

    /**
     * Generic log message display
     * @date 8/8/2023 - 9:42:38 AM
     *
     * @param {?string} [identifier]
     * @param {?string} [variable]
     * @param {?*} [value]
     */
    public log = (identifier?: string, variable?: string, value?: any): void => {
        let a: string = identifier || ""
        let b: string = variable || ""
        let c: any = value || ""
        if (this.env === environmentEnum.Enum.development)
            console.log(`${a} ::: ${b}`, c)
    }

    /**
     * Error handler
     * @date 8/8/2023 - 9:42:38 AM
     *
     * @param {(ZodError | Error)} error
     */
    public error = (error: ZodError | Error): void => {
        if (this.isZodError(error))
            this.zodError(error)
        else
            this.defaultError(error)
    }

    /**
     * Does the folder/file exist at the desired path?
     * @date 8/8/2023 - 9:42:38 AM
     *
     * @param {string} path
     * @returns {boolean}
     */
    public fileExists = (path: string): boolean => existsSync(path)

    /**
     * Load the desired file
     * @date 8/8/2023 - 9:42:38 AM
     *
     * @param {string} path
     * @returns {string}
     */
    public loadFile = (path: string): string => readFileSync(path, { encoding: 'utf-8'})
}