import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

interface AuthenticatedRequest extends Request {
  user?: Record<string, unknown>;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard) // Decorador personalizado - Aplica el Guard a esta ruta para protegerla.
  @Get('me')
  // @Req decorator permite acceder a la petición HTTP actual.
  getMe(
    @Req() request: AuthenticatedRequest,
  ): Record<string, unknown> | undefined {
    console.log(request.user);
    return request.user;
  }
}
