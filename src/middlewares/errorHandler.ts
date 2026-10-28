import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({
    msg: message,
    code: status,
    data: null
  });
};

export default errorHandler;