declare module "formidable" {
  export class IncomingForm {
    constructor(options?: any);
    parse(req: any): Promise<[any, any]>;
  }
}
