import { environmentEnum } from "./common.enums";
import { TEnvironmentEnum } from "./common.types";

export class common {
    constructor(private env: TEnvironmentEnum) {}

    public log(identifier?: string, variable?: string, value?: any): void {
        let a: string = identifier || ""
        let b: string = variable || ""
        let c: any = value || ""
        if (this.env === environmentEnum.Enum.development)
            console.log(`${a} ::: ${b}`, c)
    }
}