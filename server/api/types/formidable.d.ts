declare module "formidable" {
  export interface File {
    filepath: string;
    mimetype: string;
    size: number;
    originalFilename: string;
  }

  export interface Fields {
    [key: string]: string | string[];
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export interface IncomingFormOptions {
    multiples?: boolean;
    uploadDir?: string;
    maxFileSize?: number;
    maxFields?: number;
    keepExtensions?: boolean;
    encoding?: string;
  }

  export class IncomingForm {
    constructor(options?: IncomingFormOptions);
    parse(req: any): Promise<[Fields, Files]>;
  }

  export function formidable(
    options?: IncomingFormOptions
  ): Promise<[Fields, Files]>;
}
