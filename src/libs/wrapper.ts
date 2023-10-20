import express from "express";

export default function wrapper<T>(callback: (req: express.Request, res: express.Response)=>T | Promise<T>) {
  return async (req: express.Request, res: express.Response) => {
    try {
      const result = await callback(req, res);
      if (result) {
        res.json(result);
      } else {
        res.end();
      }
    } catch (e: any) {
      console.error(e);
      res.status(500).json({error: e.message});
    }
  };
}