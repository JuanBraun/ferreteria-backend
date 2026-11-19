import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  data: unknown,
  msg = 'Ok',
  code = 200
) => {
  return res.status(code).json({
    msg,
    code,
    data,
  });
};

export const sendError = (
  res: Response,
  msg = 'Error interno del servidor',
  code = 500,
  data: unknown = null
) => {
  return res.status(code).json({
    msg,
    code,
    data,
  });
};