import {
  CanActivate, // Permite crear un Guard que decide si una petición puede continuar.
  ExecutionContext, // Contiene información sobre la petición actual.
  Injectable, // Permite que NestJS pueda inyectar este Guard.
  UnauthorizedException, // Excepción HTTP 401: usuario no autorizado.
} from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
// Permite acceder al cliente de Supabase para validar el token.

import { Request } from 'express';
// Tipo de la petición HTTP de Express.

interface AuthenticatedRequest extends Request {
  user?: unknown; // Agregamos "user" a la petición para guardar el usuario autenticado.
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private database: DatabaseService) {} // El Guard necesita DatabaseService para consultar Supabase.

  // NestJS ejecuta este método antes de permitir el acceso a la ruta.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>(); // Obtiene la petición HTTP actual.
    const authHeader = request.headers['authorization']; // Obtiene el header Authorization enviado por el cliente.

    // Si no existe el header, rechazamos la petición.
    if (!authHeader) {
      throw new UnauthorizedException('No se envio el token');
    }

    const token = authHeader.replace('Bearer ', ''); // Extrae solamente el token quitando "Bearer ".

    // Envía el token a Supabase para comprobar si es válido.
    const { data, error } = await this.database.getClient().auth.getUser(token);

    // Si el token es inválido, rechazamos la petición.
    if (error || !data) {
      throw new UnauthorizedException('Token invalido');
    }

    // Guardamos el usuario autenticado dentro de la petición.
    request.user = data.user;

    // true permite que la petición continúe hacia el Controller.
    return true;
  }
}
