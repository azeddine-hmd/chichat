declare namespace Express {
  export interface User {
    id: number;
    username: string;
  }

  export interface Request {
    files: { [filename: string]: Express.Multer.File[] };
    requestTime: Date;
  }
}
