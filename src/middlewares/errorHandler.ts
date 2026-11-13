
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

const errorHandler = (
    error: unknown,
    req: Request,
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

    res.status(statusCode).json({
        mensaje,
        error: true
    });
};

export default errorHandler;
