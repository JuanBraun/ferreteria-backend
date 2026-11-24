import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';
import { sendSuccess } from '../utils/apiResponse';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const resultado = await authService.login(email, password);
      return sendSuccess(res, resultado, 'Inicio de sesión exitoso', 200);
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const resultado = await authService.register(req.body);
      return sendSuccess(res, resultado, 'Usuario registrado correctamente', 201);
    } catch (error) {
      next(error);
    }
  }

  async recover(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const resultado = await authService.recoverPassword(email);
      return sendSuccess(res, resultado, 'Solicitud de recuperación procesada', 200);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();