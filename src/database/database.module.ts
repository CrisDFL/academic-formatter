import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';

@Module({
  providers: [DatabaseService],
  controllers: [DatabaseController],
  // exporta el servicio para que pueda ser utilizado en otros módulos
  exports: [DatabaseService],
})
export class DatabaseModule {}
