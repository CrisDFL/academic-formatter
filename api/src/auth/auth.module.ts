import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthService, AuthGuard],
  exports: [AuthService],
  // importa el módulo (con el servicio) de base de datos para que pueda ser utilizado en este módulo
  imports: [DatabaseModule],
  controllers: [AuthController],
})
export class AuthModule {}
