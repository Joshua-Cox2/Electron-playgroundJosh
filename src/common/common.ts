import { existsSync, readFileSync } from "fs";
import { ZodError } from "zod";
import { environmentEnum } from "./common.enums";
import { TEnvironmentEnum } from "./common.types";

export class common {
    constructor(private env: TEnvironmentEnum) {}

    private isZodError = (arg: ZodError | Error): arg is ZodError =>{
        return (arg as ZodError).issues !== undefined;
    }

    private defaultError = (arg: Error): void => {
        console.error(`ERROR ${arg.name} ::: ${arg.message}`, arg.stack)
    }

    private zodError = (arg: ZodError): void => {
        arg.errors.forEach((issue) => {
            console.error(`ERROR ${issue.code} ::: ${issue.message}, `, issue)
        })
    }

    public envMutate = (env: TEnvironmentEnum): void => {
        this.env = env
        console.log('helper ::: env', this.env)
    }

    public log = (identifier?: string, variable?: string, value?: any): void => {
        let a: string = identifier || ""
        let b: string = variable || ""
        let c: any = value || ""
        if (this.env === environmentEnum.Enum.development)
            console.log(`${a} ::: ${b}`, c)
    }

    public error = (error: ZodError | Error): void => {
        if (this.isZodError(error))
            this.zodError(error)
        else
            this.defaultError(error)
    }

    public fileExists = (path: string): boolean => existsSync(path)

    public loadFile = (path: string): string => readFileSync(path, { encoding: 'utf-8'})
}