declare module "formidable" {
  export interface File {
    filepath: string;
    mimetype: string;
    size: number;
  }

  export interface Fields {
    [key: string]: string | string[];
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export class IncomingForm {
    constructor(options?: any);
    parse(req: any): Promise<[Fields, Files]>;
  }
}
