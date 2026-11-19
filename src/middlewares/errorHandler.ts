
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import { sendError } from '../utils/apiResponse';

const errorHandler = (
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (res.headersSent) {
        next(error);
        return;
    }

    const statusCode = error instanceof AppError
        ? error.statusCode
        : 500;

    const mensaje = error instanceof AppError
        ? error.message
        : 'Error interno del servidor';

    sendError(res, mensaje, statusCode);
};

export default errorHandler;
