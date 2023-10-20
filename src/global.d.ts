declare namespace Express {
  export interface Request {
    user: {
      userId: string;
      roles: string[]
    }
  }
}