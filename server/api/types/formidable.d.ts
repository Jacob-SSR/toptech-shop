declare module "formidable" {
  import type { IncomingMessage } from "http";

  export interface File {
    originalFilename?: string | null;
    filepath: string;
    mimetype?: string | null;
    size: number;
  }

  export interface Fields {
    [key: string]: any;
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export interface IncomingFormOptions {
    uploadDir?: string;
    keepExtensions?: boolean;
    maxFileSize?: number;
    multiples?: boolean;
  }

  export class IncomingForm {
    constructor(options?: IncomingFormOptions);
    parse(req: IncomingMessage): Promise<[Fields, Files]>;
  }

  export function formidable(
    options?: IncomingFormOptions
  ): IncomingForm;
}
